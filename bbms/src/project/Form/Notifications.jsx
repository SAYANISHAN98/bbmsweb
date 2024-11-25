import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch notifications with related donor names and status
        const { data: notificationsData, error } = await supabase
          .from('notifications')
          .select('id, blood_type, created_at, status, profiles(f_name)'); // Include 'status'

        if (error) {
          console.error('Error fetching notifications:', error);
        } else {
          setNotifications(notificationsData);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-5/6">
        <div className="py-4">
          <h2 className="text-2xl font-bold text-center text-red-500 mb-4">Notifications</h2>

          {/* Button to navigate to form page */}
          <button
            onClick={() => navigate('/sendbloodrequest')}
            className="px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 mb-4"
          >
            Add New Blood Request
          </button>
        </div>

        {/* Notifications Table */}
        <div className="py-8 overflow-auto max-h-96">
          <table className="w-full p-3 border-2 border-red-500 shadow-2xl">
            <thead className="bg-red-100 border-b-2 border-gray-500">
              <tr className="py-3 font-semibold tracking-wide text-center text-medium">
                <th className="px-4 py-2">Blood Group</th>
                <th className="px-4 py-2">Donor Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th> {/* New column for status */}
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id} className="border-b border-gray-300">
                  <td className="px-4 py-2 text-center">{notification.blood_type}</td> {/* Blood group */}
                  <td className="px-4 py-2 text-center">
                    {notification.profiles?.f_name || 'Unknown'} {/* Donor name */}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(notification.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {notification.status || 'Pending'} {/* Display status */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
