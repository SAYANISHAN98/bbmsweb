import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useProfiles } from '../api/profiles';

export default function Doner() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: profiles, error, isLoading } = useProfiles(searchTerm);

  const [visibleRows, setVisibleRows] = useState(10);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Load more rows function
  const loadMore = () => {
    setVisibleRows(prev => prev + 10);
  };

  // Filter profiles based on search term
  // Filter profiles based on search term
const filteredProfiles = profiles?.filter((user) => {
  const term = searchTerm.toLowerCase();
  const name = `${user.f_name} ${user.l_name}`.toLowerCase();
  const bloodType = user.blood_type?.toLowerCase() || ''; // Use empty string if blood_type is null or undefined
  const lastDonation = user.last_donation_date?.toLowerCase() || ''; // Use empty string if last_donation_date is null or undefined

  return (
    name.includes(term) ||
    bloodType.includes(term) ||
    lastDonation.includes(term)
  );
});


  return (
    <div className='flex items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
      <div className='w-5/6'>
        <div className="flex items-center justify-between w-full py-8">
          <button
            onClick={() => navigate('/Add')}
            className="font-bold text-white active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-xl text-lg" style={{ backgroundColor: '#dc143c' }}>
            Add
          </button>
        </div>

        <div className="flex items-center justify-center w-full py-4">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search with Name, Blood type, Last donated date...."
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>

        <div className='py-8'>
          <table className="w-full p-3 border-2 border-red-500 shadow-2xl">
            <thead className="bg-red-100 border-b-2 border-gray-500">
              <tr className="py-3 tracking-wide text-center font-base semibold text-">
                <th scope="col" className="w-12 p-2">No</th>
                <th scope="col" className="p-2 w-22">Name</th>
                <th scope="col" className="w-20 p-2">Email</th>
                <th scope="col" className="p-2 w-22">NIC no</th>
                <th scope="col" className="p-2 w-15">Blood Type</th>
                <th scope="col" className="p-2 w-25">Last Donated</th>
                <th scope="col" className="p-2 w-75">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProfiles && filteredProfiles.length > 0 ? (
                filteredProfiles.slice(0, visibleRows).map((user, index) => (
                  <tr key={user.id} className="text-base font-semibold tracking-wide text-left border-b border-gray-300 hover:bg-red-50">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{user.f_name} {user.l_name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.nic_no}</td> {/* Changed from contact_number to nic_no */}
                    <td className="p-2">{user.blood_type}</td>
                    <td className="p-2">{user.last_donation_date}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => navigate(`/ViewDetail/${user.id}`)}
                        className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center">No donors found</td>
                </tr>
              )}
            </tbody>

          </table>

          {/* Button to load more data */}
          {filteredProfiles.length > visibleRows && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMore}
                className="px-6 py-2 text-white bg-red-500 rounded-xl hover:bg-blue-600">
                More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
