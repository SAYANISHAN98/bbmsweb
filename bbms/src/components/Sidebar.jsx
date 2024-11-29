import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaDatabase,
  FaChartBar,
  FaCog,
  FaVial,
  FaClinicMedical
} from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className='flex flex-col justify-between h-full bg-white w-58'>
      <div>
        <hr />
        <ul className='font-bold text-gray-600'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded transform transition-transform duration-200 hover:scale-105 ${
                isActive ? 'bg-red-700 text-white' : ''
              }`
            }
          >
            <li className='flex items-center'>
              <FaHome className='mr-2' />
              <div className='px-3'>Home</div>
            </li>
          </NavLink>
          <hr />
          <NavLink
            to='/donor'
            className={({ isActive }) =>
              `flex items-center px-2 py-2 mb-1 rounded transform transition-transform duration-200 hover:scale-105 ${
                isActive ? 'bg-red-700 text-white' : ''
              }`
            }
          >
            <li className='flex items-center'>
              <FaUsers className='mr-2' />
              <div className='px-3'>Donor Details</div>
            </li>
          </NavLink>
          
          <hr />
          <NavLink
            to='/notifications'
            className={({ isActive }) =>
              `flex items-center px-2 py-2 mb-2 rounded transform transition-transform duration-200 hover:scale-105 ${
                isActive ? 'bg-red-700 text-white' : ''
              }`
            }
          >
            <li className='flex items-center'>
              <FaChartBar className='mr-2' />
              <div className='px-3'>Find Donor</div>
            </li>
          </NavLink>
          <hr />
          <NavLink
            to='/request'
            className={({ isActive }) =>
              `flex items-center px-2 py-2 mb-1 rounded transform transition-transform duration-200 hover:scale-105 ${
                isActive ? 'bg-red-700 text-white' : ''
              }`
            }
          >
            <li className='flex items-center'>
              <FaUsers className='mr-2' />
              <div className='px-3'>Blood Requests</div>
            </li>
          </NavLink>
          <hr />
          <NavLink
            to='/donordonations'
            className={({ isActive }) =>
              `flex items-center px-2 py-2 mb-2 rounded transform transition-transform duration-200 hover:scale-105 ${
                isActive ? 'bg-red-700 text-white' : ''
              }`
            }
          >
            <li className='flex items-center'>
              <FaChartBar className='mr-2' />
              <div className='px-3'>Donor Donations</div>
            </li>
          </NavLink>
          <hr />
          <NavLink
            to='/stock'
            className={({ isActive }) =>
              `flex items-center px-2 py-2 mb-1 rounded transform transition-transform duration-200 hover:scale-105 ${
                isActive ? 'bg-red-700 text-white' : ''
              }`
            }
          >
            <li className='flex items-center'>
              <FaDatabase className='mr-2' />
              <div className='px-3'>Blood Stock</div>
            </li>
          </NavLink>
          <hr />
          <NavLink
            to='/bloodtest'
            className={({ isActive }) =>
              `flex items-center px-2 py-2 mb-1 rounded transform transition-transform duration-200 hover:scale-105 ${
                isActive ? 'bg-red-700 text-white' : ''
              }`
            }
          >
             
            <li className='flex items-center'>
              <FaVial className='mr-2' />
              <div className='px-3'>Blood Test</div>
            </li>
          </NavLink>
          <hr />
          <NavLink
            to='/bloodcamp'
            className={({ isActive }) =>
              `flex items-center px-2 py-2 mb-1 rounded transform transition-transform duration-200 hover:scale-105 ${
                isActive ? 'bg-red-700 text-white' : ''
              }`
            }
          >
            <li className='flex items-center'>
              <FaClinicMedical className='mr-2' />
              <div className='px-3'>Blood Camp</div>
            </li>
          </NavLink>
          
        </ul>
      </div>
      {/* <NavLink
        to='/settings'
        className={({ isActive }) =>
          `flex items-center px-2 py-2 mb-1 font-bold text-gray-600 rounded transform transition-transform duration-200 hover:scale-105 ${
            isActive ? 'bg-red-700 text-white' : ''
          }`
        }
      >
        <div>
          <FaCog className='mr-2' />
          Settings
        </div>
      </NavLink> */}
    </div>
  );
}
