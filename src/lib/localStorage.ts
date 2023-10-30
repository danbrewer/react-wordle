import { Guess } from "../components/types/guess"

const gameStateKey2 = 'gameState2'
const highContrastKey = 'highContrast'

type StoredGameState2 = {
  guesses: {[key: number]: Guess}
}

export const loadGameStateFromLocalStorage2 = () => {
  const state = localStorage.getItem(gameStateKey2)
  return state ? (JSON.parse(state) as StoredGameState2) : null
}

export const saveGameStateToLocalStorage2 = (gameState2: StoredGameState2) => {
  localStorage.setItem(gameStateKey2, JSON.stringify(gameState2))
}

const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1')
  } else {
    localStorage.removeItem(highContrastKey)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === '1'
}
