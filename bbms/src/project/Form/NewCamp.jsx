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
    <div className='container w-2/3 p-6 pb-2 mx-auto mt-5 bg-white shadow-xl rounded-2xl horizontal'>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Add Blood Camp Details</h2>

        <div className='w-full mx-2 '>
        <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
        Camp Name :
              </div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Camp Name"
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          />
        </div>
        </div>

        <div className='w-full mx-2 '>
        <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
        Camp Date :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          />
        </div>
        </div>

        <div className='w-full mx-2 '>
        <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
        Address :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          />
        </div>
        </div>

        <div className='w-full mx-2 '>
        <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
        Status :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="postponed">Postponed</option>
          </select>
        </div>
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
