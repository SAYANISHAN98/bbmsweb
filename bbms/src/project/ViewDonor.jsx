
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ViewDonor() {
  return (
    <div className='w-1/2 p-10 mx-auto bg-white shadow-xl rounded-2xl'>
      <div className='flex items-center justify-center'>
        <h2 className='text-4xl font-bold text-red-500 uppercase'>User Details</h2>
      </div>
      <div className='mt-4'>
        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>User Name :</div> 
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Email :</div> 
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Contact Number :</div> 
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Address :</div> 
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>User Role :</div> 
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Age :</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Gender :</div>
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Blood Type :</div>
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Last Donation Date :</div> 
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Health History :</div> 
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Diseases :</div> 
          </div>
        </div>

        <div className='container flex justify-around mt-8 mb-5'>
          
          <NavLink to="/Accepted">
            <button className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
              Back
            </button>
          </NavLink> 
        </div> 
      </div>
    </div>
  );
}

