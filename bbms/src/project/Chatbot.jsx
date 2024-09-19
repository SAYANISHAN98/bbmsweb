import React from 'react';

export default function Chatbot() {
  return (
    <div className="flex flex-col items-center h-full p-4 bg-gray-100">
     
      <div className="flex w-full mb-6 space-x-4 h-4/5">
        <div className="justify-center flex-1 p-4 bg-white rounded-lg shadow-md ">
        </div>
        <div className="justify-center flex-1 p-4 bg-white rounded-lg shadow-md "></div>
      </div>

     
      <div className="flex items-center w-full mt-6 space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 p-2 border border-gray-300 rounded-lg shadow-md"
        />
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md">
          Chatbot
        </button>
      </div>
    </div>
  );
}
