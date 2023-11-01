import { useState, useEffect, useContext } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'

import {
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  DISCOURAGE_INAPP_BROWSER_TEXT,
} from './constants/strings'
import { MAX_CHALLENGES, DISCOURAGE_INAPP_BROWSERS } from './constants/settings'
import { isWordInWordList, solution, unicodeLength } from './lib/words'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './App.css'
import './cell.css'
import { useAlert } from './context/AlertContext'
import { isInAppBrowser } from './lib/browser'
import { Guess } from './components/types/guess'
import { GuessContext } from './context/GameStateContext'
import ApiVisualizer from './components/api/ApiVisualizer'
function App() {
  const { showError: showErrorAlert } = useAlert()

  const gameStateContext = useContext(GuessContext)

  const [currentGuess, setCurrentGuess] = useState<Guess>({
    value: '',
    isNew: true,
    state: '',
  })

  const [currentRowClass, setCurrentRowClass] = useState('')

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  // startup effect handlers
  useEffect(() => {
    // document.documentElement.classList.remove('dark')
    // document.documentElement.classList.remove('high-contrast')
  })

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  // keystroke handlers
  const onChar = (value: string) => {
    const guesses =
      gameStateContext == null
        ? []
        : Object.values(gameStateContext?.dictionary)

    if (
      unicodeLength(`${currentGuess.value}${value}`) <= solution.length &&
      guesses.length < MAX_CHALLENGES
    ) {
      setCurrentGuess({
        value: `${currentGuess.value}${value}`,
        isNew: true,
        state: '00000',
      })
    }
  }

  const onDelete = () => {
    setCurrentGuess({
      ...currentGuess,
      value: new GraphemeSplitter()
        .splitGraphemes(currentGuess.value)
        .slice(0, -1)
        .join(''),
    })
  }

  const onEnter = () => {
    const guesses =
      gameStateContext == null
        ? []
        : Object.values(gameStateContext?.dictionary)

    // validate that 5 letters were entered; bail out if validation fails
    if (!(unicodeLength(currentGuess.value) === solution.length)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    // bail out if the guessed word isn't in the dictionary
    if (!isWordInWordList(currentGuess.value)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    // only allow the word if there are still guess slots available
    if (
      unicodeLength(currentGuess.value) === solution.length &&
      guesses.length < MAX_CHALLENGES
    ) {
      // set the current guess as not new...
      currentGuess.isNew = false

      // ...and save all the guesses to local storage
      if (gameStateContext != null) {
        const dictionary = { ...gameStateContext.dictionary }
        dictionary[guesses.length] = currentGuess
        gameStateContext.setDictionary(dictionary)
      }

      // initialize the next guess
      setCurrentGuess({
        value: '',
        isNew: true,
        state: '00000',
      })
    }
  }

  const newGuesses =
    gameStateContext == null ? [] : Object.values(gameStateContext?.dictionary) // gameStateContext?.dictionary

  return (
    <div className="h-screen flex flex-row max-h-screen">
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-row grow">
        <div className="pb-6 grow-[2]">
          <Grid
            solution={solution}
            guesses={newGuesses} // guesses}
            currentGuess={currentGuess}
            currentRowClassName={currentRowClass}
          />
        </div>
        <ApiVisualizer />
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          solution={solution}
          guesses={newGuesses}
        />
      </div>
    </div>
  )
}

export default App
