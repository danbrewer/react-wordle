// ApiPost.tsx
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { GuessContext } from '../../context/GameStateContext'
import { Guess } from '../types/guess'

const ApiVisualizer: React.FC = () => {
  // State to store the response data
  //   const [lettersInWord, setLettersInWord] = useState<string>('')
  //   const [hits, setHits] = useState<string>('.....')
  //   const [misses, setMisses] = useState<string[]>([])
  //   const [deadLetters, setDeadLetters] = useState<string>('')
  //   const [allowDupes, setAllowDupes] = useState<string>('')
  //   const [response, setResponse] = useState<any>(null)
  const [postData, setPostData] = useState<string | null>(null)

  const gameStateContext = useContext(GuessContext)

  useEffect(() => {
    const postData = {
      lettersInWord: '', // "id"
      hits: '.....', //"a....",
      misses: [''], //["..i..","...d."],
      deadLetters: '', //"crwthse",
      allowDupes: 'N', //"N"
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
              postData.deadLetters =
                postData.deadLetters + dictionary.value[index]
              break
            case '1': // misses
              let miss = '.....'
              miss =
                miss.slice(0, index) +
                dictionary.value[index] +
                miss.slice(index + 1)
              postData.misses.push(miss)
              break
            case '2': // hits
              postData.hits =
                postData.hits.slice(0, index) +
                dictionary.value[index] +
                postData.hits.slice(index + 1)
              break
          }
        })
      })

      setPostData(JSON.stringify(postData, null, 2))
    }
  }, [gameStateContext, setPostData])

  //   const handlePostRequest = () => {
  //     // Data to send in the POST request

  //     // Effect hook to make the POST request when the component mounts
  //     //   useEffect(() => {
  //     // Define the API URL
  //     const apiUrl = 'http://localhost:8000/api/search' //the API endpoint

  //     // Make a POST request with the data
  //     axios
  //       .post(apiUrl, postData)
  //       .then((res) => {
  //         setResponse(res.data) // Store the response data in state
  //       })
  //       .catch((error) => {
  //         console.error('Error making POST request:', error)
  //       })
  //     //   }, []); // Empty dependency array means this effect runs once after mounting
  //   }

  return (
    <div className="container mt-5">
      <h1 className="text-center">API POST Request with User Input</h1>

      {postData ? (
        <div className="mt-3">
          <h2>Post data:</h2>
          <pre>{postData}</pre>
        </div>
      ) : (
        <p className="mt-3">No post data yet.</p>
      )}
    </div>
  )
}

export default ApiVisualizer
