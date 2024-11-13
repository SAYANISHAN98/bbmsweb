import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

export default function BloodTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      const { data, error } = await supabase.from('blood_test').select('*');
      if (error) {
        console.error('Error fetching blood tests:', error);
      } else {
        setTests(data);
      }
      setLoading(false);
    };

    fetchTests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-4/5">
        <div className="flex items-center justify-center w-full py-4">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>

        <div className="flex items-center justify-end w-full">
          <button
            onClick={() => navigate('/NewTest')}
            className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-xl text-lg"
          >
            Add
          </button>
        </div>

        <div className="py-8">
          <table className="w-full p-3 border-2 border-red-500 shadow-2xl">
            <thead className="bg-red-100 border-b-2 border-gray-500">
              <tr className="py-3 font-semibold tracking-wide text-center text-medium">
                <th className="px-2 py-2">No</th>
                <th className="px-2 py-2">Date</th>
                <th className="px-2 py-2">Results</th>
                <th className="px-2 py-2">Donation ID</th>
                <th className="px-2 py-2">Donor ID</th>
                <th className="px-2 py-2">Tested By</th>
                <th className="px-2 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {tests.map((test, index) => (
                <tr key={test.id} className="font-semibold tracking-wide text-center text-medium">
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">{test.date}</td>
                  <td className="px-2 py-2">{test.results}</td>
                  <td className="px-2 py-2">{test.donation_id}</td>
                  <td className="px-2 py-2">{test.donor_id}</td>
                  <td className="px-2 py-2">{test.tested_by}</td>
                  <td className="px-2 py-2 space-x-2">
                    <button
                      onClick={() => navigate(`/ViewbloodTest/${test.id}`)}
                      className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
