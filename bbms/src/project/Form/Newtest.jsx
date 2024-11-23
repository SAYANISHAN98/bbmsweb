import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Newtest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    results: '',
    bottle_id: '',
    tested_by: '',
    flag: '',
    report: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, report: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, results, bottle_id, tested_by, flag, report } = formData;

    try {
      let reportUrl = null;

      
      if (report) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(`reports/${Date.now()}_${report.name}`, report);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        reportUrl = uploadData.Key;
      }

      
      const { data, error } = await supabase
        .from('blood_test')
        .insert([{ date, results, bottle_id, tested_by, flag, report_url: reportUrl }]);

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

        
        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">DATE</label>
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
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">BOTTLE ID</label>
          <input
            type="text"
            name="bottle_id"
            value={formData.bottle_id}
            onChange={handleChange}
            placeholder="Enter Bottle ID"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        
        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">TESTED BY</label>
          <input
            type="text"
            name="tested_by"
            value={formData.tested_by}
            onChange={handleChange}
            placeholder="Enter Tester Name"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        
        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">RESULTS</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="results"
                value="Pass"
                onChange={handleChange}
                className="mr-2"
                required
              />
              Pass
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="results"
                value="Fail"
                onChange={handleChange}
                className="mr-2"
                required
              />
              Fail
            </label>
          </div>
        </div>

       
        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">FLAG</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="flag"
                value="Yellow"
                onChange={handleChange}
                className="mr-2"
                required
              />
              Yellow
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="flag"
                value="Red"
                onChange={handleChange}
                className="mr-2"
                required
              />
              Red
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="flag"
                value="Green"
                onChange={handleChange}
                className="mr-2"
                required
              />
              Green
            </label>
          </div>
        </div>

       
        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">REPORT</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
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
