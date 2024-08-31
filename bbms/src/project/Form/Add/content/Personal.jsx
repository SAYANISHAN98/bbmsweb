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
        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
              First Name :
            </div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
              <input
                onChange={handleChange}
                value={userData["Fname"] || ""}
                name='Fname'
                placeholder='First name'
                className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
              />
            </div>
          </div>
          
          <div className='flex-1 ml-2'>
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
              Last Name :
            </div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
              <input
                onChange={handleChange}
                value={userData["Lname"] || ""}
                name='Lname'
                placeholder='Last name'
                className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
              />
            </div>
          </div>
        </div>

        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
              NIC no :
            </div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
              <input
                onChange={handleChange}
                value={userData["nicNo"] || ""}
                name='nicNo'
                placeholder='NIC number'
                className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
              />
            </div>
          </div>
          
          <div className='flex-1 ml-2'>
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
              Date of Birth :
            </div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
              <input
                onChange={handleChange}
                type='date'
                value={userData["dob"] || ""}
                name='dob'
                placeholder='Date of Birth'
                className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
              />
            </div>
          </div>
        </div>
        
      
       <div className='flex w-full mx-2'> 
        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
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

        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
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
      </div>

      <div className='flex w-full mx-2'>
        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Home No :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              onChange={handleChange}
              value={userData["UhomeNo"] || ""}
              name='UhomeNo'
              placeholder='Home number'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Street :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              onChange={handleChange}
              value={userData["Ustreet"] || ""}
              name='Ustreet'
              placeholder='Street'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            City :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              onChange={handleChange}
              value={userData["Ucity"] || ""}
              name='Ucity'
              placeholder='City'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
      </div>

      <div className='flex w-full mx-2'>
        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            District :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              onChange={handleChange}
              value={userData["Udistrict"] || ""}
              name='Udistrict'
              placeholder='District'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Province :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              onChange={handleChange}
              value={userData["Uprovince"] || ""}
              name='Uprovince'
              placeholder='Province'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
      </div>

      <div className='flex w-full mx-2'>
        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
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
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>

        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
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
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
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
