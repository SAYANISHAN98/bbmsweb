import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { insertCamp } from '../../api/camp';

export default function NewCamp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    address: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call insertCamp function to send data to Supabase
      const data = await insertCamp(formData);
      console.log('Camp added:', data);
      
      // Navigate back to the camp list page after successful submission
      navigate('/Bloodcamp');
    } catch (error) {
      console.error('Error adding camp:', error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-8">
      <form onSubmit={handleSubmit} className="w-3/4 p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Add Blood Camp Details</h2>

        <div>
          <label className="mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Camp Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Camp Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="postponed">Postponed</option>
          </select>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate('/Bloodcamp')}
            className="px-4 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Add Camp
          </button>
        </div>
      </form>
    </div>
  );
}
