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
import {
  loadGameStateFromLocalStorage,
  loadGameStateFromLocalStorage2,
  saveGameStateToLocalStorage,
  saveGameStateToLocalStorage2,
} from './lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './App.css'
import './cell.css'
import { useAlert } from './context/AlertContext'
import { isInAppBrowser } from './lib/browser'
import { Guess } from './components/types/guess'
import { GuessContext, GuessProvider } from './context/GameStateContext'
function App() {
  const { showError: showErrorAlert } = useAlert()

  const gameStateContext = useContext(GuessContext)

  const [currentGuess, setCurrentGuess] = useState<Guess>({
    value: '',
    isNew: true,
    state: '',
    guessStates: {},
  })

  const [currentRowClass, setCurrentRowClass] = useState('')
  const [guesses, setGuesses] = useState<Guess[]>(() => {
    const storedGameState = loadGameStateFromLocalStorage()
    return storedGameState?.guesses ?? []
  })

  //   const [dictionary, setDictionary] = useState<{[key: number]: Guess}>(() => {
  //   const storedGameState2 = loadGameStateFromLocalStorage2()
  //   return storedGameState2?.dictionary ?? [];
  // })

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.remove('high-contrast')
  })

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses })

    // Create a new dictionary object and assign it the contents of gameStateContext.dictionary
    const newDictionary: { [key: number]: Guess } =
      { ...gameStateContext?.dictionary } ?? {}

    guesses.map((guess, index) => {
      if (newDictionary[index]) {
        // Check if newDictionary[index] is defined
        newDictionary[index].value = guess.value
      }
    })

    // saveGameStateToLocalStorage2({dictionary: newDictionary});

    gameStateContext?.setDictionary(newDictionary)
    // saveGameStateToLocalStorage2({guesses});
  }, [guesses, gameStateContext])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess.value}${value}`) <= solution.length &&
      guesses.length < MAX_CHALLENGES
    ) {
      setCurrentGuess({
        value: `${currentGuess.value}${value}`,
        isNew: true,
        state: '00000',
        guessStates: {},
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
    if (!(unicodeLength(currentGuess.value) === solution.length)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess.value)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (
      unicodeLength(currentGuess.value) === solution.length &&
      guesses.length < MAX_CHALLENGES
    ) {
      currentGuess.isNew = false
      setGuesses([...guesses, currentGuess])
      // setDictionary({...dictionary, [guesses.length]: currentGuess});
      setCurrentGuess({
        value: '',
        isNew: true,
        state: '00000',
        guessStates: {},
      })
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <Grid
            solution={solution}
            guesses={guesses}
            currentGuess={currentGuess}
            currentRowClassName={currentRowClass}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          solution={solution}
          guesses={guesses}
        />
      </div>
    </div>
  )
}

export default App
