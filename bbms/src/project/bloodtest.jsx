import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

export default function BloodTests() {
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query
  const [filteredTests, setFilteredTests] = useState([]); // Store filtered and sorted blood test data

  const [tests, setTests] = useState([]); // Store all fetched tests
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const navigate = useNavigate();
  const [visibleRows, setVisibleRows] = useState(10); 
  const loadMore = () => {
    setVisibleRows((prev) => prev + 10); 
    };


  useEffect(() => {
    const fetchTests = async () => {
      // Fetch data from the blood_test table
      const { data: bloodTests, error: bloodTestError } = await supabase
        .from('blood_test')
        .select('id, date, results, tested_by, bottle_id');
      
      if (bloodTestError) {
        console.error('Error fetching blood tests:', bloodTestError);
        setLoading(false);
        return;
      }

      // Fetch data from donor_donations table
      const { data: donorDonations, error: donorDonationError } = await supabase
        .from('donor_donations')
        .select('bottle_id, donor_id');
      
      if (donorDonationError) {
        console.error('Error fetching donor donations:', donorDonationError);
        setLoading(false);
        return;
      }

      // Fetch data from profiles table
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, nic_no');
      
      if (profileError) {
        console.error('Error fetching profiles:', profileError);
        setLoading(false);
        return;
      }

      // Now, manually join the data
      const formattedTests = bloodTests.map((test) => {
        // Match the blood_test bottle_id with donor_donations bottle_id
        const donorDonation = donorDonations.find(dd => dd.bottle_id === test.bottle_id);
        
        // If there's a matching donor_id, get the NIC number
        const profile = donorDonation ? profiles.find(p => p.id === donorDonation.donor_id) : null;
        
        const nicNo = profile ? profile.nic_no : 'Not Available';
        
        return {
          ...test,
          nic_no: nicNo,
        };
      });

      setTests(formattedTests);
      setFilteredTests(formattedTests); // Initially show all data
      setLoading(false);
    };

    fetchTests();
  }, []);

  const searchAndFilter = (query) => {
    if (query) {
      const filtered = tests.filter(test =>
        (test.nic_no && test.nic_no.toLowerCase().includes(query.toLowerCase())) ||
        (test.results && test.results.toLowerCase().includes(query.toLowerCase())) ||
        (test.tested_by && test.tested_by.toLowerCase().includes(query.toLowerCase())) ||
        (test.date && test.date.toLowerCase().includes(query.toLowerCase()))
      );

      // Optionally, you can also sort the filtered results here if required
      setFilteredTests(filtered); // Update the filtered results
    } else {
      // If no search query, just reset to all tests
      setFilteredTests(tests);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update search query
    searchAndFilter(query); // Filter the tests based on the query
  };

  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-5/6 pt-8">
      <h2 className="mb-4 text-3xl font-bold text-center text-red-700">Blood Test</h2>

        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => navigate('/NewTest')}
            className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-md"
          >
            Add
          </button>
          <div className="relative w-3/5">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by Date, Results, NIC No, Tested By"
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
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Results</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">NIC No</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Tested By</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">Loading...</td>
                </tr>
              ) : filteredTests.length > 0 ? (
                filteredTests.slice(0,visibleRows).map((test, index) => (
                  <tr key={test.id} className="border-b hover:bg-red-50">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{test.date}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{test.results}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{test.nic_no}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{test.tested_by}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => navigate(`/ViewbloodTest/${test.id}`)}
                        className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-md ">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
          {filteredTests.length > visibleRows && (
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
