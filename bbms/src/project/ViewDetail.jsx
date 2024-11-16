import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfilesid } from '../api/profiles'; // Assuming you're using a hook to fetch profile data
import { supabase } from '../lib/supabase';

export default function ViewDetail() {
  const navigate = useNavigate();  // For navigation
  const { id } = useParams(); // Extract the id from the URL params
  //console.log(id); // This will log the id from the URL to help with debugging
  
  // Fetch profile data based on the id
    const { data: profile, refetch, error, isLoading } = useProfilesid(id);

const handleDelete = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this User?');
  if (confirmed) {
    const { error } = await supabase
      .from('profiles')
      .update({ delete_status: 'deleted' })
      .eq('id', id)
      .is('delete_status', null);

    if (error) {
      console.error('Error deleting user:', error.message);
    } else {
      console.log('User marked as deleted');
      refetch(); // Trigger a refetch of the profile data
      navigate('/Doner'); // Redirect to another page after successful deletion
    }
  }
};

 

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-1/2 p-10 mx-auto bg-white shadow-xl rounded-2xl">
      <div className="flex items-center justify-center">
        <h2 className="text-4xl font-bold text-red-500 uppercase">User Details</h2>
      </div>
      <div className="mt-4">
        {/* Display user details */}
        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>Name: {profile.f_name} {profile.l_name}</div>
          </div>
        </div>

        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>Email: {profile.email}</div>
          </div>
        </div>

        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>Contact Number: {profile.contact_number}</div>
          </div>
        </div>

        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>Address: {profile.address}</div>
          </div>
        </div>

        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>User Role: {profile.role}</div>
          </div>
        </div>

        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>Age: {profile.age}</div>
          </div>
        </div>

        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>Gender: {profile.gender}</div>
          </div>
        </div>

        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>Blood Type: {profile.blood_type}</div>
          </div>
        </div>

        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>Last Donation Date: {profile.last_donation_date}</div>
          </div>
        </div>

        

        <div className="flex-1 w-full mx-2 mt-3">
          <div className="h-8 font-bold leading-8 text-gray-700">
            <div>Diseases: {profile.diseases}</div>
            </div>
            <div>
          </div>
        </div>

        <div className="container flex justify-around mt-8 mb-5">
          {/* Update button - Use navigate for redirection */}
          <button
            onClick={() => navigate(`/Update/${profile.id}`)} // Use the profile.id from the profiles table
            className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl"
          >
            Update
          </button>

          {/* Optional Delete button - Can redirect to a delete confirmation page */}
          <button onClick={handleDelete} className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
