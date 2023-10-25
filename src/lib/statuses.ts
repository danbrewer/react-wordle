import { Guess } from '../components/types/guess'
import { unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  solution: string,
  guesses: Guess[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)

  guesses.forEach((guess) => {
    unicodeSplit(guess.value).forEach((letter, i) => {
      if (!splitSolution.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === splitSolution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (
  guess: Guess
): CharStatus[] => {
  // const splitState = unicodeSplit(solution)
  const splitStates = unicodeSplit(guess.state)

  return splitStates.map((s,i)=>{
    switch(s)
    {
      case "0":
        return "absent";
      case "1": 
        return "present";
      case "2":
        return "correct";
      default:
        return "correct";
    };
  })

  // const solutionCharsTaken = splitSolution.map((_) => false)

  // const statuses: CharStatus[] = Array.from(Array(guess.length))

  // // handle all correct cases first
  // splitGuess.forEach((letter, i) => {
  //   if (letter === splitSolution[i]) {
  //     statuses[i] = 'correct'
  //     solutionCharsTaken[i] = true
  //     return
  //   }
  // })

  // splitGuess.forEach((letter, i) => {
  //   if (statuses[i]) return

  //   if (!splitSolution.includes(letter)) {
  //     // handles the absent case
  //     statuses[i] = 'absent'
  //     return
  //   }

  //   // now we are left with "present"s
  //   const indexOfPresentChar = splitSolution.findIndex(
  //     (x, index) => x === letter && !solutionCharsTaken[index]
  //   )

  //   if (indexOfPresentChar > -1) {
  //     statuses[i] = 'present'
  //     solutionCharsTaken[indexOfPresentChar] = true
  //     return
  //   } else {
  //     statuses[i] = 'absent'
  //     return
  //   }
  // })

  // return statuses
}
