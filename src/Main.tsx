import App from './App'
import { GuessProvider } from './context/GameStateContext'
function Main() {
  return (
    <GuessProvider>
      <App />
    </GuessProvider>
  )
}

export default Main
