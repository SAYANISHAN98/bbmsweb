import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ViewProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="max-w-5xl p-6 mx-auto mt-10 bg-white border border-gray-300 shadow-2xl rounded-3xl">
      
      <h2 className="mb-8 text-3xl font-bold text-center text-red-600 uppercase">User Profile</h2>

    
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(formData).map(([key, value]) => (
          <div
            key={key}
            className="p-2 transition duration-300 border rounded-lg shadow-md bg-gradient-to-br from-gray-100 to-gray-50 hover:shadow-lg"
          >
            <p className="pl-4 text-sm font-medium tracking-wide text-gray-600 uppercase">
              {key.replace(/([A-Z])/g, ' $1')}
            </p>
            <p className="mt-1 text-base font-semibold text-center text-gray-800">
              {value || <span className="italic text-gray-400">Not Provided</span>}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <button
          onClick={() => navigate(`/Form/Update/${id}`)}
          className="px-8 py-3 font-semibold text-white uppercase transition duration-300 bg-blue-500 shadow-md rounded-xl hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-8 py-3 font-semibold text-white uppercase transition duration-300 bg-red-500 shadow-md rounded-xl hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => navigate('/Doner')}
          className="px-8 py-3 font-semibold text-white uppercase transition duration-300 bg-gray-500 shadow-md rounded-xl hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
}
