import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Completed() {
  
  const navigate = useNavigate();





  return (

  <div className='flex items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
      <div className='w-4/5'>
           <div className="flex items-center justify-center w-full py-2 space-x-0 px-30">
        <button
          onClick={() => navigate('/Request')}
          className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 text-lg rounded-l-xl"
        >
          New Request
        </button>
        <button
          onClick={() => navigate('/Ongoing')}
          className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 text-lg"
        >
          On Going
        </button>

        <button
          onClick={() => navigate('/Completed')}
          className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 text-lg rounded-r-xl"
        >
          Completed
        </button>
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search for a donor..."
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>

      


        <div className='py-8'>
          <table className='w-full p-3 border-2 border-red-500 shadow-2xl'>
            <thead className='bg-red-100 border-b-2 border-gray-500'>
              <tr className='py-3 font-semibold tracking-wide text-center text-medium'>
                <th className='px-2 py-2'>No</th>
                <th className='px-2 py-2'>Hospital_Name</th>
                <th className='px-2 py-2'>Ward_No</th>
                <th className='px-2 py-2'>Blood_Type</th>
                <th className='px-2 py-2'>Quantity</th>
                <th className='px-2 py-2'>Request_Date</th>
                {/*<th className='px-2 py-2'>Action</th>*/}
              </tr>
            </thead>
         
            <tbody>
              {/*{users.map((user, index) => (
                 <tr key={user.id} className='font-semibold tracking-wide text-center text-medium'>
                  { <td className='px-2 py-2'>{index + 1}</td> }
                  <td className='px-2 py-2'>{userData.Uname}</td>
                  <td className='px-2 py-2'>{userData.Uemail}</td>
                  <td className='px-2 py-2'>{userData.Ucontactno}</td>
                  <td className='px-2 py-2'>{userData.Btype}</td>
                  <td className='px-2 py-2'>{userData.lastdonationdate}</td>
                  <td className='px-2 py-2 space-x-2'>
                    <button 
                     onClick={()=>navigate('')} className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
                      
                    >
                       Accept
                    </button>
                  </td>
                </tr>
              ))}*/}
                  <tr  className='font-semibold tracking-wide text-center text-medium'>
                  { <td className='px-2 py-2'>1</td> }
                  <td className='px-2 py-2'>name</td>
                  <td className='px-2 py-2'>email</td>
                  <td className='px-2 py-2'>contactno</td>
                  <td className='px-2 py-2'>type</td>
                  <td className='px-2 py-2'>date</td>
                 {/* <td className='px-2 py-2 space-x-2'>
                    <button 
                     onClick={()=>navigate('')} className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
                      
                    >
                      Accept
                    </button>
                    </td>*/}
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
  );
}
