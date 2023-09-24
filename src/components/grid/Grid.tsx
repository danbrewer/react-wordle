import { MAX_CHALLENGES } from '../../constants/settings'
import { Guess } from '../../lib/reactletypes'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

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
    currentRowClassName
  }: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []
    
  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          solution={solution}
          guess={guess}
          row = {i}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow 
          guess={currentGuess} 
          className={currentRowClassName} 
          />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  )
}
