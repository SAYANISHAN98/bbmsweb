import React from 'react'
import { FaSearch, FaUserCircle, FaCog, FaUser, FaSignOutAlt, FaTint } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

export default function Navigation() {
  const Logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('Error signing out:', error.message)
    } else {
      console.log('User signed out successfully')
     
    }
  }

  return (
    <div className='flex justify-between w-full px-4 py-1' style={{ backgroundColor: '#b22222' }}>
      <div className='flex items-center text-2xl font-bold text-white'>
        <FaTint className='mr-2' />
        Blood Bank Management System
      </div>

      <div className='flex items-center gap-x-5'>
       {/* <div className='relative md:w-65'>
          <span className='relative inset-y-0 left-0 flex items-center pl-2 md:absolute'>
            <button className='p-1 text-white focus:outline-none md:text-black'><FaSearch /></button>
          </span>
          <input type="text" className='hidden w-full px-4 py-1 pl-12 rounded shadow outline-none md:block' />
        </div>*/}

        <div className='relative'>
          <button className='text-white group'>
            <FaUserCircle className='w-10 h-10 mt-1' />
            <div className='absolute right-0 z-10 hidden w-40 bg-white rounded-lg shadow group-focus:block top-full'>
              <ul className='px-3 py-2 text-base font-bold text-gray-600'>
                
                <li className='flex items-center mb-3'>
                  <FaUser className='mr-2' />
                  <a href=''>Profile</a>
                </li>
                
                <hr className='bg-gray-600' />

                
                <li className='flex items-center mt-2 mb-3'>
                  <FaCog className='mr-2' />
                  <a href=''>Settings</a>
                </li>
                <hr className='bg-gray-600' />
               
                <li  onClick={Logout} className='flex items-center mt-1 mb-3'>
                  <FaSignOutAlt  className='mr-2' />
                   Logout
                </li>
                
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
