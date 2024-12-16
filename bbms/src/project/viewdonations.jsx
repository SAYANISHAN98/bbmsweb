import React, { useEffect, useState } from 'react';
import { useNavigate,useParams, NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Ensure your Supabase client is set up correctly
import CustomButton from './Custombutton';

export default function Viewdonations() {
  const { id } = useParams(); // Get the donor_donation ID from the URL
  const [donationDetails, setDonationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const replaceNullWithNA = (value) => (value === null || value === undefined ? 'N/A' : value);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        // Fetch the donation details first based on the donor_donations ID
        const { data: donationDetails, error } = await supabase
          .from('donor_donations')
          .select(`
            id,
            date,
            no_of_bottles,
            donor_id,
            camp_id
          `)
          .eq('id', id); // Filter based on the donation ID

        if (error) throw error;

        if (donationDetails.length === 0) {
          console.error('No matching donation details found.');
          return;
        }

        // Extract the donor_id from the donation details
        const donorId = donationDetails[0].donor_id;
        const CampId = donationDetails[0].camp_id;
        

        // Fetch the related donor profile and medical status
        const { data: donorProfile, error: profileError } = await supabase
          .from('profiles')
          .select('f_name, l_name, nic_no, blood_type')
          .eq('id', donorId)
          ; // Match donor_id with profiles table

        if (profileError) throw profileError;

        // Fetch blood camp details based on camp_id
            const { data: bloodCamp, error: bloodCampError } = await supabase
            .from('blood_camp')
            .select('name')
            .eq('id', CampId);

            if (bloodCampError) throw bloodCampError;

            // Fetch medical status based on donor_id
            // Fetch medical status based on donor_id and date
          const { data: medicalStatus, error: medicalError } = await supabase
            .from('medical_status')
            .select('blood_pressure, sugar_level, hb_level, visible_marks')
            .eq('donor_id', donorId) // Match donor_id from donor_donations
            .eq('date', donationDetails[0].date); // Match date from donor_donations

            //console.log( formattedMedicalStatus.blood_pressure);
            if (medicalError) throw medicalError;

            const formattedMedicalStatus = medicalStatus.length
            ? medicalStatus[0]
            : { blood_pressure: 'N/A', sugar_level: 'N/A', hb_level: 'N/A', visible_marks: 'N/A' };

            const formattedData = {
            donationDate: donationDetails[0].date || 'N/A',
            noOfBottles: donationDetails[0].no_of_bottles || 'N/A',
            donorName: `${donorProfile[0]?.f_name || 'N/A'} ${donorProfile[0]?.l_name || ''}`.trim(),
            nicNo: donorProfile[0]?.nic_no || 'N/A',
            bloodType: donorProfile[0]?.blood_type || 'N/A',
            location: bloodCamp[0]?.name || 'N/A',
            bloodPressure: formattedMedicalStatus.blood_pressure,
            sugarLevel: formattedMedicalStatus.sugar_level,
            hbLevel: formattedMedicalStatus.hb_level,
            visibleMarks: formattedMedicalStatus.visible_marks,
            };


        setDonationDetails(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donation details:', error);
        setLoading(false);
      }
    };

    fetchDonationDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!donationDetails) {
    return <div className="text-center text-red-500">Donation details not found.</div>;
  }

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-white border border-gray-300 rounded-lg shadow-lg">
        
        <h2 className="mb-6 text-2xl font-bold text-center text-red-500">Donation Details</h2>
        

        <div className="items-center w-5/6 mx-auto space-y-4 text-center ">
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Donation Date</span>
          <span className="text-gray-800">{donationDetails.donationDate || 'Not Provided'}</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Donor Name</span>
          <span className="text-gray-800">{donationDetails.donorName || 'Not Provided'}</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">NIC No</span>
          <span className="text-gray-800">{donationDetails.nicNo || 'Not Provided'}</span>
        </div>
          
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Blood Type</span>
          <span className="text-gray-800">{donationDetails.bloodType || 'Not Provided'}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">No of Bottles</span>
          <span className="text-gray-800">{donationDetails.noOfBottles || 'Not Provided'}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Location</span>
          <span className="text-gray-800">{donationDetails.location || 'Not Provided'}</span>
        </div>


          <h2 className="mb-6 text-2xl font-bold text-center text-red-500">Profile Details</h2>
          <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Blood Pressure</span>
          <span className="text-gray-800">{donationDetails.bloodPressure || 'Not Provided'}</span>
        </div>

        

        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Sugar Level</span>
          <span className="text-gray-800">{donationDetails.sugarLevel || 'Not Provided'}</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Hemoglobin Level</span>
          <span className="text-gray-800">{donationDetails.hbLevel || 'Not Provided'}</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Visible Marks</span>
          <span className="text-gray-800">{donationDetails.visibleMarks || 'Not Provided'}</span>
        </div>
        
          <div className="flex justify-center gap-4 mt-6">
            <CustomButton
              label="Back"
              onClick={() => navigate('/Donordonations')}
              color="gray"
            />
              
          </div>
        </div>
      </div>
      
   
  );
}
