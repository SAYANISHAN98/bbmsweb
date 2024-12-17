import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { useBloodStock } from '../api/bloodstock';

export default function Stock() {
  const navigate = useNavigate();
  const { data: bloodstock, error, isLoading } = useBloodStock();

  // Group blood stock by blood type, sum quantities, and count the entries
  const groupedBloodStock = bloodstock?.reduce((acc, blooddetail) => {
    if (!acc[blooddetail.blood_type]) {
      acc[blooddetail.blood_type] = { totalQuantity: 0, count: 0 };
    }
    acc[blooddetail.blood_type].totalQuantity += blooddetail.quantity;
    acc[blooddetail.blood_type].count += 1;
    return acc;
  }, {});

  const handleCardClick = (group) => {
    navigate(`/Stock/blood/${group}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!groupedBloodStock || Object.keys(groupedBloodStock).length === 0) {
    return <div>No blood stock available.</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-4">
      <h1 className="mb-4 text-3xl font-bold text-center text-red-700">Blood Stock</h1>
      <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.keys(groupedBloodStock).map((bloodType) => (
          <div
            key={bloodType}
            onClick={() => handleCardClick(bloodType)}
            className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md cursor-pointer hover:bg-red-100"
          >
            <div>
              <h2 className="text-2xl font-bold text-red-700">{bloodType}</h2>
              <p className="text-gray-700">Available units: {groupedBloodStock[bloodType].count}</p>
            </div>
            <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
