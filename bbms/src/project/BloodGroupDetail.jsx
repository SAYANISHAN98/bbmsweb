import React from 'react';
import { useParams } from 'react-router-dom';

export default function BloodGroupDetail() {
  const { group } = useParams();

  const bloodDetails = [
    { id: 1, bottles: 5, expiryDate: '2024-12-10' },
    { id: 2, bottles: 8, expiryDate: '2024-12-15' },
    { id: 3, bottles: 3, expiryDate: '2025-01-05' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <h1 className="mb-8 text-3xl font-bold text-red-700">
        Blood Group: {group}
      </h1>
      <div className="w-full max-w-screen-lg px-4">
        <table className="w-full p-3 border-2 border-red-500 shadow-md-">
          <thead className="bg-red-100 border-b-2 border-gray-500">
            <tr>
              <th className="p-2 text-left text-gray-700 border-b">#</th>
              <th className="p-2 text-left text-gray-700 border-b">No. of Bottles</th>
              <th className="p-2 text-left text-gray-700 border-b">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {bloodDetails.map((detail, index) => (
              <tr key={detail.id} className="hover:bg-red-50">
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{detail.bottles}</td>
                <td className="p-2 border-b">{detail.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
