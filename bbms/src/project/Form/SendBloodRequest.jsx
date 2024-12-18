import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function NotificationForm() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [body, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bloodGroup || !body) {
      alert('Please select a blood group and enter a message.');
      return;
    }

    setLoading(true);

    // Step 1: Fetch users with the same blood group
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, blood_type')
      .eq('blood_type', bloodGroup);

    if (usersError) {
      console.error('Error fetching users by blood group:', usersError);
      alert('Error fetching users.');
      setLoading(false);
      return;
    }

    // Step 2: Filter users whose last donation date is more than 120 days ago
    const filteredUsers = [];

    for (const user of users) {
      const { data: donationsData, error: donationsError } = await supabase
        .from('donor_donations')
        .select('date')
        .eq('donor_id', user.id)
        .order('date', { ascending: false })
        .limit(1); // Fetch only the latest donation date

      if (donationsError) {
        console.error('Error fetching donation data:', donationsError);
        continue; // Skip this user if there's an error fetching donation data
      }

      // Step 3: Check if donation data is available
      if (donationsData && donationsData.length > 0) {
        const latestDonationDate = new Date(donationsData[0].date);
        const currentDate = new Date();
        const timeDiff = currentDate - latestDonationDate; // Time difference in milliseconds
        const diffDays = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

        // Step 4: Check if the difference is greater than 120 days
        if (diffDays > 120) {
          filteredUsers.push(user); // Add user if donation is allowed
        }
      } else {
        // No donation record found, donor can donate
        filteredUsers.push(user);
      }
    }

    // Step 5: Insert notifications for filtered users
    for (const user of filteredUsers) {
      await insertNotification(user.id);
    }

    setLoading(false);
    alert('Notifications sent to users who have not donated in the past 120 days.');
  };

  // Step 6: Insert a notification for the user
  const insertNotification = async (userId) => {
    const { error } = await supabase
      .from('notifications')
      .insert([{ user_id: userId, blood_type: bloodGroup, body }]);

    if (error) {
      console.error('Error inserting notification:', error);
      alert('Failed to send notification.');
    } else {
      console.log('Notification sent to user:', userId);
    }
  };

  return (
    <div className='w-2/3 pb-2 mx-auto bg-white shadow-xl rounded-2xl'>
      <div className='container p-6 mt-5 horizontal'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Send Blood Group Notification</h2>
          <div className='w-full mx-2'>
            <label className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>Blood Group:</label>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className='w-full p-1 px-2 text-gray-800 outline-none'
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
          <div className="w-full mx-2">
            <label className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>Message:</label>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
              <textarea
                value={body}
                onChange={(e) => setMessage(e.target.value)}
                className='w-full p-1 px-2 text-gray-800 outline-none'
                placeholder="Enter the message to send with the notification"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className='px-6 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 rounded-lg cursor-pointer hover:bg-slate-700 hover:text-white'
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
