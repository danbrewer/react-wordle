import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react'


type RevealingContextValue = {
  isRevealing: boolean,
  setIsRevealing: {}
}

export const RevealingContext = createContext<RevealingContextValue | null>({
  isRevealing: false,
  setIsRevealing:{}
})

RevealingContext.displayName = 'RevealingContext'

export const useRevealing = () => useContext(RevealingContext) as RevealingContextValue

type Props = {
  children?: ReactNode
}

export const RevealingProvider = ({ children }: Props) => {
  const [isRevealing, setIsRevealing] = useState(false)

  return (
    <RevealingContext.Provider
      value={{
        isRevealing,
        setIsRevealing
      }}
    >
      {children}
    </RevealingContext.Provider>
  )
}
