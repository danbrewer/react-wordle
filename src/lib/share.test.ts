import { Guess } from './reactletypes'
import { generateEmojiGrid } from './share'

describe('generateEmojiGrid', () => {
  test('generates grid for ascii', () => {
    const guesses : Guess[] = [
      {value:'EDCBA', isNew: false},
      {value:'VWXYZ', isNew: false},
      {value: 'ABCDE', isNew: false}]
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absemt

    const grid = generateEmojiGrid('ABCDE', guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe('PPCPP')
    expect(gridParts[1]).toBe('AAAAA')
    expect(gridParts[2]).toBe('CCCCC')
  })
  test('generates grid for emoji', () => {
    const guesses : Guess[] =  [
      {value:'5️⃣4️⃣3️⃣2️⃣1️⃣', isNew:false}, 
      {value:'♠️♥️♦️♣️🔔', isNew: false},
      {value: '1️⃣2️⃣3️⃣4️⃣5️⃣', isNew: false}]
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absemt

    const grid = generateEmojiGrid('1️⃣2️⃣3️⃣4️⃣5️⃣', guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe('PPCPP')
    expect(gridParts[1]).toBe('AAAAA')
    expect(gridParts[2]).toBe('CCCCC')
  })
})
