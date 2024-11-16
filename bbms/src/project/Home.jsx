import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';


export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data after login
    const fetchUserData = async () => {
      try {
        // Get the current authenticated user
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Query the 'profiles' table using the 'uid' from authentication
          const { data, error } = await supabase
            .from('profiles')
            .select('f_name') // Adjust these field names based on your 'profiles' table
            .eq('id', user.id) // Ensure this matches the column name storing the user UID in 'profiles'
            .single();

          if (error) {
            setError(error.message);
            setLoading(false);
            return;
          }

          // Set the user data in state
          setUser(data);
        } else {
          setError('No user logged in');
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data: ' + error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div>{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div>User data not found!</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="flex w-4/5 pb-2 bg-white shadow-xl h-3/5 rounded-2xl">
        <div className="flex items-center justify-center w-1/3 border-r border-gray-200">
          <img
            src=".\user_profile.png" // Replace with dynamic image URL if required
            alt="User Profile"
            className="w-24 h-24 rounded-full"
          />
        </div>

        <div className="flex flex-col justify-center w-2/3 p-4 space-y-5">
          <h2 className="text-xl font-semibold">User Name: {user.f_name}</h2>
          <p className="text-xl font-semibold text-gray-600">Role: ADMIN</p>
          {/* <p className="text-xl font-semibold text-gray-600">Last Accessed: {user.last_accessed}</p> */}
        </div>
      </div>
    </div>
  );
}
