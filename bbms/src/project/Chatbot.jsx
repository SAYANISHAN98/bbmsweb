import React, { useState } from 'react';

export default function Chatbot() {
  const [prompt, setPrompt] = useState('');  // State for the user input prompt
  const [response, setResponse] = useState('');  // State for the OpenAI response

  // Function to handle sending the prompt to the back-end
  const sendPrompt = async () => {
    try {

      const result1 = await axios.post('http://localhost:3000/api/chat', { query });

      const result = await axios.post('http://localhost:3000/query', { query });

     setResponse(result.data.response); // Adjust based on your API response structure
    } catch (error) {
      console.error('API request error:', error);
      if (error.response) {
        setResponse(`Error occurred: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        setResponse('Error occurred: No response from server');
      } else {
        setResponse(`Error occurred: ${error.message}`);

      const res = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),  // Send the user's prompt as JSON
      });
      const data = await res.json();
      if (data.response) {
        setResponse(data.response);  // Update response state with OpenAI response
      } else if (data.error) {
        setResponse(`Error: ${data.error}`);

      }
    // } catch (error) {
    //   setResponse('An error occurred while fetching the data.');
    // }
  };

  return (
    <div className="flex flex-col items-center h-full p-4 bg-gray-100">
      <div className="flex w-full mb-6 space-x-4 h-4/5">
        <div className="justify-center flex-1 p-4 bg-white rounded-lg shadow-md">
          <h1>Enter a prompt</h1>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}  // Update prompt state as user types
            placeholder="Write your prompt here"
            className="flex-1 p-2 border border-gray-300 rounded-lg shadow-md"
          />
          <button
            onClick={sendPrompt}  // Call sendPrompt on button click
            className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg shadow-md"
          >
            Generate
          </button>
        </div>

        <div className="justify-center flex-1 p-4 bg-white rounded-lg shadow-md">
          <h2>Response:</h2>
          <p>{response}</p>  {/* Display the OpenAI response */}
        </div>
      </div>
    </div>
  );
}
  }
}
