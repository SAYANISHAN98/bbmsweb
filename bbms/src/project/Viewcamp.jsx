import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Viewcamp() {
  return (
    <div className='flex w-3/4 p-10 mx-auto bg-white shadow-xl rounded-2xl'>
         <div className='flex-1 pl-10'>
        <div className='flex items-center justify-center'>
          <h2 className='text-4xl font-bold text-red-500 uppercase'>Blood Camp Details</h2>
        </div>

        <div className='mt-4'>
          <div className='flex-1 w-full mx-2 mt-3'>
            <div className='h-8 font-bold leading-8 text-gray-700'>
              <div>Camp Name :</div> 
            </div>
          </div>
          
          <div className='flex-1 w-full mx-2 mt-3'>
            <div className='h-8 font-bold leading-8 text-gray-700'>
              <div>Camp Date :</div> 
            </div>
          </div>

          <div className='flex-1 w-full mx-2 mt-3'>
            <div className='h-8 font-bold leading-8 text-gray-700'>
              <div>Location :</div> 
            </div>
          </div>
          
          <div className='flex-1 w-full mx-2 mt-3'>
            <div className='h-8 font-bold leading-8 text-gray-700'>
              <div>Status :</div> 
            </div>
          </div>
          


          <div className='container flex justify-around mt-8 mb-5'>
            <NavLink to="/Bloodcampupdate">
              <button className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
                Update
              </button>
            </NavLink>
            
            <NavLink to="/Delete">
              <button className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
                Delete
              </button>
            </NavLink>

            <NavLink to="/Bloodcamp"> 
            <button
            type="button"className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600">
            Back
          </button>
          </NavLink>
          </div>
        </div>
        
      </div>
    </div>
  );
}
