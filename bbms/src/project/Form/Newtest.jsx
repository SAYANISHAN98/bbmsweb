
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
    const { date,blood_type, donation_date, results, bottle_id, tested_by, flag, report } = formData;
  
    try {
      let reportUrl = null;
  
      // Step 1: Upload the report if provided
      if (report) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(`reports/${Date.now()}_${report.name}`, report);
  
        if (uploadError) {
          throw new Error(uploadError.message);
        }
  
        reportUrl = supabase.storage.from('reports').getPublicUrl(uploadData.path).publicUrl;
      }
  
      // Step 2: Validate `bottle_id` existence
      const { data: bottleData, error: bottleError } = await supabase
        .from('donor_donations')
        .select('bottle_id')
        .eq('bottle_id', bottle_id);
  
      if (bottleError || bottleData.length === 0) {
        alert('Bottle ID does not exist in the donations table.');
        return;
      }
  
      // Step 3: Insert into `blood_test` table
      const { data: bloodTestData, error: bloodTestError } = await supabase
        .from('blood_test')
        .insert([{ date,blood_type, donation_date, results, bottle_id, tested_by, flag, report_url: reportUrl }])
        .select(); // `.select()` fetches the inserted data, including `test_id`.
  
      if (bloodTestError) {
        alert('Error adding blood test: ' + bloodTestError.message);
        console.error('Error inserting blood test:', bloodTestError);
        return;
      }
  
      const testId = bloodTestData[0]?.test_id; // Retrieve the `test_id` from the inserted data
  
      // Step 4: Calculate `exp_date` and add a record to `blood_stock` if test result is "Pass"
      if (results === 'Pass') {
        const expDate = new Date(donation_date); // Create a date object from `donation_date`
        expDate.setDate(expDate.getDate() + 120); // Add 120 days
  
        const { data: stockData, error: stockError } = await supabase
          .from('blood_stock')
          .insert([{ test_id: testId, blood_type,bottle_id, flag, exp_date: expDate.toISOString().split('T')[0] }]);
  
        if (stockError) {
          alert('Error adding to stock: ' + stockError.message);
          console.error('Error inserting into stock:', stockError);
          return;
        }
  
        console.log('Stock entry added successfully:', stockData);
      }
  
      console.log('Blood test added successfully:', bloodTestData);
      navigate('/Bloodtest');
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
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Donated DATE</label>
          <input
            type="date"
            name="donation_date"
            value={formData.donation_date}
            onChange={handleChange}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Blood Type:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <select
                  name='blood_type'
                  value={formData.blood_type}
                  onChange={handleChange}
                  className='w-full p-1 px-2 text-gray-800 outline-none'
                >
                  <option value=''>Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
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
