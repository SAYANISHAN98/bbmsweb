import React, { useState } from 'react';
import axios from 'axios';
import openai from '../lib/openai'; // Adjust the path if necessary

export default function Chatbot() {
  const [prompt, setPrompt] = useState('');  // State for the user input prompt
  const [response, setResponse] = useState('');  // State for the response from Supabase

  // Function to handle sending the prompt to OpenAI and then to Supabase
  const sendPrompt = async () => {
    if (!prompt.trim()) {
      setResponse('Please enter a prompt.');  // Check for empty input
      return;
    }

    try {
      // Send the prompt to OpenAI API
      const openAiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Specify the model
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      });


      const result1 = await axios.post('http://localhost:3000/api/chat', {  });

      const result = await axios.post('http://localhost:3000/query', { });

      const openAiQuery = openAiResponse.choices[0].message.content.trim();

      // Use the response from OpenAI to query Supabase
      const supabaseResponse = await axios.post('http://localhost:3000/query', { query: openAiQuery });


      setResponse(supabaseResponse.data.response); // Update state with Supabase response

      // Clear the prompt input after submission
      setPrompt('');
    } catch (error) {
      console.error('API request error:', error);
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
          <p>{response}</p>  {/* Display the response from Supabase */}
        </div>
      </div>
    </div>
  );
}

