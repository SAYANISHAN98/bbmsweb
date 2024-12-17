import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import CustomButton from './Custombutton';

export default function ViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
      } else if (profileData) {
        setFormData({
          fullName: `${profileData.f_name} ${profileData.l_name}`,
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
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this User?');
    if (confirmed) {
      const { error } = await supabase
        .from('profiles')
        .update({ delete_status: 'deleted' })
        .eq('id', id)
        .is('delete_status', null);

      if (error) {
        setError(error.message);
      } else {
        console.log('User marked as deleted');
        navigate('/Doner');
      }
    }
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (error) return <div className="mt-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-white border border-gray-300 rounded-lg shadow-lg">
      
      <h2 className="mb-6 text-2xl font-bold text-center text-red-500">Profile Details</h2>

      
      <div className="items-center w-5/6 mx-auto space-y-4 text-center ">
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Full Name</span>
          <span className="text-gray-800">{formData.fullName || 'Not Provided'}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Email</span>
          <span className="text-gray-800">{formData.email || 'Not Provided'}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Phone</span>
          <span className="text-gray-800">{formData.contactNumber || 'Not Provided'}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Address</span>
          <span className="text-gray-800">No :
            {`${formData.homeNumber},${formData.street}, ${formData.city}, ${formData.district}, ${formData.province}` || 'Not Provided'}
          </span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">User Role</span>
          <span className="text-gray-800">{formData.userRole || 'Not Provided'}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Gender</span>
          <span className="text-gray-800">{formData.gender || 'Not Provided'}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Blood Type</span>
          <span className="text-gray-800">{formData.bloodType || 'Not Provided'}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium text-gray-500">Last Donation Date</span>
          <span className="text-gray-800">{formData.lastDonationDate || 'Not Provided'}</span>
        </div>
      </div>

      
      <div className="flex justify-center gap-4 mt-6">
      <CustomButton
        label="Update"
        onClick={() => navigate(`/Donor/ViewDetail/Form/Update/${id}`)}
        color="blue"
      />
      <CustomButton
        label="Delete"
        onClick={handleDelete}
        color="red"
      />
      <CustomButton
        label="Back"
        onClick={() => navigate('/donor')}
        color="gray"
      />
      </div>
    </div>
  );
}
