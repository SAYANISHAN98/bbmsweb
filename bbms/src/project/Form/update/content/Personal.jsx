import React, { useContext } from 'react';
import { StepperContext } from '../context/StepperContext';

export default function Personal() {
  
  return (
    <div className='flex flex-col'>
      <div className='flex-1 w-full mx-2'>
        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          UserName :
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
           
            name='Uname'
            placeholder=''
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
      </div>

      <div className='flex-1 w-full mx-2'>
        <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Email :
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
            
            name='Uemail'
            placeholder=''
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
      </div>

      <div className='flex-1 w-full mx-2'>
        <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Contact_number :
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
            
            name='Ucontactno'
            placeholder=''
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
      </div>

      <div className='flex-1 w-full mx-2'>
        <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Address :
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
           
            name='Uaddress'
            placeholder=''
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
      </div>

      <div className='flex-1 w-full mx-2'>
        <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-500 uppercase'>
          User Role
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <select
            name='Urole'
            
            className='w-full p-1 px-2 text-gray-800 outline-none'
          >
            <option value="Admin">Admin</option>
            <option value="Doner">Doner</option>
            <option value="staff">staff</option>
          </select>
        </div>
      </div>

      <div className='flex w-full mx-2'>
        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Age :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              
              name='Uage'
              placeholder=''
              type='number'
              min='18'
              max="60"
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Gender :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <select
              name='Ugender'
              
              className='w-full p-1 px-2 text-gray-800 outline-none'
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      
    </div>
  );
}
