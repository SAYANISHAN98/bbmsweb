import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars, FaSearch, FaUserCircle, FaHome, FaUsers, FaList, FaDatabase, FaChartBar, FaCog, FaUser, FaSignOutAlt, FaTint} from 'react-icons/fa';

export default function Layout() {
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);

  const handleRequestsClick = () => {
    setIsRequestsOpen(!isRequestsOpen);
  };

  return (
    <div className='fixed flex flex-col w-screen h-screen overflow-hidden'>
      {/* Top navigation bar */}
      <div className='flex justify-between w-full px-4 py-3 bg-red-600'>
        <div className='flex items-center text-2xl font-bold text-white'>
        <FaTint className='mr-2' />
          Blood Stock Management
        </div>

        <div className='flex items-center gap-x-5'>
          <div className='relative md:w-65'>
            <span className='relative inset-y-0 left-0 flex items-center pl-2 md:absolute'>
              <button className='p-1 text-white focus:outline-none md:text-black'><FaSearch /></button>
            </span>
            <input type="text" className='hidden w-full px-4 py-1 pl-12 rounded shadow outline-none md:block' />
          </div>

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
                  <li className='flex items-center mt-1 mb-3'>
                    <FaSignOutAlt className='mr-2' />
                    <a href=''>Logout</a>
                  </li>
                </ul>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar and content area */}
      <div className='flex flex-row w-full h-full'>
        <div className='flex flex-col justify-between h-full bg-white w-60'>
          <div>
            <hr />
            <ul className='font-bold text-gray-600'>
              <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                <FaHome className='mr-2' />
                <a href='' className='px-3'>Home</a>
              </li>
              <hr />
              <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                <FaUsers className='mr-2' />
                <a href='' className='px-3'>Users</a>
              </li>
              <hr />
              <li
                className='flex items-center px-2 py-2 mb-1 rounded cursor-pointer hover:shadow hover:bg-red-700 hover:text-white'
                onClick={handleRequestsClick}
              >
                <FaList className='mr-2' />
                <span className='px-3'>Requests</span>
              </li>
              {isRequestsOpen && (
                <ul className='pl-6'>
                  <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                    <FaBars className='mr-2' />
                    <a href='' className='px-3'>New Request</a>
                  </li>
                  <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                    <FaBars className='mr-2' />
                    <a href='' className='px-3'>On going</a>
                  </li>
                  <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                    <FaBars className='mr-2' />
                    <a href='' className='px-3'>Complete</a>
                  </li>
                </ul>
              )}
              <hr />
              <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                <FaDatabase className='mr-2' />
                <a href='' className='px-3'>Blood Stock</a>
              </li>
              <hr />
              <li className='flex items-center px-2 py-2 mb-2 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                <FaChartBar className='mr-2' />
                <a href='' className='px-3'>Stock Analysis</a>
              </li>
            </ul>
          </div>

          <div className='flex items-center px-2 py-2 mb-1 font-bold text-gray-600 rounded hover:shadow hover:bg-red-700 hover:text-white'>
            <FaCog className='mr-2' />
            <a href='' className='px-3'>Settings</a>
          </div>
        </div>

        <div className='flex-1 w-full p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
