import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

export default function Ongoing() {
  const navigate = useNavigate();
  const [ongoings, setOngoings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOngoings, setFilteredOngoings] = useState([]);
  const [visibleRows, setVisibleRows] = useState(10);

  // Fetch accepted requests from Supabase
  useEffect(() => {
    const fetchOngoings = async () => {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('status', 'accepted');

      if (error) console.error('Error fetching ongoing requests:', error);
      else {
        setOngoings(data);
        setFilteredOngoings(data); // Initialize filtered list
      }
    };

    fetchOngoings();
  }, []);

  // Handle search term changes and filter the list
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = ongoings.filter(
      (ongoing) =>
        ongoing.hospital_name?.toLowerCase().includes(term) ||
        ongoing.ward_no?.toString().toLowerCase().includes(term) ||
        ongoing.blood_type?.toLowerCase().includes(term) ||
        ongoing.request_date?.toLowerCase().includes(term)
    );
    setFilteredOngoings(filtered);
  };

  // Handle confirming the request (updating status to dispatched)
  const handleConfirm = async (id) => {
    const { error } = await supabase
      .from('requests')
      .update({ status: 'dispatched' })
      .eq('id', id);

    if (error) {
      console.error('Error updating request status:', error);
    } else {
      // Refresh the list by removing the confirmed request
      setOngoings((prev) => prev.filter((request) => request.id !== id));
      setFilteredOngoings((prev) => prev.filter((request) => request.id !== id));
    }
  };

  const loadMore = () => {
    setVisibleRows((prev) => prev + 10);
  };

  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-4/5">
        <h2 className="mt-4 mb-4 text-3xl font-bold text-center text-red-700">Ongoing Blood Requests</h2>
        <div className="flex items-center justify-center w-full py-2 space-x-0 px-30">
          <button
            onClick={() => navigate('/Request')}
            className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-l-md"
          >
            New Request
          </button>
          <button
            onClick={() => navigate('/Request/Ongoing')}
            
            className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10"
          >
            Ongoing
          </button>
          <button
            onClick={() => navigate('/Request/Completed')}
            
            className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-r-md"
          >
            Completed
          </button>
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <div className="relative w-3/5">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by hospital name, ward no, blood type, or request date..."
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>
        <div className="py-8">
          <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">No</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Hospital Name</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Ward No</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Blood Type</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Request Date</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOngoings.slice(0, visibleRows).map((ongoing, index) => (
                <tr key={ongoing.id} className="border-b hover:bg-red-50">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{ongoing.hospital_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ongoing.ward_no}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{ongoing.blood_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ongoing.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ongoing.request_date}</td>
                  <td className="px-2 py-2 space-x-2">
                    <button
                      onClick={() => handleConfirm(ongoing.id)}
                      className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-md"
                    >
                      Dispatch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOngoings.length > visibleRows && (
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
