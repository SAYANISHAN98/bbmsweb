import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Ensure your Supabase client is set up correctly

export default function Viewdonations() {
  const { id } = useParams(); // Get the donor_donation ID from the URL
  const [donationDetails, setDonationDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="flex w-3/4 p-10 mx-auto bg-white shadow-xl rounded-2xl">
      <div className="flex-1 pl-10">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl font-bold text-red-500 uppercase">Donation Details</h2>
        </div>

        <div className="mt-4">
          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Donation Date: {donationDetails.donationDate}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Donor Name: {donationDetails.donorName}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>NIC No: {donationDetails.nicNo}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Blood Type: {donationDetails.bloodType}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>No of Bottles: {donationDetails.noOfBottles}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Location: {donationDetails.location}</div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <h2 className="text-4xl font-bold text-red-500 uppercase">Medical Details</h2>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Blood Pressure: {donationDetails.bloodPressure}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Sugar Level: {donationDetails.sugarLevel}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Hemoglobin Level: {donationDetails.hbLevel}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Visible Marks: {donationDetails.visibleMarks}</div>
            </div>
          </div>

          <div className="container flex justify-around mt-8 mb-5">
            <NavLink to="/donordonations">
              <button type="button" className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600">
                Back
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      
    </div>
  );
}
