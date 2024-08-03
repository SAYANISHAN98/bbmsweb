import React from 'react';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="flex w-4/5 pb-2 bg-white shadow-xl h-3/5 rounded-2xl">
        
        <div className="flex items-center justify-center w-1/3 border-r border-gray-200">
          <img
            src=".\user_profile.png" 
            alt="User Profile"
            className="w-24 h-24 rounded-full"
          />
        </div>
        
       
        <div className="flex flex-col justify-center w-2/3 p-4 space-y-5">
          <h2 className="text-xl font-semibold">User Name : MR.Ram</h2>
          <p className="text-xl font-semibold text-gray-600">Role : ADMIN</p>
          <p className="text-xl font-semibold text-gray-600">Last Access : 2024-08-01</p>
        </div>
      </div>
    </div>
  );
}
