import React, { useContext } from 'react';
import { StepperContext } from '../context/StepperContext';

export default function Personal() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className='flex flex-col'>
      <div className='flex-1 w-full mx-2'>
        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          UserName :
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData["Uname"] || ""}
            name='Uname'
            placeholder='User name'
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
            onChange={handleChange}
            value={userData["Uemail"] || ""}
            name='Uemail'
            placeholder='User email'
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
            onChange={handleChange}
            value={userData["Ucontactno"] || ""}
            name='Ucontactno'
            placeholder='User contact No'
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
            onChange={handleChange}
            value={userData["Uaddress"] || ""}
            name='Uaddress'
            placeholder='User Address'
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
      </div>

      <div className='flex-1 w-full mx-2'>
        <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-500 uppercase'>
          User Role :
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <select
            name='Urole'
            value={userData["Urole"] || ""}
            onChange={handleChange}
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
              onChange={handleChange}
              value={userData["Uage"] || ""}
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
              value={userData["Ugender"] || ""}
              onChange={handleChange}
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
