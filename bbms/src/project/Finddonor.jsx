// project/Finddonor.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDonors } from '../api/finddoner';
import { supabase } from '../lib/supabase';

export default function Finddonor() {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [bloodGroup, setBloodGroup] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const [name, setName] = useState('');

    const { data:donors, error, isLoading } = useDonors({ bloodGroup, donationDate, name });

    const handleCheckboxChange = (id) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(id)
                ? prevSelectedRows.filter((rowId) => rowId !== id)
                : [...prevSelectedRows, id]
        );
    };

    const handleRequestAll = () => {
        console.log('Requesting all:', selectedRows);
        navigate('/request_all');
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='flex flex-col items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
            <div className='w-4/5 pb-2 bg-white shadow-xl rounded-2xl'>
                <div className='flex items-center justify-between py-4 pl-6 pr-6'>
                    <div className='flex items-center space-x-2'>
                        <label className='font-semibold'>Blood Type:</label>
                        <select
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            className='px-5 py-1 border border-gray-300 rounded-lg'
                        >
                            <option value="">Select Blood Type</option>
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

                    <div className='flex items-center space-x-2'>
                        <label className='font-semibold'>Last Donation Date:</label>
                        <input
                            type='date'
                            value={donationDate}
                            onChange={(e) => setDonationDate(e.target.value)}
                            className='px-3 py-1 border border-gray-300 rounded-lg'
                        />
                    </div>

                    <div className='flex items-center space-x-2'>
                        <label className='font-semibold'>Name:</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Name'
                            className='px-3 py-1 border border-gray-300 rounded-lg'
                        />
                    </div>
                </div>
            </div>

            <div className='w-4/5'>
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
                            {donors.map((donorData, index) => (
                                <tr key={donorData.id} className='font-semibold tracking-wide text-center text-medium'>
                                    <td className='px-2 py-2'>
                                        <input
                                            type='checkbox'
                                            checked={selectedRows.includes(donorData.id)}
                                            onChange={() => handleCheckboxChange(donorData.id)}
                                        />
                                    </td>
                                    <td className='px-2 py-2'>{index + 1}</td>
                                    <td className='px-2 py-2'>{donorData.f_name}</td>
                                    <td className='px-2 py-2'>{donorData.blood_type}</td>
                                    <td className='px-2 py-2'>{donorData.last_donation_date}</td>
                                    <td className='px-2 py-2 space-x-2'>
                                        <button
                                            onClick={() => navigate(`/request/${donorData.id}`)}
                                            className='font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg'
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
