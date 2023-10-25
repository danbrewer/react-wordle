export type Guess = {
    value: string,
    isNew?: boolean,
    state: string
    guessStates: { [key: number]: string }
}