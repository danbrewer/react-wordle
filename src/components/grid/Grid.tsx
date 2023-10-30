import { useContext } from 'react'
import { MAX_CHALLENGES } from '../../constants/settings'
import { saveGameStateToLocalStorage2 } from '../../lib/localStorage'
import { Guess } from '../types/guess'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { GuessContext } from '../../context/GameStateContext'

type Props = {
  solution: string
  guesses: Guess[]
  currentGuess: Guess
  isRevealing?: boolean
  currentRowClassName: string
}

export const Grid = ({
  solution,
  guesses,
  isRevealing,
  currentGuess,
  currentRowClassName,
}: Props) => {
  const gameStateContext = useContext(GuessContext)

  const onNewClick = () => {
    gameStateContext?.setDictionary({})
  }

  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow key={i} solution={solution} guess={guess} row={i} />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow guess={currentGuess} className={currentRowClassName} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
      <br />
      <div className="flex justify-center mb-1">
        <button type="button" className="btn btn-blue" onClick={onNewClick}>
          New Game
        </button>
      </div>
    </>
  )
}
