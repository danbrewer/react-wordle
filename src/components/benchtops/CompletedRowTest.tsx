import { useState } from 'react'
import { Guess } from '../types/guess'
import { CompletedRow } from '../grid/CompletedRow'

  
  export const CompletedRowTest = () => {

    const [revealing, setRevealing] = useState(true)

    const handleClick = ()=>{
      setRevealing(!revealing);
    }

    const guess : Guess = {
      value: "CLAIM",
      isNew: true,
      state: '00000', 
      guessStates: {}
    }

    return (
      <>
      <CompletedRow solution="PLACE" guess={guess} isRevealing={revealing} row={1} ></CompletedRow>
      <button type="button" onClick={handleClick}>
        {`Revealing: ${revealing}`}
      </button>
    </>
    )
  }
  