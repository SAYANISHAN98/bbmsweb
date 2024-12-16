import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import CustomButton from './Custombutton';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [visibleRows, setVisibleRows] = useState(10); // Initial visible rows
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

  const loadMore = () => {
    setVisibleRows((prev) => prev + 10); // Increase visible rows by 10
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center w-full mx-4 space-y-2 lg:w-full">
      <div className="w-5/6">
        <div className="py-4">
          <h2 className="mb-4 text-3xl font-bold text-center text-red-700">Find Donor</h2>

          <CustomButton
                label="Add New Blood Request"
                onClick={() => navigate('/Notifications/sendbloodrequest')}
                color="red"
              />
        </div>

        {/* Notifications Table */}
        <div className="py-8 ">
        <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
            <thead className="">
              <tr className="">
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Blood Group</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Donor Name</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.slice(0, visibleRows).map((notification) => (
                <tr key={notification.id} className="border-b hover:bg-red-50">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{notification.blood_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    {notification.profiles?.f_name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    {new Date(notification.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    {notification.status || 'Pending'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Button to load more rows */}
          {notifications.length > visibleRows && (
            <div className="flex justify-center mt-4">
              <CustomButton
                label="More"
                onClick={loadMore}
                color="red"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
