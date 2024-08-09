import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Accepted() {
  const navigate = useNavigate();



  const users = [
    { id: 1, Uname: 'Alice', Btype: 'A+', lastdonationdate: '2024-01-01' },
    { id: 2, Uname: 'Bob', Btype: 'B+', lastdonationdate: '2024-02-01' },
    // Add more users here
  ];
  

  return (
    <div className='flex flex-col items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
     <div className='w-4/5'>
     <div className='flex justify-between mt-8'>
          
          <div className='flex justify-center'>
            <button
              onClick={() => navigate('/Finddonor')}
              className='font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-8 rounded-xl text-lg'
            >
              Back
            </button>
          </div>
         
        </div>
        
        
        <div className='py-8'>
          <table className='w-full p-3 border-2 border-red-500 shadow-2xl'>
            <thead className='bg-red-100 border-b-2 border-gray-500'>
              <tr className='py-3 font-semibold tracking-wide text-center text-medium'>
           
                <th className='px-2 py-2'>No</th>
                <th className='px-2 py-2'>Name</th>
                <th className='px-2 py-2'>Blood Type</th>
                <th className='px-2 py-2'>Last Donation Date</th>
                <th className='px-2 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userData, index) => (
                <tr key={userData.id} className='font-semibold tracking-wide text-center text-medium'>
                  <td className='px-2 py-2'>{index + 1}</td>
                  <td className='px-2 py-2'>{userData.Uname}</td>
                  <td className='px-2 py-2'>{userData.Btype}</td>
                  <td className='px-2 py-2'>{userData.lastdonationdate}</td>
                  <td className='px-2 py-2 space-x-2'>
                  <button
                      onClick={() => navigate('/ViewDetail')}
                      className='font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg'
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
