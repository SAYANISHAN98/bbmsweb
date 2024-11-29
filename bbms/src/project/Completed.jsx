import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase'; // Ensure Supabase is correctly configured.

export default function Completed() {
  const navigate = useNavigate();
  const [completes, setCompletes] = useState([]);
  const [filteredCompletes, setFilteredCompletes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleRows, setVisibleRows] = useState(10);

  // Fetch data where status = 'dispatched'
  useEffect(() => {
    const fetchCompletedRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('requests') // Replace with your actual table name.
          .select('*')
          .eq('status', 'dispatched');

        if (error) {
          console.error('Error fetching completed requests:', error);
        } else {
          setCompletes(data || []);
          setFilteredCompletes(data || []); // Initialize the filtered data
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchCompletedRequests();
  }, []);

  // Handle search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = completes.filter(
      (complete) =>
        complete.hospital_name.toLowerCase().includes(lowerCaseQuery) ||
        complete.ward_no.toLowerCase().includes(lowerCaseQuery) ||
        complete.blood_type.toLowerCase().includes(lowerCaseQuery) ||
        complete.request_date.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCompletes(filteredData);
  }, [searchQuery, completes]);

  const loadMore = () => {
    setVisibleRows((prev) => prev + 10);
  };

  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-4/5">
        <h2 className="mb-4 text-3xl font-bold text-center text-red-700">Completed Requests</h2>
        <div className="flex items-center justify-center w-full py-2 space-x-0 px-30">
          <button
            onClick={() => navigate('/Request')}
            className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-l-md"
          >
            New Request
          </button>
          <button
            onClick={() => navigate('/Ongoing')}
            className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10"
          >
            On Going
          </button>
          <button
            onClick={() => navigate('/Completed')}
            className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-r-md"
          >
            Completed
          </button>
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <div className="relative w-3/5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hospital name, ward no, blood type, or request date..."
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>
        <div className="py-8">
          <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
            <thead className="">
              <tr className="">
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
              </tr>
            </thead>
            <tbody>
              {filteredCompletes.slice(0, visibleRows).map((complete, index) => (
                <tr key={complete.id} className="border-b hover:bg-red-50">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{complete.hospital_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complete.ward_no}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{complete.blood_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complete.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complete.request_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCompletes.length > visibleRows && (
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
