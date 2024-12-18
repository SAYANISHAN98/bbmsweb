import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Assuming Supabase is set up
import CustomButton from '../components/Custombutton';

export default function Viewcamp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donorCount, setDonorCount] = useState(0); // State for donor count

  useEffect(() => {
    const fetchCamp = async () => {
      const { data, error } = await supabase
        .from('blood_camp')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching camp details:', error);
      } else {
        setCamp(data);
      }
      setLoading(false);
    };

    const fetchDonorCount = async () => {
      const { count, error } = await supabase
        .from('donor_donation')
        .select('id', { count: 'exact' })
        .eq('camp_id', id);

      if (error) {
        console.error('Error fetching donor count:', error);
      } else {
        setDonorCount(count);
      }
    };

    fetchCamp();
    fetchDonorCount();
  }, [id]);

  const deleteCamp = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this camp?');
    if (confirmed) {
      const { error } = await supabase
        .from('blood_camp')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting camp:', error);
      } else {
        console.log('Camp deleted successfully');
        navigate('/Bloodcamp'); // Redirect to the main camp list after deletion
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-white border border-gray-300 rounded-lg shadow-lg">

        <h2 className="mb-6 text-2xl font-bold text-center text-red-500">Blood Camp Details</h2>

        <div className="items-center w-5/6 mx-auto space-y-4 text-center ">

          <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Camp Name</span>
            <span className="text-gray-800">{camp?.name || 'Not Provided'}</span>
         </div>
         
         <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Camp Date</span>
            <span className="text-gray-800">{camp?.date || 'Not Provided'}</span>
         </div>

         <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Address</span>
            <span className="text-gray-800">{camp?.address || 'Not Provided'}</span>
         </div>

         <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Status</span>
            <span className="text-gray-800">{camp?.status || 'Not Provided'}</span>
         </div>

         <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-medium text-gray-500">Number of Donors</span>
            <span className="text-gray-800">{camp?.donorCount || 'Not Provided'}</span>
         </div>

        <div className="flex justify-center gap-4 mt-6">
          
          <CustomButton
            label="Update"
            onClick={() => navigate(`/Bloodcamp/Viewcamp/Bloodcampupdate/${id}`)}
            color="blue"
          />
        {/*
         <CustomButton
            label="Delete"
            onClick={deleteCamp}
            color="red"
          />*/}
        
        <CustomButton
          label="Back"
          onClick={() => navigate('/Bloodcamp')}
          color="gray"
        />
      </div>
        </div>
      
    </div>
  );
}
