import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

export default function Donordonations() {
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query
  const [filtereddonations, setFiltereddonations] = useState([]); // Store filtered and sorted blood donation data
  const [donations, setdonations] = useState([]); // Store all fetched donations
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [nic, setNic] = useState(''); // NIC state for modal
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility state
  const [error, setError] = useState(''); // Error message for NIC validation
  const navigate = useNavigate();
  const [visibleRows, setVisibleRows] = useState(10); 
  
  const loadMore = () => {
    setVisibleRows((prev) => prev + 10); 
    };

  useEffect(() => {
    const fetchdonations = async () => {
      setLoading(true);
  
      try {
        // Fetch data from donor_donations table
        const { data: donorDonations, error: donorDonationsError } = await supabase
          .from('donor_donations')
          .select('id, donor_id, camp_id, date');
  
        if (donorDonationsError) throw donorDonationsError;
  
        // Fetch data from profiles table
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, f_name, nic_no, blood_type');
  
        if (profilesError) throw profilesError;
  
        // Fetch data from blood_camp table
        const { data: bloodCamps, error: bloodCampsError } = await supabase
          .from('blood_camp')
          .select('id, name');
  
        if (bloodCampsError) throw bloodCampsError;
  
        // Join data manually
        const formatteddonations = donorDonations.map((donation) => {
          const profile = profiles.find((p) => p.id === donation.donor_id);
          const camp = bloodCamps.find((c) => c.id === donation.camp_id);
  
          return {
            id: donation.id, // Use `id` as the unique key for the donation
            f_name: profile?.f_name || 'Unknown',
            nic_no: profile?.nic_no || 'Unknown',
            blood_type: profile?.blood_type || 'Unknown',
            location: camp?.name || 'Unknown',
            date: donation.date,
          };
        });
  
        setdonations(formatteddonations);
        setFiltereddonations(formatteddonations);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchdonations();
  }, []);

  // Search function to handle Name, NIC No, Location, Date, and Blood Group
  const searchDonations = (query) => {
    if (query) {
      const filtered = donations.filter((donation) => {
        const nameMatch = donation.f_name?.toLowerCase().includes(query.toLowerCase());
        const nicMatch = donation.nic_no?.toLowerCase().includes(query.toLowerCase());
        const locationMatch = donation.location?.toLowerCase().includes(query.toLowerCase());
        const dateMatch = donation.date?.toLowerCase().includes(query.toLowerCase());
        const bloodTypeMatch = donation.blood_type?.toLowerCase().includes(query.toLowerCase());
        return nameMatch || nicMatch || locationMatch || dateMatch || bloodTypeMatch; // Match any of the conditions
      });

      setFiltereddonations(filtered); // Update the filtered results
    } else {
      setFiltereddonations(donations); // Reset to all donations if no query
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the search query
    searchDonations(query); // Filter donations by query
  };

  // Function to handle NIC validation and navigate
  const handleDonate = async () => {
    if (!nic) {
      setError('NIC number is required');
      return;
    }
  
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('nic_no', nic)
      .single();
  
    if (profileError) {
      setError('Error checking NIC or NIC not found');
      return;
    }
  
    if (profileData) {
      // Fetch the latest donation for this donor from the donor_donations table
      const { data: donationsData, error: donationsError } = await supabase
        .from('donor_donations')
        .select('date')
        .eq('donor_id', profileData.id)
        .order('date', { ascending: false }) // Order by latest date
        .limit(1); // Fetch only the latest donation
  
      if (donationsError) {
        setError('Error fetching donation data');
        return;
      }
  
      if (donationsData.length > 0) {
        const latestDonationDate = new Date(donationsData[0].date);
        const currentDate = new Date();
        const diffInTime = currentDate - latestDonationDate;
        const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert time difference to days
  
        if (diffInDays <= 120) {
          setError('You can only donate after 120 days from your last donation.');
          return;
        } else {
          // If donation is allowed, navigate to the donation page
          navigate(`/Donate/${profileData.id}`);
          setModalOpen(false); // Close the modal after navigation
        }
      } else {
        setError('No donation record found for this NIC.');
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-5/6">
      <h2 className="mb-4 text-3xl font-bold text-center text-red-700">Donor Donations</h2>

        <div className="flex items-center justify-between w-full py-6">
       
          <button
            onClick={() => setModalOpen(true)} // Open the modal when Donate button is clicked
            className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-md"
          >
            Donate
          </button>
          <div className="relative w-3/5 ">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by Name, NIC No, Location, Date, or Blood Group"
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>

        {/* Modal for NIC input */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 p-6 bg-white rounded-lg">
              <h2 className="mb-4 text-xl font-bold">Enter NIC Number</h2>
              <input
                type="text"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded-lg"
                placeholder="NIC Number"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setModalOpen(false)} // Close the modal
                  className="px-6 py-2 text-white bg-gray-500 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDonate} // Validate and navigate
                  className="px-6 py-2 text-white bg-red-500 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="py-8">
        <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
            <thead className="">
              <tr className="">
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Donation Date</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Blood Group</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">NIC No</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">Loading...</td>
                </tr>
              ) : filtereddonations.length > 0 ? (
                filtereddonations.slice(0,visibleRows).map((donation) => (
                  <tr key={donation.id} className="border-b hover:bg-red-50">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{donation.f_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{donation.date}</td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">{donation.blood_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{donation.nic_no}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{donation.location}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => navigate(`/viewdonations/${donation.id}`)}
                        className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-md ">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No donations found</td>
                </tr>
              )}
            </tbody>
          </table>
          {filtereddonations.length > visibleRows && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMore}
                className="px-6 py-2 text-white bg-red-500 rounded-xl hover:bg-slate-700">
                More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
