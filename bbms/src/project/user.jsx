import React, { useEffect, useState } from 'react';

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/users'); // Adjust the endpoint as needed
      const data = await response.json();
      setUsers(data.slice(0, 10)); // Limit to 10 users
    };

    fetchData();
  }, []);

  const handleView = (userId) => {
    // Implement your view logic here (e.g., redirect to a detail page)
    console.log(`Viewing user with ID: ${userId}`);
    // Example: window.location.href = `/user/${userId}`;
  };

  return (
    <div className='flex items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
      <div className='w-4/5'>
        <div className="flex items-center justify-center py-8">
          <a href='/Add'>
            <button className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 rounded-xl text-lg">
              Add
            </button>
          </a>
        </div>

        <div className='py-8'>
          <table className='w-full p-3 border-2 border-red-500 shadow-2xl'>
            <thead className='bg-red-100 border-b-2 border-gray-500'>
              <tr className='py-3 font-semibold tracking-wide text-center text-medium'>
                <th className='px-2 py-2'>No</th>
                <th className='px-2 py-2'>Name</th>
                <th className='px-2 py-2'>Email</th>
                <th className='px-2 py-2'>Contact Number</th>
                <th className='px-2 py-2'>Blood Type</th>
                <th className='px-2 py-2'>Last Donation Date</th>
                <th className='px-2 py-2'>Action</th>
              </tr>
            </thead>
         
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className='font-semibold tracking-wide text-center text-medium'>
                  <td className='px-2 py-2'>{index + 1}</td>
                  <td className='px-2 py-2'>{user.Uname}</td>
                  <td className='px-2 py-2'>{user.Uemail}</td>
                  <td className='px-2 py-2'>{user.Ucontactno}</td>
                  <td className='px-2 py-2'>{user.Btype}</td>
                  <td className='px-2 py-2'>{user.lastdonationdate}</td>
                  <td className='px-2 py-2'>
                  <a href='/ViewDetail'>
                    <button 
                      className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-6 rounded-xl text-lg"
                      onClick={() => handleView(user.id)}
                    >
                      View
                    </button>
                    </a>
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
