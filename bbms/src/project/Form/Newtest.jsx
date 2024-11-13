import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Newtest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    results: '',
    donatio_id: '',
    donor_id: '',
    tested_by: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, results, donation_id, donor_id, tested_by } = formData;

    try {
      const { data, error } = await supabase
        .from('blood_test')
        .insert([{ date, results, donation_id, donor_id, tested_by }]);

      if (error) {
        alert('Error adding blood test: ' + error.message);
        console.error('Error inserting blood test:', error);
      } else {
        console.log('Blood test added successfully:', data);
        navigate('/Bloodtest');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-8">
      <form onSubmit={handleSubmit} className="w-3/4 p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Add New Blood Test</h2>

        {/* Input Fields */}
        {['date', 'results', 'donation_id', 'donor_id', 'tested_by'].map((field) => (
          <div key={field}>
            <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">
              {field.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}
            </label>
            <input
              type={field === 'date' ? 'date' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
              className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>
        ))}

        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate('/Bloodtest')}
            className="px-4 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Add Test
          </button>
        </div>
      </form>
    </div>
  );
}
