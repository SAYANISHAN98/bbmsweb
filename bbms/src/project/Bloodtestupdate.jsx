import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/Custombutton';

export default function Bloodtestupdate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    testDate: '',
    donorName: '',
    location: '',
    status: '',
    result: '',
    bloodType: '',
    reportPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      reportPhoto: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className='container w-5/6 p-6 pb-2 mx-auto mt-5 bg-white shadow-xl rounded-2xl horizontal'>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Update Blood Test</h2>

        <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
            <div className='h-6 mb-2 text-xs font-bold leading-8 text-gray-600 uppercase'>
              Test Date :
            </div>
            <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type="date"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          />
        </div>
        </div>

        <div className='flex-1 mr-2'>
        <div className='h-6 mb-2 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Donor Name :
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type="text"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            placeholder="Enter donor's name"
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          />
        </div>
        </div>
        </div>

        <div className='w-full mx-2 '>
        <div className='h-6 mb-2 text-xs font-bold leading-8 text-gray-600 uppercase'>
          Location :
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          />
        </div>
        </div>

        <div className='w-full mx-2 '>
        <div className='h-6 mb-2 text-xs font-bold leading-8 text-gray-600 uppercase'>
        Status :
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
          
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        </div>

        <div className='w-full mx-2 '>
        <div className='h-6 mb-2 text-xs font-bold leading-8 text-gray-600 uppercase'>
        Result :
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type="text"
            name="result"
            value={formData.result}
            onChange={handleChange}
            placeholder="Enter test result"
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          />
        </div>
        </div>

        <div className='w-full mx-2 '>
        <div className='h-6 mb-2 text-xs font-bold leading-8 text-gray-600 uppercase'>
        Blood Type :
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
           <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            required
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        </div>

        <div className='w-full mx-2 '>
        <div className='h-6 mb-2 text-xs font-bold leading-8 text-gray-600 uppercase'>
        Report Photo :
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type="file"
            name="reportPhoto"
            accept="image/*"
            onChange={handleFileChange}
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
        </div>

        <div className="flex justify-between m-6">
          <CustomButton
            label="Back"
            onClick={() => navigate('/Bloodtest')}
            color="gray"
          />
          <CustomButton
            label="Update"
            onClick={() => navigate('/Viewbloodtest')}
            color="blue"
          />
        </div>
      </form>
    </div>
  );
}
