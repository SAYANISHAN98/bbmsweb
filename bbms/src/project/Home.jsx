import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Activity, Droplet, Users } from 'lucide-react';

// Mock Data (From First Code)
const bloodStockData = [
  { bloodGroup: 'A+', units: 50, status: 'Normal' },
  { bloodGroup: 'A-', units: 15, status: 'Low' },
  { bloodGroup: 'B+', units: 45, status: 'Normal' },
  { bloodGroup: 'B-', units: 12, status: 'Low' },
  { bloodGroup: 'AB+', units: 25, status: 'Normal' },
  { bloodGroup: 'AB-', units: 8, status: 'Low' },
  { bloodGroup: 'O+', units: 80, status: 'High' },
  { bloodGroup: 'O-', units: 30, status: 'Normal' },
];

const donationStats = [
  { bloodGroup: 'A+', count: 25 },
  { bloodGroup: 'A-', count: 8 },
  { bloodGroup: 'B+', count: 20 },
  { bloodGroup: 'B-', count: 5 },
  { bloodGroup: 'AB+', count: 12 },
  { bloodGroup: 'AB-', count: 3 },
  { bloodGroup: 'O+', count: 35 },
  { bloodGroup: 'O-', count: 15 },
];

const requestStats = [
  { bloodGroup: 'A+', count: 22 },
  { bloodGroup: 'A-', count: 10 },
  { bloodGroup: 'B+', count: 18 },
  { bloodGroup: 'B-', count: 7 },
  { bloodGroup: 'AB+', count: 9 },
  { bloodGroup: 'AB-', count: 4 },
  { bloodGroup: 'O+', count: 30 },
  { bloodGroup: 'O-', count: 20 },
];

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
function BloodStockTable({ stocks }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blood Group
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
          {stocks.map((stock) => (
            <tr key={stock.bloodGroup}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-medium">{stock.bloodGroup}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{stock.units}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    stock.status === 'Low'
                      ? 'bg-red-100 text-red-800'
                      : stock.status === 'Normal'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {stock.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// StatsChart Component
function StatsChart({ donations, requests }) {
  const maxValue = Math.max(
    ...donations.map((d) => d.count),
    ...requests.map((r) => r.count)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Monthly Statistics</h3>
      <div className="space-y-4">
        {donations.map((donation, index) => (
          <div key={donation.bloodGroup} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{donation.bloodGroup}</span>
              <span className="text-gray-500">
                Donations: {donation.count} | Requests: {requests[index].count}
              </span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded">
              <div
                className="absolute left-0 top-0 h-full bg-green-500 rounded"
                style={{ width: `${(donation.count / maxValue) * 100}%` }}
              />
              <div
                className="absolute left-0 top-0 h-full bg-red-500 rounded opacity-75"
                style={{ width: `${(requests[index].count / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-2" />
          <span>Donations</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-2" />
          <span>Requests</span>
        </div>
      </div>
    </div>
  );
}

// Home Component (Integrated)
export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('f_name')
            .eq('id', user.id)
            .single();
          if (error) {
            setError(error.message);
            setLoading(false);
            return;
          }
          setUser(data);
        } else {
          setError('No user logged in');
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data: ' + error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User data not found!</div>;

  const totalDonations = donationStats.reduce((sum, stat) => sum + stat.count, 0);
  const totalRequests = requestStats.reduce((sum, stat) => sum + stat.count, 0);
  const totalStock = bloodStockData.reduce((sum, stock) => sum + stock.units, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold">Welcome, {user.f_name}!</h1>
        <p className="text-gray-600">Role: ADMIN</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Donations" value={totalDonations} icon={<Droplet size={24} />} />
          <StatsCard title="Total Requests" value={totalRequests} icon={<Users size={24} />} />
          <StatsCard title="Available Stock" value={totalStock} icon={<Activity size={24} />} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BloodStockTable stocks={bloodStockData} />
          <StatsChart donations={donationStats} requests={requestStats} />
        </div>
      </div>
    </div>
  );
}
