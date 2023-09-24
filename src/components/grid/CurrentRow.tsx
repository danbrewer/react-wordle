import { Cell } from './Cell'
import { solution, unicodeSplit } from '../../lib/words'
import { Guess } from '../../lib/reactletypes'

type Props = {
  guess: Guess
  className: string
  row?: number
}

export const CurrentRow = ({ 
    guess, 
    className, 
    row 
  }: Props) => {
  const splitGuess = unicodeSplit(guess.value)
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) =>{ 
        console.log(`CurrentRow: ${letter}`)
        return(
        <Cell key={i} value={letter} row={row} />
      )})}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
