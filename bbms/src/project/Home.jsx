import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Activity, Droplet, Users } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the scales and other necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// StatsCard Component
function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-red-500">{icon}</div>
      </div>
    </div>
  );
}

// BloodStockTable Component
function BloodStockTable({ bloodGroups, stockData }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blood Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Units Available
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bloodGroups.map((group) => {
            const bloodStock = stockData[group] || { totalUnits: 0, status: 'Low' };
            return (
              <tr key={group}>
                <td className="px-6 py-4 whitespace-nowrap">{group}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bloodStock.totalUnits}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      bloodStock.status === 'Low'
                        ? 'bg-red-100 text-red-800'
                        : bloodStock.status === 'Normal'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {bloodStock.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function DonationsRequestsChart({ donationsData, requestsData, bloodGroups }) {
  const data = {
    labels: bloodGroups,
    datasets: [
      {
        label: 'Donations',
        data: bloodGroups.map((group) => donationsData[group] || 0),
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // Green
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Requests',
        data: bloodGroups.map((group) => requestsData[group] || 0),
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // Red
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y', // Converts the chart to horizontal
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        ticks: {
          padding: 20,
          stepSize : 40, // Adds padding to the labels for better readability
        },
      },
      x: {
        grid: {
          drawBorder: false,
          drawOnChartArea: true,
        },
        ticks: {
          stepSize: 10, // Controls the interval between grid lines
        },
      },
    },
    barThickness: 10, // Controls the thickness of the bars
    categoryPercentage: 0.8, // Adjusts the spacing between the categories (0.8 = 80%)
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Monthly Statistics</h2>
      <Bar data={data} options={options} />
    </div>
  );
}


// Home Component (Updated)
export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [bloodStockData, setBloodStockData] = useState({}); // To hold dynamic stock data
  const [donationsData, setDonationsData] = useState({});
  const [requestsData, setRequestsData] = useState({});

  // Static blood groups
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    const fetchBloodStockData = async () => {
      try {
        const currentDate = new Date().toISOString();

        const { data, error } = await supabase
          .from('blood_stock')
          .select('blood_type, no_of_bottles, exp_date')
          .gt('exp_date', currentDate); // Filter by future expiration dates

        if (error) {
          setError('Error fetching blood stock data: ' + error.message);
        } else {
          // Group by blood type and calculate total units
          const groupedData = data.reduce((acc, curr) => {
            if (!acc[curr.blood_type]) {
              acc[curr.blood_type] = { totalUnits: 0, bloodType: curr.blood_type };
            }
            acc[curr.blood_type].totalUnits += parseInt(curr.no_of_bottles, 10);
            return acc;
          }, {});

          // Assign status for each group based on total units
          const updatedStockData = bloodGroups.reduce((acc, group) => {
            const totalUnits = groupedData[group] ? groupedData[group].totalUnits : 0;
            let status = 'Low';
            if (totalUnits > 50) status = 'High';
            else if (totalUnits >= 40) status = 'Normal';
            acc[group] = { totalUnits, status };
            return acc;
          }, {});

          setBloodStockData(updatedStockData);
        }
      } catch (error) {
        setError('Error fetching blood stock data: ' + error.message);
      }
    };

    const fetchGroupedDonationsRequests = async () => {
      try {
        // Fetch all donations (donor_id) from donor_donations
        const { data: donations, error: donationsError } = await supabase
          .from('donor_donations')
          .select('donor_id');
    
        if (donationsError) throw new Error('Error fetching donations: ' + donationsError.message);
    
        // Fetch all profiles (id, blood_type) from profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, blood_type');
    
        if (profilesError) throw new Error('Error fetching profiles: ' + profilesError.message);
    
        // Map donor_id to blood_type from profiles
        const donorBloodTypes = profiles.reduce((acc, profile) => {
          acc[profile.id] = profile.blood_type;
          return acc;
        }, {});
    
        // Group and count donations by blood type
        const donationsByBloodType = donations.reduce((acc, curr) => {
          const bloodType = donorBloodTypes[curr.donor_id]; // Get blood_type using donor_id
          if (bloodType) {
            if (!acc[bloodType]) {
              acc[bloodType] = 0;
            }
            acc[bloodType] += 1; // Increment the count for this blood type
          }
          return acc;
        }, {});
    
        // Fetch all requests
        const { data: requests, error: requestsError } = await supabase
          .from('requests')
          .select('blood_type');
    
        if (requestsError) throw new Error('Error fetching requests: ' + requestsError.message);
    
        // Group and count requests by blood type
        const requestsByBloodType = requests.reduce((acc, curr) => {
          if (!acc[curr.blood_type]) {
            acc[curr.blood_type] = 0;
          }
          acc[curr.blood_type] += 1; // Increment the count for this blood type
          return acc;
        }, {});
    
        // Update state with grouped data
        setDonationsData(donationsByBloodType);
        setRequestsData(requestsByBloodType);
      } catch (error) {
        setError('Error fetching chart data: ' + error.message);
      }
    };
    
    
    

    const fetchTotalDonations = async () => {
      try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const { data, error } = await supabase
          .from('donor_donations')
          .select('id')
          .gte('date', firstDayOfMonth.toISOString().split('T')[0])
          .lte('date', lastDayOfMonth.toISOString().split('T')[0]);

        if (error) {
          setError('Error fetching donations data: ' + error.message);
        } else {
          setTotalDonations(data.length);
        }
      } catch (error) {
        setError('Error fetching donations data: ' + error.message);
      }
    };

    const fetchTotalRequests = async () => {
      try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const { data, error } = await supabase
          .from('requests')
          .select('id')
          .gte('request_date', firstDayOfMonth.toISOString().split('T')[0])
          .lte('request_date', lastDayOfMonth.toISOString().split('T')[0]);
          
        if (error) {
          setError('Error fetching requests data: ' + error.message);
        } else {
          
         
          setTotalRequests(data.length);
        }
      } catch (error) {
        setError('Error fetching requests data: ' + error.message);
      }
    };

    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('f_name')
            .eq('id', user.id)
            .single();
          if (error) throw error;
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setError('Error fetching user data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodStockData();
    fetchGroupedDonationsRequests();
    fetchTotalDonations();
    fetchTotalRequests();
    fetchUserData();
  }, []);

  // Calculate total units available
  const totalUnitsAvailable = Object.values(bloodStockData).reduce((sum, stock) => sum + stock.totalUnits, 0);

  return (
    <div className="space-y-6">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold">Hello, {user.f_name}</p>
          <p className="mt-2 text-gray-600">
            Welcome to your Blood Bank Management Dashboard
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard title="Total Donations" value={totalDonations} icon={<Droplet size={24} />} />
        <StatsCard title="Total Requests" value={totalRequests} icon={<Users size={24} />} />
        <StatsCard title="Total Units Available" value={totalUnitsAvailable} icon={<Activity size={24} />} />
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
  <div className="flex flex-col h-full">
    <BloodStockTable bloodGroups={bloodGroups} stockData={bloodStockData} />
  </div>
  
  <div className="flex flex-col h-618px w-413px">
    <DonationsRequestsChart
      donationsData={donationsData}
      requestsData={requestsData}
      bloodGroups={bloodGroups}
    />
  </div>
</div>

    </div>
  );
}
