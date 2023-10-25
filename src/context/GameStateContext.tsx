import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Guess } from '../components/types/guess'
import { loadGameStateFromLocalStorage2, saveGameStateToLocalStorage, saveGameStateToLocalStorage2 } from '../lib/localStorage'



type GuessContextData = {
  dictionary: { [key: number]: Guess },
  setDictionary: (value: { [key: number]: Guess }) => void
}

// type GuessContextData2 = {
//   dictionary: { [key: number]: Guess },
//   setDictionary: (value: { [key: number]: Guess }) => void
// }

export const GuessContext = createContext<GuessContextData | null>({
  dictionary: {},
  setDictionary: (value: { [key: number]: Guess }) => { }
})



GuessContext.displayName = 'GuessContext'

export const useGuess = () => useContext(GuessContext) as GuessContextData

type Props = {
  children?: ReactNode
}


export const GuessProvider = ({ children }: Props) => {

  const [dictionary, setDictionary] = useState(loadGameStateFromLocalStorage2() || {})

  // when the dictionary changes, save it to local storage
  useEffect(() => {
    saveGameStateToLocalStorage2({ dictionary })
  }, [dictionary])

  const value = useMemo(
    () => ({ dictionary, setDictionary }), 
    [dictionary]
  );

  
  return (
    <GuessContext.Provider
        value={value}  
    >
      {children}
    </GuessContext.Provider>
  )
}
