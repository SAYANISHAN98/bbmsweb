import React, { useEffect, useState } from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import { supabase } from '../lib/supabase';  // Ensure you have your Supabase client set up correctly
import CustomButton from '../components/Custombutton';


export default function Viewbloodtest() {
  const { id } = useParams(); // Get the blood test ID from the URL
  const [testDetails, setTestDetails] = useState(null);
  const navigate = useNavigate();

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
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-white border border-gray-300 rounded-lg shadow-lg">
  
        <h2 className="mb-6 text-2xl font-bold text-center text-red-500">Test Details</h2>
        <div className="items-center w-5/6 mx-auto space-y-4 text-center ">

          <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Test Date</span>
            <span className="text-gray-800">{testDetails.date || 'Not Provided'}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Donor Name</span>
            <span className="text-gray-800">{testDetails.donor_name || 'Not Provided'}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Result</span>
            <span className="text-gray-800">{testDetails.results || 'Not Provided'}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Blood Type</span>
            <span className="text-gray-800">{testDetails.blood_type || 'Not Provided'}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Donation Date</span>
            <span className="text-gray-800">{testDetails.donation_date || 'Not Provided'}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">NIC NO</span>
            <span className="text-gray-800">{testDetails.donor_nic || 'Not Provided'}</span>
          </div>
        
        

          {/*
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Location</span>
            <span className="text-gray-800">{testDetails.location || 'Not Provided'}</span>
          </div>*/}
           <div className="flex-1">
        <div className="flex items-center justify-center h-full">
          <img
            src="path-to-test-report-image.jpg"
            alt="Test Report"
            className="object-cover w-full h-auto max-w-xs rounded-lg shadow-md"
          />
        </div>
        </div>
          <CustomButton
          label="Back"
          onClick={() => navigate('/Bloodtest')}
          color="gray"
        />
        
        </div>
       
     
    </div>
  );
}
