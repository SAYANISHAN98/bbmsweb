import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Doner() {
  
  const navigate = useNavigate();





  return (

  <div className='flex items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
      <div className='w-4/5'>
          <div className="flex items-center justify-between w-full py-8">
            <button
              onClick={() => navigate('/finddoner')}
              className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-xl text-lg"
            >
              Find Donar
            </button>
            
            <button
              onClick={() => navigate('/Add')}
              className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-xl text-lg"
            >
              Add
            </button>
        </div>

      


        <div className='py-8'>
          <table className='w-full p-3 border-2 border-red-500 shadow-2xl'>
            <thead className='bg-red-100 border-b-2 border-gray-500'>
              <tr className='py-3 font-semibold tracking-wide text-center text-medium'>
                <th className='px-2 py-2'>No</th>
                <th className='px-2 py-2'>Name</th>
                <th className='px-2 py-2'>Email</th>
                <th className='px-2 py-2'>Contact Number</th>
                <th className='px-2 py-2'>Blood Type</th>
                <th className='px-2 py-2'>Last Donation Date</th>
                <th className='px-2 py-2'>Action</th>
              </tr>
            </thead>
         
            <tbody>
              {/*{users.map((user, index) => (
                 <tr key={user.id} className='font-semibold tracking-wide text-center text-medium'>
                  { <td className='px-2 py-2'>{index + 1}</td> }
                  <td className='px-2 py-2'>{user.Uname}</td>
                  <td className='px-2 py-2'>{user.Uemail}</td>
                  <td className='px-2 py-2'>{user.Ucontactno}</td>
                  <td className='px-2 py-2'>{user.Btype}</td>
                  <td className='px-2 py-2'>{user.lastdonationdate}</td>
                  <td className='px-2 py-2 space-x-2'>
                    <button 
                     onClick={()=>navigate('/ViewDetail')} className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
                      
                    >
                      View
                    </button>
                    <button 
                      onClick={()=>navigate('/Donate')}className="font-bold text-white bg-green-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
                      
                    >
                          Donate
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
                  <td className='px-2 py-2 space-x-2'>
                    <button 
                     onClick={()=>navigate('/ViewDetail')} className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
                      
                    >
                      View
                    </button>
                    <button 
                      onClick={()=>navigate('/Donate')}className="font-bold text-white bg-green-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
                      
                    >
                          Donate
                    </button>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
  );
}
