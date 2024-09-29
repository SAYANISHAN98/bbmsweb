import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useProfilesid } from '../api/profiles';

export default function ViewDetail() {
  const { id } = useParams(); // Extract the id from the URL params
  console.log(id);
  const { data: profile, error, isLoading } = useProfilesid(id); // Pass the id to the hook

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='w-1/2 p-10 mx-auto bg-white shadow-xl rounded-2xl'>
      <div className='flex items-center justify-center'>
        <h2 className='text-4xl font-bold text-red-500 uppercase'>User Details</h2>
      </div>
      <div className='mt-4'>
        {/* Display user details */}
        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>name: :</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>email: {profile.f_name + ' ' + profile.l_name}</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Contact Number: {profile.contact_number}</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Address: {profile.address}</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>User Role: {profile.role}</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Age: {profile.age}</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Gender: {profile.gender}</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Blood Type: {profile.blood_type}</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Last Donation Date: {profile.last_donation_date}</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Health History: {profile.health_history}</div>
          </div>
        </div>

        <div className='flex-1 w-full mx-2 mt-3'>
          <div className='h-8 font-bold leading-8 text-gray-700'>
            <div>Diseases: {profile.diseases}</div>
          </div>
        </div>

        <div className='container flex justify-around mt-8 mb-5'>
          <NavLink to="/Update">
            <button className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
              Update
            </button>
          </NavLink>
          <NavLink to="/Delete">
            <button className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
              Delete
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
