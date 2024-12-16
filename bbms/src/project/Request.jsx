import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase'; // Adjust the import path to match your project structure.

export default function Request() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search state
  const [visibleRows, setVisibleRows] = useState(10);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('requests')
          .select('*')
          .is('status', null);

        if (error) {
          console.error('Error fetching requests:', error);
        } else {
          setRequests(data);
        }
      } catch (err) {
        console.error('Error:', err.message);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: 'accepted' })
        .eq('id', id);

      if (error) {
        console.error('Error updating request status:', error);
        alert('Failed to accept the request. Try again.');
      } else {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
        alert('Request accepted successfully.');
      }
    } catch (err) {
      console.error('Error:', err.message);
      alert('An error occurred. Try again.');
    }
  };

  const loadMore = () => {
    setVisibleRows((prev) => prev + 10);
  };

  // Filtered Requests Based on Search Query
  const filteredRequests = requests.filter((request) =>
    ['hospital_name', 'ward_no', 'blood_type'].some((key) =>
      request[key]?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-5/6">
        <h2 className="mt-4 mb-4 text-3xl font-bold text-center text-red-700">
          Blood Requests
        </h2>
        <div className="flex items-center justify-center w-full py-2 space-x-0 px-30">
          <button
            onClick={() => navigate('/Request')}
            className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10  rounded-l-md"
          >
            New Request
          </button>
          <button
            onClick={() => navigate('/Request/Ongoing')}
            className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 "
          >
            On Going
          </button>
          <button
            onClick={() => navigate('/Request/Completed')}
            className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10  rounded-r-md"
          >
            Completed
          </button>
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search for a request..."
              value={searchQuery} // Bind input to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>
        <div className="py-8">
          <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">
                  No
                </th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">
                  Hospital Name
                </th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">
                  Ward No
                </th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">
                  Blood Type
                </th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">
                  Request Date
                </th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.slice(0, visibleRows).map((request, index) => (
                <tr key={request.id} className="border-b hover:bg-red-50">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {request.hospital_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.ward_no}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {request.blood_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.request_date}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-md"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRequests.length > visibleRows && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMore}
                className="px-6 py-2 text-white bg-red-500 rounded-xl hover:bg-slate-700"
              >
                More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
