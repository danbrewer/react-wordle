import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'
import { Guess } from '../../lib/reactletypes'

type Props = {
  solution: string
  guess: Guess
  isRevealing?: boolean
  loading?: boolean
  row?: number
}

export const CompletedRow = ({ 
    solution, 
    guess, 
    row 
  }: Props) => {
  const statuses = getGuessStatuses(solution, guess.value)
  const splitGuess = unicodeSplit(guess.value)

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => 
      {
        console.log(`CompletedRow: ${letter}`)
      return (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={true}// guess.isNew}
          row={row}
        />
      )})}
    </div>
  )
}
