import React from 'react';

export default function ViewDetail() {
  return (
    <div className='w-1/2 p-10 mx-auto bg-white shadow-xl rounded-2xl'>
      <div className='flex items-center justify-center'>
      <h2 className='text-4xl font-bold text-red-500 uppercase'>User Details</h2>
      </div>
      <div className='mt-4'>
        
        <div className='flex-1 w-full mx-2 mt-3'>
            <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
                <strong>User Name :</strong> 
            </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
            <strong>Email :</strong> 
            </div>
        </div>

        
        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
          <strong>Contact Number :</strong> 
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
          <strong>  Address :</strong> 
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
          <strong> User Role :</strong> 
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
          <strong>Age :</strong>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
          <strong>Gender :</strong>
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
          <strong>Blood Type :</strong>
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
          <strong>Last Donation Date :</strong> 
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
          <strong>Health History :</strong> 
          </div>
        </div>
        
        <div className='flex-1 w-full mx-2 mt-3'>
        <div className='h-8 text-xl font-bold leading-8 text-gray-600 '>
          <strong>Diseases :</strong> 
          </div>
        </div>

        <div className='container flex justify-around mt-8 mb-5'>
        <a href="/Update">
        <button className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
            Update
        </button>
        </a>
        
        </div>
      </div>
    </div>
  );
}
