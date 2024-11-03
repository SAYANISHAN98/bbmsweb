import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Bloodcampupdate() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get camp ID from route params
  const [formData, setFormData] = useState({
    camp_name: '',
    camp_date: '',
    location: '',
    status: '',
  });

  // Fetch existing camp data on mount
  useEffect(() => {
    const fetchCampData = async () => {
      const { data, error } = await supabase
        .from('blood_camp')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching camp details:', error);
      } else {
        setFormData({
          name: data.name,
          date: data.date,
          location: data.location,
          status: data.status,
        });
      }
    };

    fetchCampData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to update data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('blood_camp')
      .update({
        name: formData.name,
        date: formData.date,
        location: formData.location,
        status: formData.status,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating camp details:', error);
    } else {
      console.log('Camp updated successfully');
      navigate('/Bloodcamp');
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-8">
      <form onSubmit={handleSubmit} className="w-3/4 p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Update Blood Camp Details</h2>

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
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
