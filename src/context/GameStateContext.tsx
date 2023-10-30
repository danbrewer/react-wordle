import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Guess } from '../components/types/guess'
import { loadGameStateFromLocalStorage2, saveGameStateToLocalStorage2 } from '../lib/localStorage'



type GuessContextData = {
  dictionary: { [key: number]: Guess },
  setDictionary: (value: { [key: number]: Guess }) => void
}


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
  // the dictionary that will be shared with other components
  const [dictionary, setDictionary] = useState<{[key: number]: Guess}>(()=>
{
    const storedGameState = loadGameStateFromLocalStorage2()
    return storedGameState?.guesses ?? {}
});

  // when the dictionary changes, save it to local storage
  useEffect(() => {
    saveGameStateToLocalStorage2({ guesses: dictionary })
  }, [dictionary])

  // cache the dictionary to prevent dependent components from re-rendering
  // note that "value" is going to be injected into the <GuessContext.Provider> in the JSX
  const value = useMemo(
    () => ({ dictionary: dictionary, setDictionary }), 
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
