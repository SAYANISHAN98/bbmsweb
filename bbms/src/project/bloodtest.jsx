import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

export default function Bloodtest() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch blood test records on component mount
  useEffect(() => {
    const fetchBloodTests = async () => {
      const { data, error } = await supabase
        .from('blood_test') // replace with your actual table name
        .select('*');

      if (error) {
        console.error('Error fetching blood tests:', error);
      } else {
        setTests(data);
      }
    };

    fetchBloodTests();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());

  // Filter tests based on search input
  const filteredTests = tests.filter(
    test =>
      test.donor_name?.toLowerCase().includes(search) ||
      test.location?.toLowerCase().includes(search) ||
      test.status?.toLowerCase().includes(search)
  );

  return (
    <div className='flex items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
      <div className='w-4/5'>
        <div className="flex items-center justify-center w-full py-4">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search ..."
              value={search}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>
        
        <div className="flex items-center justify-end w-full">
          <button
            onClick={() => navigate('/Newtest')}
            className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-xl text-lg"
          >
            Add
          </button>
        </div>

        <div className='py-8'>
          <table className='w-full p-3 border-2 border-red-500 shadow-2xl'>
            <thead className='bg-red-100 border-b-2 border-gray-500'>
              <tr className='py-3 font-semibold tracking-wide text-center text-medium'>
                <th className='px-2 py-2'>No</th>
                <th className='px-2 py-2'>Test Date</th>
                <th className='px-2 py-2'>Donor Name</th>
                <th className='px-2 py-2'>Location</th>
                <th className='px-2 py-2'>Status</th>
                <th className='px-2 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.length > 0 ? (
                filteredTests.map((test, index) => (
                  <tr key={test.id} className='font-semibold tracking-wide text-center text-medium'>
                    <td className='px-2 py-2'>{index + 1}</td>
                    <td className='px-2 py-2'>{test.test_date}</td>
                    <td className='px-2 py-2'>{test.donor_name}</td>
                    <td className='px-2 py-2'>{test.location}</td>
                    <td className='px-2 py-2'>{test.status}</td>
                    <td className='px-2 py-2 space-x-2'>
                      <button
                        onClick={() => navigate(`/Viewbloodtest/${test.id}`)}
                        className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-2 py-4 text-center">No tests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
