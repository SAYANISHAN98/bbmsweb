import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Assuming Supabase is set up

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
    <div className="flex w-3/4 p-10 mx-auto bg-white shadow-xl rounded-2xl">
      <div className="flex-1 pl-10">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl font-bold text-red-500 uppercase">Blood Camp Details</h2>
        </div>

        <div className="mt-4">
          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Camp Name: {camp?.name || 'N/A'}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Camp Date: {camp?.date || 'N/A'}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Address: {camp?.address || 'N/A'}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Status: {camp?.status || 'N/A'}</div>
            </div>
          </div>

          <div className="flex-1 w-full mx-2 mt-3">
            <div className="h-8 font-bold leading-8 text-gray-700">
              <div>Number of Donors: {donorCount || 0}</div>
            </div>
          </div>

          <div className="container flex justify-around mt-8 mb-5">
            <NavLink to={`/Bloodcampupdate/${id}`}>
              <button className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl">
                Update
              </button>
            </NavLink>

            {/* <button
              onClick={deleteCamp}
              className="px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl"
            >
              Delete
            </button> */}

            <NavLink to="/Bloodcamp">
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
