import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex items-center justify-center w-full py-8">
      <form onSubmit={handleSubmit} className="w-3/4 p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Update Blood Test</h2>

        <div>
          <label className="mt-1 text-xs font-bold leading-8 text-gray-600 uppercase bh-6">Test Date</label>
          <input
            type="date"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Donor Name</label>
          <input
            type="text"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            placeholder="Enter donor's name"
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
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Result</label>
          <input
            type="text"
            name="result"
            value={formData.result}
            onChange={handleChange}
            placeholder="Enter test result"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Blood Type</label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
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

        <div>
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Report Photo</label>
          <input
            type="file"
            name="reportPhoto"
            accept="image/*"
            onChange={handleFileChange}
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
            onClick={() => navigate('/Viewbloodtest')}
            className="px-4 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
