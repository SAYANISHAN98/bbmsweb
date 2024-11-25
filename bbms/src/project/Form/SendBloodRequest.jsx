import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function NotificationForm() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bloodGroup || !message) {
      alert('Please select a blood group and enter a message.');
      return;
    }

    setLoading(true);

    // Step 1: Fetch users with the same blood group and check the last donation date
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, blood_type, last_donation_date')
      .eq('blood_type', bloodGroup);

    if (usersError) {
      console.error('Error fetching users by blood group:', usersError);
      alert('Error fetching users.');
      setLoading(false);
      return;
    }

    // Step 2: Filter users whose last donation date is more than 120 days ago
    const filteredUsers = users.filter(user => {
      const lastDonationDate = new Date(user.last_donation_date);
      const currentDate = new Date();
      const timeDiff = currentDate - lastDonationDate;
      const diffDays = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
      return diffDays > 120; // Check if the last donation is older than 120 days
    });

    // Step 3: Insert notifications for filtered users
    for (const user of filteredUsers) {
      await insertNotification(user.id);
    }

    setLoading(false);
    alert('Notifications sent to users who have not donated in the past 120 days.');
  };

  // Step 4: Insert a notification for the user
  const insertNotification = async (userId) => {
    const { error } = await supabase
      .from('notifications')
      .insert([{ user_id: userId, blood_type: bloodGroup, message }]);

    if (error) {
      console.error('Error inserting notification:', error);
      alert('Failed to send notification.');
    } else {
      console.log('Notification sent to user:', userId);
    }
  };

  return (
    <div className="flex items-center justify-center w-full mx-4">
      <div className="w-5/6">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-4">Send Blood Group Notification</h2>
        <form onSubmit={handleSubmit} className="p-4 bg-white border-2 border-red-500 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter the message to send with the notification"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
