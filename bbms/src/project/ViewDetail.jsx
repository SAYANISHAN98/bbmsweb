import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Ensure supabase is properly initialized

export default function ViewProfile() {
  const { id } = useParams(); // Extract the id from the URL params
  const navigate = useNavigate(); // For navigation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nicNo: '',
    dob: '',
    email: '',
    contactNumber: '',
    homeNumber: '',
    street: '',
    city: '',
    district: '',
    province: '',
    userRole: '',
    gender: '',
    bloodType: '',
    lastDonationDate: '',
  });

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id) // Fetch data where the id matches the one from the URL
        .single(); // Using `.single()` to ensure only one result is returned

      if (error) {
        setError(error.message); // Set the error message
      } else if (data) {
        const profileData = data;
        setFormData({
          firstName: profileData.f_name,
          lastName: profileData.l_name,
          nicNo: profileData.nic_no,
          dob: profileData.dob,
          email: profileData.email,
          contactNumber: profileData.contact_number,
          homeNumber: profileData.home_no,
          street: profileData.street,
          city: profileData.city,
          district: profileData.district,
          province: profileData.province,
          userRole: profileData.role,
          gender: profileData.gender,
          bloodType: profileData.blood_type,
          lastDonationDate: profileData.last_donation_date,
        });
      }
      setLoading(false); // Finish loading
    };

    fetchData(); // Call the fetchData function
  }, [id]); // Re-run when the id changes

  // Delete button function
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this User?');
    if (confirmed) {
      const { error } = await supabase
        .from('profiles')
        .update({ delete_status: 'deleted' })
        .eq('id', id)
        .is('delete_status', null);

      if (error) {
        setError(error.message); // Handle delete error
      } else {
        console.log('User marked as deleted');
        navigate('/Doner'); // Redirect to the donor page after deletion
      }
    }
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-details">
      <h2>User Details</h2>
      <div>
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>NIC No:</strong> {formData.nicNo}</p>
        <p><strong>Date of Birth:</strong> {formData.dob}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Contact Number:</strong> {formData.contactNumber}</p>
        <p><strong>Home Number:</strong> {formData.homeNumber}</p>
        <p><strong>Street:</strong> {formData.street}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>District:</strong> {formData.district}</p>
        <p><strong>Province:</strong> {formData.province}</p>
        <p><strong>User Role:</strong> {formData.userRole}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <p><strong>Blood Type:</strong> {formData.bloodType}</p>
        <p><strong>Last Donation Date:</strong> {formData.lastDonationDate}</p>
      </div>

      <div className="container flex justify-around mt-8 mb-5">
        {/* Update Button */}
        <button
          onClick={() => navigate(`/Form/Update/${id}`)} // Navigate to the update page
          className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl"
        >
          Update
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete} // Trigger the delete function
          className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
