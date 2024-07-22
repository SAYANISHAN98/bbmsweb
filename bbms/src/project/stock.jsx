import React from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';




export default function Stock() {
  {/*return (

    const bloodGroups = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];
    <div className="flex flex-col items-center min-h-screen py-10 bg-red-50">
      <h1 className="mb-8 text-4xl font-bold text-red-700">Blood Stock</h1>
      <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
        {bloodGroups.map((group) => (
          <NavLink 
            to={`/blood/${group}`} 
            key={group} 
            className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-red-100"
          >
            <div>
              <h2 className="text-2xl font-bold text-red-700">{group}</h2>
              <p className="text-gray-700">Available units: 10</p>
            </div>
            <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
          </NavLink>
        ))}
      </div>
    </div>
  );
*/}
  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-red-50">
      <h1 className="mb-8 text-4xl font-bold text-red-700">Blood Stock</h1>
      <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
        
        <NavLink 
          to="/bloodApositive" 
          className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-red-100"
        >
          <div>
            <h2 className="text-2xl font-bold text-red-700">A+</h2>
            <p className="text-gray-700">Available units: 10</p>
          </div>
          <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
        </NavLink>
        
        <NavLink 
          to="/bloodAnegative" 
          className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-red-100"
        >
          <div>
            <h2 className="text-2xl font-bold text-red-700">A-</h2>
            <p className="text-gray-700">Available units: 10</p>
          </div>
          <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
        </NavLink>

        <NavLink 
          to="/bloodBpositive" 
          className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-red-100"
        >
          <div>
            <h2 className="text-2xl font-bold text-red-700">B+</h2>
            <p className="text-gray-700">Available units: 10</p>
          </div>
          <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
        </NavLink>

        <NavLink 
          to="/bloodBnegative" 
          className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-red-100"
        >
          <div>
            <h2 className="text-2xl font-bold text-red-700">B-</h2>
            <p className="text-gray-700">Available units: 10</p>
          </div>
          <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
        </NavLink>

        <NavLink 
          to="/bloodABpositive" 
          className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-red-100"
        >
          <div>
            <h2 className="text-2xl font-bold text-red-700">AB+</h2>
            <p className="text-gray-700">Available units: 10</p>
          </div>
          <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
        </NavLink>

        <NavLink 
          to="/bloodABnegative" 
          className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-red-100"
        >
          <div>
            <h2 className="text-2xl font-bold text-red-700">AB-</h2>
            <p className="text-gray-700">Available units: 10</p>
          </div>
          <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
        </NavLink>

        <NavLink 
          to="/bloodOpositive" 
          className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-red-100"
        >
          <div>
            <h2 className="text-2xl font-bold text-red-700">O+</h2>
            <p className="text-gray-700">Available units: 10</p>
          </div>
          <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
        </NavLink>

        <NavLink 
          to="/bloodOnegative" 
          className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md hover:bg-red-100"
        >
          <div>
            <h2 className="text-2xl font-bold text-red-700">O-</h2>
            <p className="text-gray-700">Available units: 10</p>
          </div>
          <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
        </NavLink>
        
      </div>
    </div>
  );
};

