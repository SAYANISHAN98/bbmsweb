import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Newtest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    results: '',
    donationid: '',
    donorid: '',
    testedby: '',
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
    const { date, results, donationid, donorid, testedby } = formData;

    const { data, error } = await supabase
      .from('blood_tests')
      .insert([{ date, results, donationid, donorid, testedby }]);

    if (error) {
      console.error('Error adding blood test:', error);
    } else {
      console.log('Blood test added:', data);
      navigate('/Bloodtest');
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-8">
      <form onSubmit={handleSubmit} className="w-3/4 p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Add New Blood Test</h2>

        <div>
          <label className="mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Date</label>
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
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Results</label>
          <input
            type="text"
            name="results"
            value={formData.results}
            onChange={handleChange}
            placeholder="Enter test result"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Donation ID</label>
          <input
            type="text"
            name="donationid"
            value={formData.donationid}
            onChange={handleChange}
            placeholder="Enter donation ID"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Donor ID</label>
          <input
            type="text"
            name="donorid"
            value={formData.donorid}
            onChange={handleChange}
            placeholder="Enter donor ID"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Tested By</label>
          <input
            type="text"
            name="testedby"
            value={formData.testedby}
            onChange={handleChange}
            placeholder="Enter tester's name"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

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
