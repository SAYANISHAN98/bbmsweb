import React, { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [prompt, setPrompt] = useState(''); // State for the user input prompt
  const [response, setResponse] = useState(''); // State for the response from Supabase

  // Function to handle sending the prompt to Supabase
  const sendPrompt = async () => {
    if (!prompt.trim()) {
      setResponse('Please enter a prompt.');
      return;
    }

    try {
      // Send the prompt directly to Supabase
      const supabaseResponse = await axios.post('http://localhost:3000/query', { query: prompt });

      // Update the state with the response from Supabase
      setResponse(supabaseResponse.data.response);
      setPrompt(''); // Clear input field after submission

    } catch (error) {
      console.error('API request error:', error);
      // Handle different types of errors more specifically
      if (error.response) {
        setResponse(`Error occurred: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        setResponse('Error occurred: No response from server');
      } else {
        setResponse(`Error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-full p-4 bg-gray-100">
      <div className="flex w-full mb-6 space-x-4 h-4/5">
        <div className="justify-center flex-1 p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h1>Enter a prompt</h1>
          <div className="flex-grow"></div> {/* Spacer to push input to the bottom */}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)} // Update prompt as user types
            placeholder="Write your prompt here"
            className="flex-1 p-2 border border-gray-300 rounded-lg shadow-md"
          />
          <button
            onClick={sendPrompt} // Call sendPrompt on button click
            className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg shadow-md"
          >
            Generate
          </button>
        </div>

        <div className="justify-center flex-1 p-4 bg-white rounded-lg shadow-md">
          <h2>Response:</h2>
          <p>{response}</p> {/* Display the response from Supabase */}
        </div>
      </div>
    </div>
  );
}
