import { Cell } from './Cell'
import { solution, unicodeSplit } from '../../lib/words'

type Props = {
  guess: string
  className: string
  loading?: boolean,
  row?: number
}

export const CurrentRow = ({ guess, className, loading, row }: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} isLoading={loading} row={row}/>
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
