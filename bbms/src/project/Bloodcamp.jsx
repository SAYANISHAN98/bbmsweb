import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

export default function Bloodcamp() {
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [visibleRows, setVisibleRows] = useState(10); 
  const loadMore = () => {
    setVisibleRows((prev) => prev + 10); 
    };

  useEffect(() => {
    // Fetch camps data from Supabase
    const fetchCamps = async () => {
      const { data, error } = await supabase.from('blood_camp').select('*');
      if (error) {
        console.error('Error fetching camps:', error);
      } else {
        // Filter out camps with type equal to "permanent"
        const filteredData = data.filter((camp) => camp.type !== 'permenant');
        setCamps(filteredData);
        setFilteredCamps(filteredData);
      }
      setLoading(false); // Stop loading once data is fetched
    };

    fetchCamps();
  }, []);

  // Filter camps based on the search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const results = camps.filter((camp) =>
      camp.name.toLowerCase().includes(query)
    );
    setFilteredCamps(results);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-5/6">

        <div className="flex items-center justify-between w-full pt-8">
          <button
            onClick={() => navigate('/NewCamp')}
            className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-md"
          >
            Add
          </button>
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>

        <div className="py-8">
        <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
            <thead className="">
              <tr className="">
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">No</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Camp Name</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Camp date</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Address</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCamps.slice(0,visibleRows).map((camp, index) => (
                <tr
                  key={camp.id}
                  className="border-b hover:bg-red-50"
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{camp.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{camp.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{camp.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span
                  className={`px-2 inline-flex text-base leading-5 font-semibold rounded-full ${
                    camp.status === 'inactive'
                      ? 'bg-red-100 text-red-800'
                      : camp.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {camp.status}
                </span></td>
                  <td className="px-2 py-2 space-x-2">
                    <button
                      onClick={() => navigate(`/Viewcamp/${camp.id}`)}
                      className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-md ">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCamps.length > visibleRows && (
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
