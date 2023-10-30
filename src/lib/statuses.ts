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

  
}
