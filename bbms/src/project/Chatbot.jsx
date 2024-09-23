import React, { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post('http://localhost:3000/api/chat', { query });
      setResponse(result.data.response); // Adjust based on your API response structure
    } catch (error) {
      console.error('API request error:', error);
      if (error.response) {
        setResponse(`Error occurred: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        setResponse('Error occurred: No response from server');
      } else {
        setResponse(`Error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-full p-4 bg-gray-100">
      <div className="flex w-full mb-6 space-x-4 h-4/5">
        <div className="justify-center flex-1 p-4 bg-white rounded-lg shadow-md">
          {response && (
            <div className="response">
              <h3 className="font-semibold text-lg">Response:</h3>
              <p>{response}</p>
            </div>
          )}
          {loading && <p>Loading...</p>}
        </div>
        <div className="justify-center flex-1 p-4 bg-white rounded-lg shadow-md">
          {/* Placeholder for additional content or chat area */}
        </div>
      </div>

      <div className="flex items-center w-full mt-6 space-x-2">
        <input
          type="text"
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg shadow-md"
        />
        <button
          onClick={handleQuerySubmit}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
