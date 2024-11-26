import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase'; // Assuming you're using Supabase for data fetching

export default function Bloodcamp() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch camps data from Supabase
    const fetchCamps = async () => {
      const { data, error } = await supabase.from('blood_camp').select('*');
      if (error) {
        console.error('Error fetching camps:', error);
      } else {
        setCamps(data);
      }
      setLoading(false); // Stop loading once data is fetched
    };

    fetchCamps();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-5/6">
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
            onClick={() => navigate('/NewCamp')}
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
                <th className="px-2 py-2">Camp_Name</th>
                <th className="px-2 py-2">Camp_date</th>
                <th className="px-2 py-2">Location</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {camps.map((camp, index) => (
                <tr key={camp.id} className="font-semibold tracking-wide text-center border-b border-gray-300 text-medium hover:bg-red-50">
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">{camp.name}</td>
                  <td className="px-2 py-2">{camp.date}</td>
                  <td className="px-2 py-2">{camp.location}</td>
                  <td className="px-2 py-2">{camp.status}</td>
                  <td className="px-2 py-2 space-x-2">
                    <button
                      onClick={() => navigate(`/Viewcamp/${camp.id}`)}
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
