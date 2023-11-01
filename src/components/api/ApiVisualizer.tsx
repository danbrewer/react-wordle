// ApiPost.tsx
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { GuessContext } from '../../context/GameStateContext'
import { Guess } from '../types/guess'
import { Words } from '../types/words'

const ApiVisualizer: React.FC = () => {
  const [postData, setPostData] = useState<string | null>(null)
  const [response, setResponse] = useState<Words | null>(null)

  const gameStateContext = useContext(GuessContext)

  //    const handlePostRequest = () => {
  //      // Data to send in the POST request

  //      // Effect hook to make the POST request when the component mounts
  //      //   useEffect(() => {
  //      // Define the API URL
  //      const apiUrl = 'http://localhost:8000/api/search' //the API endpoint

  //      // Make a POST request with the data
  //      axios
  //        .post(apiUrl, postData)
  //        .then((res) => {
  //          setResponse(res.data) // Store the response data in state
  //        })
  //        .catch((error) => {
  //          console.error('Error making POST request:', error)
  //        })
  //      //   }, []); // Empty dependency array means this effect runs once after mounting
  //    }

  useEffect(() => {
    const data: {
      lettersInWord: string // "id"
      hits: string //"a....",
      misses: string[] //["..i..","...d."],
      deadLetters: string //"crwthse",
      allowDupes: string //"N"
    } = {
      lettersInWord: '',
      hits: '.....',
      misses: [],
      deadLetters: '',
      allowDupes: 'N',
    }

    if (gameStateContext) {
      // iterate through gameStateContext.dictionary keys
      let keys = Object.keys(gameStateContext.dictionary)
      keys.forEach((key: string) => {
        // add type annotation to key parameter
        let dictionary: Guess = gameStateContext.dictionary[parseInt(key)]
        // iterate through dictionary.state string
        let states = dictionary.state.split('')
        states.forEach((s: string, index: number) => {
          switch (s) {
            case '0': // absent
              data.deadLetters = data.deadLetters + dictionary.value[index]
              break
            case '1': // misses
              let miss = '.....'
              miss =
                miss.slice(0, index) +
                dictionary.value[index] +
                miss.slice(index + 1)
              data.misses.push(miss)

              if (data.lettersInWord.indexOf(dictionary.value[index]) === -1)
                data.lettersInWord =
                  data.lettersInWord + dictionary.value[index]

              break
            case '2': // hits
              data.hits =
                data.hits.slice(0, index) +
                dictionary.value[index] +
                data.hits.slice(index + 1)
              if (data.lettersInWord.indexOf(dictionary.value[index]) === -1)
                data.lettersInWord =
                  data.lettersInWord + dictionary.value[index]
              break
          }
        })
      })

      setPostData(JSON.stringify(data, null, 2))

      const apiUrl = 'http://localhost:8000/api/search' //the API endpoint

      // Make a POST request with the data
      axios
        .post(apiUrl, data)
        .then((res) => {
          console.log(res.data)
          setResponse(res.data) // JSON.stringify(res.data, null, 2)) // Store the response data in state
        })
        .catch((error) => {
          console.error('Error making POST request:', error)
        })
    }
  }, [gameStateContext, setPostData])

  return (
    <div
      className="justify-center flex-col"
      style={{
        overflowY: 'clip',
        backgroundColor: 'lightgreen',
        display: 'flex',
        flexGrow: 1,
      }}
    >
      {/* <div style={{ width: '50%', height: '100%' }}>
        <h2>Request data:</h2>

        <pre>{postData}</pre>
      </div> */}
      <h4 className="text-2xl font-bold dark:text-white text-center">
        {response?.wordCount} words found
      </h4>
      <div
        className="mt-3"
        style={{
          //   width: '50%',
          height: '100%',
          overflowY: 'scroll',
          backgroundColor: 'yellow',
        }}
      >
        {response?.wordList.map((word: string) => (
          <div key={word} className="text-2xl text-center">
            {word}
          </div>
        ))}
        {/* <pre>{JSON.stringify(response?.wordList, null, 2)}</pre> */}
      </div>
    </div>
  )
}

export default ApiVisualizer
