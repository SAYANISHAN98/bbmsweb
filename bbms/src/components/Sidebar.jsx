import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBars,
  FaHome,
  FaUsers,
  FaList,
  FaDatabase,
  FaChartBar,
  FaCog,
  FaVial,
  FaClinicMedical
} from 'react-icons/fa';

export default function Sidebar() {
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);

  const handleRequestsClick = () => {
    setIsRequestsOpen(!isRequestsOpen);
  };

  return (
    <div className='flex flex-col justify-between h-full bg-white w-58'>
      <div>
        <hr />
        <ul className='font-bold text-gray-600'>
          <NavLink to='/'>
            <li className='flex items-center px-2 py-2 rounded hover:shadow hover:bg-red-700 hover:text-white'>
              <FaHome className='mr-2' />
              <div className='px-3'>Home</div>
            </li>
          </NavLink>
          <hr />
          <NavLink to='/Doner'>
            <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
              <FaUsers className='mr-2' />
              <div className='px-3'>Doner</div>
            </li>
          </NavLink>
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
              <NavLink to=''>
                <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                  <FaBars className='mr-2' />
                  <div>New Request</div>
                </li>
              </NavLink>

              <NavLink to=''>
                <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                  <FaBars className='mr-2' />
                  On going
                </li>
              </NavLink>

              <NavLink to=''>
                <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
                  <FaBars className='mr-2' />
                  Complete
                </li>
              </NavLink>
            </ul>
          )}
          <hr />

          <NavLink to='/Stock'>
            <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
              <FaDatabase className='mr-2' />
              <div className='px-3'>Blood Stock</div>
            </li>
          </NavLink>

          <hr />

          <NavLink to='/Bloodtest'>
            <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
              <FaVial className='mr-2' />
              <div className='px-3'>Blood Test</div>
            </li>
          </NavLink>

          <hr />

          <NavLink to='/bloodcamp'>
            <li className='flex items-center px-2 py-2 mb-1 rounded hover:shadow hover:bg-red-700 hover:text-white'>
              <FaClinicMedical className='mr-2' />
              <div className='px-3'>Blood Camp</div>
            </li>
          </NavLink>

          <hr />

          <NavLink to='/dataanalys'>
            <li className='flex items-center px-2 py-2 mb-2 rounded hover:shadow hover:bg-red-700 hover:text-white'>
              <FaChartBar className='mr-2' />
              <div className='px-3'>Data Analysis</div>
            </li>
          </NavLink>
        </ul>
      </div>
      <NavLink to='' className='px-3'>
        <div className='flex items-center px-2 py-2 mb-1 font-bold text-gray-600 rounded hover:shadow hover:bg-red-700 hover:text-white'>
          <FaCog className='mr-2' />
          Settings
        </div>
      </NavLink>
    </div>
  );
}
