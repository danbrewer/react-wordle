import { Guess } from '../components/types/guess'
import { generateEmojiGrid } from './share'

describe('generateEmojiGrid', () => {
  test('generates grid for ascii', () => {
    const guesses : Guess[] = [
      {value:'EDCBA', isNew: false, state: '00000'},
      {value:'VWXYZ', isNew: false, state: '00000'},
      {value: 'ABCDE', isNew: false, state: '00000'}]
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absemt

    const grid = generateEmojiGrid('ABCDE', guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe('PPCPP')
    expect(gridParts[1]).toBe('AAAAA')
    expect(gridParts[2]).toBe('CCCCC')
  })
  test('generates grid for emoji', () => {
    const guesses : Guess[] =  [
      {value:'5️⃣4️⃣3️⃣2️⃣1️⃣', isNew:false, state: '00000'}, 
      {value:'♠️♥️♦️♣️🔔', isNew: false, state: '00000'},
      {value: '1️⃣2️⃣3️⃣4️⃣5️⃣', isNew: false, state: '00000'}]
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absemt

    const grid = generateEmojiGrid('1️⃣2️⃣3️⃣4️⃣5️⃣', guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe('PPCPP')
    expect(gridParts[1]).toBe('AAAAA')
    expect(gridParts[2]).toBe('CCCCC')
  })
})
