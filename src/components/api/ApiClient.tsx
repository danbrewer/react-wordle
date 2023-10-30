// ApiPost.tsx
import React, { useState } from "react";
import axios from "axios";

const ApiPost: React.FC = () => {
  // State to store the response data
  const [lettersInWord, setLettersInWord] = useState<string>("");
  const [hits, setHits] = useState<string>("");
  const [misses, setMisses] = useState<string>("");
  const [deadLetters, setDeadLetters] = useState<string>("");
  const [allowDupes, setAllowDupes] = useState<string>("");
  const [response, setResponse] = useState<any>(null);

  const handlePostRequest = ()=>{  // Data to send in the POST request
  const postData = {
    "lettersInWord": lettersInWord, // "id"
    "hits": hits, //"a....",
    "misses": [misses], //["..i..","...d."],
    "deadLetters": deadLetters, //"crwthse",
    "allowDupes": allowDupes //"N"
  };

  // Effect hook to make the POST request when the component mounts
//   useEffect(() => {
    // Define the API URL
    const apiUrl = "http://localhost:8000/api/search"; //the API endpoint

    // Make a POST request with the data
    axios.post(apiUrl, postData)
      .then((res) => {
        setResponse(res.data); // Store the response data in state
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
//   }, []); // Empty dependency array means this effect runs once after mounting
}

  return (
    <div className="container mt-5">
    <h1 className="text-center">API POST Request with User Input</h1>
    <div className="form-group">
      <label htmlFor="lettersInWord">Letters in word:</label>
      <input
        type="text"
        className="form-control"
        id="lettersInWord"
        value={lettersInWord}
        onChange={(e) => setLettersInWord(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="hits">Hits:</label>
      <input
        type="text"
        className="form-control"
        id="hits"
        value={hits}
        onChange={(e) => setHits(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="misses">Misses:</label>
      <input
        type="text"
        className="form-control"
        id="misses"
        value={misses}
        onChange={(e) => setMisses(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="deadLetters">Dead letters:</label>
      <input
        type="text"
        className="form-control"
        id="deadLetters"
        value={deadLetters}
        onChange={(e) => setDeadLetters(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="allowDupes">Allow dupes:</label>
      <input
        type="text"
        className="form-control"
        id="allowDupes"
        value={allowDupes}
        onChange={(e) => setAllowDupes(e.target.value)}
      />
    </div>
    <button className="btn btn-primary" onClick={handlePostRequest}>
      Make POST Request
    </button>
    {response ? (
      <div className="mt-3">
        <h2>Response:</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    ) : (
      <p className="mt-3">No response yet. Fill in the arguments and click the button.</p>
    )}
  </div>
  );
};

export default ApiPost;
