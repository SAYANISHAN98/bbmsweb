import React ,{ useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BloodGroupDetail() {
  const { group } = useParams();
  

  const bloodDetails = [
    { id: 1, bottles: 5, expiryDate: '2024-12-10' },
    { id: 2, bottles: 8, expiryDate: '2024-12-15' },
    { id: 3, bottles: 3, expiryDate: '2025-01-05' },
  ];
  const [visibleRows, setVisibleRows] = useState(10); 
  const loadMore = () => {
    setVisibleRows((prev) => prev + 10); 
    };

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <h1 className="mb-8 text-3xl font-bold text-red-700">
        Blood Group: {group}
      </h1>
      <div className="w-full max-w-screen-lg px-4">
      <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">#</th>
              <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">No. of Bottles</th>
              <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {bloodDetails.slice(0,visibleRows).map((detail, index) => (
              <tr key={detail.id} className="border-b hover:bg-red-50">
                <td className="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{detail.bottles}</td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">{detail.expiryDate}</td>
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
