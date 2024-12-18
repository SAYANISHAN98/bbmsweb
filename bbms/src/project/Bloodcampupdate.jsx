import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import CustomButton from '../components/Custombutton';

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
          address: data.address,
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
        address: formData.address,
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
    <div className='container w-3/5 p-6 pb-2 mx-auto mt-5 bg-white shadow-xl rounded-2xl horizontal'>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Update Blood Camp Details</h2>

        <div className='w-full mx-2 '>
          <label className="h-6 text-xs font-bold leading-8 text-gray-600 uppercase ">Camp Name :</label>
          <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          />
        </div>
        </div>

        <div className='w-full mx-2 '>
          <label className="h-6 text-xs font-bold leading-8 text-gray-600 uppercase">Camp Date :</label>
          <div className='flex bg-white border border-gray-200 rounded'>
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
          <label className="h-6 text-xs font-bold leading-8 text-gray-600 uppercase">Address :</label>
          <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type="text"
            name="location"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter location"
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          />
        </div>
        </div>

        <div className='w-full mx-2 '>
          <label className="h-6 text-xs font-bold leading-8 text-gray-600 uppercase">Status :</label>
          <div className='flex bg-white border border-gray-200 rounded'>
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

        <div className="flex justify-between mt-6">
          <CustomButton
              label="Back"
              onClick={() => navigate('/Bloodcamp')}
              color="gray"
          />
          <button
            type="submit"
            className='px-6 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 rounded-lg cursor-pointer hover:bg-slate-700 hover:text-white'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
