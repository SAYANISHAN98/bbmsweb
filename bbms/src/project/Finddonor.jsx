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
    const [requestedRows, setRequestedRows] = useState([]); // Track requested rows
    const [rowsToShow, setRowsToShow] = useState(15); // Track number of rows to display

    const { data: donors, error, isLoading } = useDonors({ bloodGroup, donationDate, name });

    const handleCheckboxChange = (id) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(id)
                ? prevSelectedRows.filter((rowId) => rowId !== id)
                : [...prevSelectedRows, id]
        );
    };

    const handleRequestAll = () => {
        console.log('Requesting all:', selectedRows);
        selectedRows.forEach((id) => {
            if (!requestedRows.includes(id)) {
                setRequestedRows((prevRequestedRows) => [...prevRequestedRows, id]);
            }
        });
    };

    const handleRequestClick = async (id) => {
        // Check if the user has already been requested
        if (!requestedRows.includes(id)) {
            // Mark the row as requested in the state
            setRequestedRows((prevRequestedRows) => [...prevRequestedRows, id]);
    
            // Update the request_status in the 'profiles' table
            const { data, error } = await supabase
                .from('profiles') // Using the profiles table
                .update({ request_status: 'requested' }) // Setting the status to 'requested'
                .eq('id', id); // Targeting the donor by their ID
    
            if (error) {
                console.error('Error updating request status:', error.message);
            } else {
                console.log('Request status updated successfully:', data);
            }
        }
    };
    
    

    const handleViewRequest = () => {
        navigate('/viewrequest');
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Reorder donors based on requested status (requested ones go to the bottom)
    const orderedDonors = [...donors].sort((a, b) => {
        const aRequested = requestedRows.includes(a.id);
        const bRequested = requestedRows.includes(b.id);
        return aRequested && !bRequested ? 1 : !aRequested && bRequested ? -1 : 0;
    });

    // Show only the number of rows set in `rowsToShow`
    const currentRows = orderedDonors.slice(0, rowsToShow);

    const handleLoadMore = () => {
        setRowsToShow((prevRowsToShow) => prevRowsToShow + 10); // Show 10 more rows
    };

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

            {/* Buttons container: Both "Request All" and "View Request" buttons in the same div */}
            {selectedRows.length > 0 || requestedRows.length > 0 ? (
                <div className='w-4/5 flex justify-between space-x-2'>
                {/* View Request Button - fixed to the left */}
                {requestedRows.length > 0 && (
                    <button
                        onClick={handleViewRequest}
                        className='w-1/4 font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-4 rounded-xl text-lg'
                    >
                        View Request
                    </button>
                )}
            
                {/* Spacer to push the buttons to the edges */}
                <div className="flex-grow"></div>
            
                {/* Request All Button - fixed to the right */}
                {selectedRows.length > 0 && (
                    <button
                        onClick={handleRequestAll}
                        className='w-1/4 font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-4 rounded-xl text-lg'
                    >
                        Request All
                    </button>
                )}
            </div>
            
            ) : null}

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
                            {currentRows.map((donorData, index) => {
                                const isRequested = requestedRows.includes(donorData.id); // Check if the row is requested
                                return (
                                    <tr
                                        key={donorData.id}
                                        className={`font-semibold tracking-wide text-center text-medium ${isRequested ? 'bg-gray-200' : ''}`}
                                    >
                                        <td className='px-2 py-2'>
                                            <input
                                                type='checkbox'
                                                checked={selectedRows.includes(donorData.id)}
                                                onChange={() => handleCheckboxChange(donorData.id)}
                                                disabled={isRequested} // Disable checkbox if the row is requested
                                            />
                                        </td>
                                        <td className='px-2 py-2'>{index + 1}</td>
                                        <td className='px-2 py-2'>{donorData.f_name}</td>
                                        <td className='px-2 py-2'>{donorData.blood_type}</td>
                                        <td className='px-2 py-2'>{donorData.last_donation_date}</td>
                                        <td className='px-2 py-2 space-x-2'>
                                            {isRequested ? (
                                                <span className='text-green-500 font-bold'>Requested</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleRequestClick(donorData.id)}
                                                    className='font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-1 px-4 rounded-xl text-lg'
                                                >
                                                    Request
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* "More" button */}
                {rowsToShow < donors.length && (
                    <div className='w-full text-center'>
                        <button
                            onClick={handleLoadMore}
                            className='px-4 py-2 bg-gray-300 rounded-md'
                        >
                            More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
