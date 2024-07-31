import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Finddoner() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const users = [
    { id: 1, Uname: 'Alice', Btype: 'A+', lastdonationdate: '2024-01-01' },
    { id: 2, Uname: 'Bob', Btype: 'B+', lastdonationdate: '2024-02-01' },
    // Add more users here
  ];

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleRequestAll = () => {
    // Handle the logic for requesting all selected donors here
    console.log('Requesting all:', selectedRows);
    navigate('/request-all');
  };

  return (
    <div className='flex flex-col items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
      <div className='w-4/5'>
        {selectedRows.length > 0 && (
          <div className="flex justify-end mt-8">
            <button
              onClick={handleRequestAll}
              className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
            >
              Request All
            </button>
          </div>
        )}
        <div className='py-8'>
          <table className='w-full p-3 border-2 border-red-500 shadow-2xl'>
            <thead className='bg-red-100 border-b-2 border-gray-500'>
              <tr className='py-3 font-semibold tracking-wide text-center text-medium'>
                <th className='px-2 py-2'>Select</th>
                <th className='px-2 py-2'>No</th>
                <th className='px-2 py-2'>Name</th>
                <th className='px-2 py-2'>Blood Type</th>
                <th className='px-2 py-2'>Last Donation Date</th>
                <th className='px-2 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className='font-semibold tracking-wide text-center text-medium'>
                  <td className='px-2 py-2'>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </td>
                  <td className='px-2 py-2'>{index + 1}</td>
                  <td className='px-2 py-2'>{user.Uname}</td>
                  <td className='px-2 py-2'>{user.Btype}</td>
                  <td className='px-2 py-2'>{user.lastdonationdate}</td>
                  <td className='px-2 py-2 space-x-2'>
                    <button
                      onClick={() => navigate(`/request/${user.id}`)}
                      className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg"
                    >
                      Request
                    </button>
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
