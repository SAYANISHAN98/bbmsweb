// NewTestForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewCamp() {
  const navigate = useNavigate();
 

  ;

  return (
    <div className="flex items-center justify-center w-full py-8">
      <form className="w-3/4 p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg">
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Add New Blood Test</h2>

        <div >
          <label className="mt-1 text-xs font-bold leading-8 text-gray-600 uppercase bh-6">Camp Name</label>
          <input
            type="text"
            name="camp_name"
            value=""
            onChange={""}
            className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
        </div>

        <div >
          <label className="h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase">Camp Date</label>
          <input
            type="date"
            name="camp_date"
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
            <option value="active">Active</option>
            <option value="inactive">InActive</option>
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
                    Add Test
                </button>
                </div>
    
      </form>
    </div>
  );
}
