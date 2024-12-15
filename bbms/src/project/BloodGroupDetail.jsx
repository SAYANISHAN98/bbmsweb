import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Ensure Supabase client is properly initialized

export default function BloodGroupDetail() {
  const { group } = useParams();
  const [bloodDetails, setBloodDetails] = useState([]);
  const [visibleRows, setVisibleRows] = useState(10);

  // Fetch blood details based on blood type and group them by expiry date
  useEffect(() => {
    const fetchBloodDetails = async () => {
      try {
        // Fetch data from Supabase 'blood_stock' table for the specific blood type (group)
        const { data, error } = await supabase
          .from('blood_stock')
          .select('*')
          .eq('blood_type', group); // Filter by blood_type

        if (error) {
          console.error('Error fetching blood details:', error);
          return;
        }

        // Group the blood stock by exp_date and sum up the bottles
        const groupedData = data.reduce((acc, blood) => {
          const expiryDate = blood.exp_date; // Use exp_date for expiry date
          const bottles = parseInt(blood.no_of_bottles, 10); // Convert text to integer

          // Handle case where no_of_bottles might be non-numeric or null
          if (isNaN(bottles)) {
            return acc; // Skip if no_of_bottles is invalid
          }

          if (!acc[expiryDate]) {
            acc[expiryDate] = { totalBottles: 0, details: [] };
          }

          acc[expiryDate].totalBottles += bottles; // Sum bottles for same expiry date
          acc[expiryDate].details.push(blood);
          return acc;
        }, {});

        // Convert the grouped data to an array for easy rendering
        setBloodDetails(Object.entries(groupedData).map(([expiryDate, { totalBottles, details }]) => ({
          expiryDate,
          totalBottles, // The sum of bottles for this expiry date
          details,
        })));
      } catch (error) {
        console.error('Error fetching blood details:', error);
      }
    };

    fetchBloodDetails();
  }, [group]);

  const loadMore = () => {
    setVisibleRows(prev => prev + 10);
  };

  if (!bloodDetails.length) {
    return <div>No blood available for the selected group.</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <h1 className="mb-8 text-3xl font-bold text-red-700">
        Blood Group: {group}
      </h1>
      <div className="w-full max-w-screen-lg px-4">
        <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">#</th>
              <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Expiry Date</th>
              <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Total Bottles</th>
            </tr>
          </thead>
          <tbody>
            {bloodDetails.slice(0, visibleRows).map((detail, index) => (
              <tr key={detail.expiryDate} className="border-b hover:bg-red-50">
                <td className="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{detail.expiryDate}</td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">{detail.totalBottles}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {bloodDetails.length > visibleRows && (
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
  );
}
