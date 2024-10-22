import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Newtest() {
  const navigate = useNavigate();
 

  ;

  return (
    <div className="flex items-center justify-center w-full py-8">
      <form className="w-3/4 p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Add New Blood Test</h2>

        <div >
          <label className="mt-1 text-xs font-bold leading-8 text-gray-600 uppercase bh-6">Test Date</label>
          <input
            type="date"
            name="testDate"
            value=""
            onChange={""}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div >
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Donor Name</label>
          <input
            type="text"
            name="donorName"
            value=""
            onChange={""}
            placeholder="Enter donor's name"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div >
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Location</label>
          <input
            type="text"
            name="location"
            value=""
            onChange={""}
            placeholder="Enter location"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div >
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Status</label>
          <select
            name="status"
            value=""
            onChange={""}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div >
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Result</label>
          <input
            type="text"
            name="result"
            value=""
            onChange={""}
            placeholder="Enter test result"
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div >
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Blood Type</label>
          <select
            name="bloodType"
            value=""
            onChange={""}
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

        <div >
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Report Photo</label>
          <input
            type="file"
            name="reportPhoto"
            accept="image/*"
            onChange={""}
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
