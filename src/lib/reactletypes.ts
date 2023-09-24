export type StoredGameState = {
    guesses: {value: string, isNew: boolean}[]
    solution: string
}

export type Guess = {
    value: string,
    isNew?: boolean
}