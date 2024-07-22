import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { useBloodStock } from '../api/bloodstock';

export default function Stock() {
  const navigate = useNavigate();
  const { data: bloodstock, error, isLoading } = useBloodStock();

  const handleCardClick = (group) => {
    navigate(`/blood/${group}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!bloodstock || bloodstock.length === 0) {
    return <div>No blood stock available.</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <h1 className="mb-8 text-4xl font-bold text-red-700">Blood Stock</h1>
      <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
        {bloodstock.map((blooddetail) => (
          <div
            key={blooddetail.id} // Ensure `id` is a unique identifier
            onClick={() => handleCardClick(blooddetail.blood_type)}
            className="flex items-center justify-between p-6 transition duration-200 bg-white rounded-lg shadow-md cursor-pointer hover:bg-red-100"
          >
            <div>
              <h2 className="text-2xl font-bold text-red-700">{blooddetail.blood_type}</h2>
              <p className="text-gray-700">Available units: {blooddetail.quantity}</p>
            </div>
            <FontAwesomeIcon icon={faTint} size="2x" className="text-red-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
