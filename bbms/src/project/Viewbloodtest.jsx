import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabase';  // Ensure you have your Supabase client set up correctly

export default function Viewbloodtest() {
  const { id } = useParams(); // Get the blood test ID from the URL
  const [testDetails, setTestDetails] = useState(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      // Step 1: Fetch the blood test record
      const { data: testData, error: testError } = await supabase
        .from('blood_test')
        .select('id, date, blood_type, results, bottle_id')
        .eq('id', id)
        .single(); // We expect only one record to match

      if (testError) {
        console.error('Error fetching blood test details:', testError);
        return;
      }

      // Step 2: Fetch the donor data using bottle_id from donor_donations
      const { data: donationData, error: donationError } = await supabase
        .from('donor_donations')
        .select('donor_id,date')
        .eq('bottle_id', testData.bottle_id)
        .single();  // We expect a single donation record

      if (donationError) {
        console.error('Error fetching donation data:', donationError);
        return;
      }

      // Step 3: Fetch the donor details (f_name, nic_no) from profiles using donor_id
      const { data: donorData, error: donorError } = await supabase
        .from('profiles')
        .select('f_name, nic_no')
        .eq('id', donationData.donor_id)
        .single();

      if (donorError) {
        console.error('Error fetching donor data:', donorError);
        return;
      }

      // Step 4: Fetch the location of the blood camp using camp_id
      // const { data: campData, error: campError } = await supabase
      //   .from('blood_camp')
      //   .select('name')
      //   .eq('id', donationData.camp_id)
      //   .single();

      // if (campError) {
      //   console.error('Error fetching camp data:', campError);
      //   return;
      // }

      // Combine all the data and set it
      setTestDetails({
        ...testData,
        donation_date: donationData.date,
        donor_name: donorData.f_name,
        donor_nic: donorData.nic_no
        //location: campData.name,
      });
    };

    fetchTestDetails();
  }, [id]);

  if (!testDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-3/4 p-10 mx-auto bg-white shadow-xl rounded-2xl">
      <div className="flex-1 pl-10">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl font-bold text-red-500 uppercase">Test Details</h2>
        </div>

        <div className="mt-4">
          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Test Date: {testDetails.date}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Donor Name: {testDetails.donor_name}</div>
            </div>
          </div>

          {/* <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Location: {testDetails.location}</div>
            </div>
          </div> */}

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Result: {testDetails.results}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Blood Type: {testDetails.blood_type}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Donation Date: {testDetails.donation_date}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>NIC No: {testDetails.donor_nic}</div>
            </div>
          </div>

          <div className="container flex justify-around mt-8 mb-5">
            {/* <NavLink to="/Bloodtestupdate">
              <button className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
                Update
              </button>
            </NavLink>
            <NavLink to="/Delete">
              <button className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
                Delete
              </button>
            </NavLink> */}
            <NavLink to="/bloodtest">
              <button type="button" className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600">
                Back
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-center h-full">
          <img
            src="path-to-test-report-image.jpg"
            alt="Test Report"
            className="object-cover w-full h-auto max-w-xs rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
