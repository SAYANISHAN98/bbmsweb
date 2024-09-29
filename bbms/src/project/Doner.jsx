import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useProfiles } from '../api/profiles';

export default function Doner() {
  const navigate = useNavigate();
  const { data: profiles, error, isLoading } = useProfiles();

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='flex items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
      <div className='w-4/5'>
        <div className="flex items-center justify-between w-full py-8">
          <button
            onClick={() => navigate('/Finddonor')}
            className="font-bold text-white active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-xl text-lg" style={{ backgroundColor: '#dc143c' }}>
            Find Donor
          </button>

          <button
            onClick={() => navigate('/Add')}
            className="font-bold text-white active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-xl text-lg" style={{ backgroundColor: '#dc143c' }}
          >
            Add
          </button>
        </div>

        <div className="flex items-center justify-center w-full py-4">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search for a donor..."
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>

        <div className='py-8'>
          <table className='w-full p-3 border-2 shadow-2xl'>
            <thead className='bg-red-100 border-b-2 border-gray-500'>
              <tr className='py-3 font-semibold tracking-wide text-center text-medium'>
                <th className='px-2 py-2'>No</th>
                <th className='px-2 py-2'>Name</th>
                <th className='px-2 py-2'>Email</th>
                <th className='px-2 py-2'>Contact Number</th>
                <th className='px-2 py-2'>Blood Type</th>
                <th className='px-2 py-2'>Last Donation Date</th>
                <th className='px-2 py-2'>Action</th>
              </tr>
            </thead>

            <tbody>
              {profiles && profiles.length > 0 ? (
                profiles.map((user, index) => (
                  <tr key={user.id} className='font-semibold tracking-wide text-center text-medium'>
                    <td className='px-2 py-2'>{index + 1}</td>
                    <td className='px-2 py-2'>{user.f_name}</td>
                    <td className='px-2 py-2'>{user.email}</td>
                    <td className='px-2 py-2'>{user.contact_number}</td>
                    <td className='px-2 py-2'>{user.blood_type}</td>
                    <td className='px-2 py-2'>{user.last_donation_date}</td>
                    <td className='px-2 py-2 space-x-2'>
                      <button 
                        onClick={() => navigate(`/ViewDetail/${user.id}`)} 
                        className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg">
                        View
                      </button>
                      <button 
                        onClick={() => navigate('/Donate')} 
                        className="font-bold text-white bg-green-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg">
                        Donate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className='text-center py-4'>No donors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
