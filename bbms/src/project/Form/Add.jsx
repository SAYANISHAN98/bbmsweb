import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';


export default function Add() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    Fname: '',
    Lname: '',
    nicNo: '',
    dob: '',
    Uemail: '',
    Ucontactno: '',
    UhomeNo: '',
    Ustreet: '',
    Ucity: '',
    Udistrict: '',
    Uprovince: '',
    Urole: '',
    Uage: '',
    Ugender: '',
    Btype: '',
    lastdonationdate: ''
    
  });
  const formattedUserData = {
    ...userData,
    dob: userData.dob || null,  // Send null if dob is empty
    lastdonationdate: userData.lastdonationdate || null  // Send null if last donation date is empty
  };

  const insertDonor = async (email) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          f_name: formattedUserData.Fname,
          l_name: formattedUserData.Lname,
          dob: formattedUserData.dob,
          nic: formattedUserData.nicNo,
          email: formattedUserData.Uemail,
          home_no: formattedUserData.UhomeNo,
          blood_type: formattedUserData.Btype,
          last_donation_date: formattedUserData.lastdonationdate,
          contact_number: formattedUserData.Ucontactno,
          street: formattedUserData.Ustreet,
          city: formattedUserData.Ucity,
          district: formattedUserData.Udistrict,
          province: formattedUserData.Uprovince,
          role: formattedUserData.Urole,
          
          
        });

      if (error) throw error;
      console.log("Donor details inserted successfully");
      navigate(`/ViewDetail/${id}`);
    } catch (error) {
      console.error("Error inserting donor details:", error.message);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: userData.Uemail,
        password: 'halo96',
        options: {
          data: {
            f_name: formattedUserData.Fname,
            l_name: formattedUserData.Lname,
            dob: formattedUserData.dob,
            nic: formattedUserData.nicNo,
            contact_number: formattedUserData.Ucontactno,
            email: formattedUserData.Uemail,
            home_no: formattedUserData.UhomeNo,
            street: formattedUserData.Ustreet,
            city: formattedUserData.Ucity,
            district : formattedUserData.Udistrict,
            province: formattedUserData.Uprovince,
            role: formattedUserData.Urole,
            gender: formattedUserData.Ugender,
            blood_type: formattedUserData.Btype,
            last_donation_date: formattedUserData.lastdonationdate
            //location: formattedUserData.Location
          }
        }
      });

      if (error) throw error;

      console.log("User created:", user);
      
      // Call insertDonor with the email after successful signup
      await insertDonor(userData.Uemail);

    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };


  return (
    <div className='w-5/6 pb-2 mx-auto bg-white shadow-xl rounded-2xl '>
      <div className='container p-6 mt-5 horizontal'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Add New Donor </h2>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                First Name :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Fname}
                  name='Fname'
                  placeholder='First name'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Last Name :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Lname}
                  name='Lname'
                  placeholder='Last name'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                NIC NO :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.nicNo}
                  name='nicNo'
                  placeholder='NIC number'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Date of Birth :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  type='date'
                  value={userData.dob}
                  name='dob'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Email :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Uemail}
                  name='Uemail'
                  placeholder='User email'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Contact Number :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Ucontactno}
                  name='Ucontactno'
                  placeholder='User contact No'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Home No :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.UhomeNo}
                  name='UhomeNo'
                  placeholder='Home number'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Street :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Ustreet}
                  name='Ustreet'
                  placeholder='Street'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                City :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Ucity}
                  name='Ucity'
                  placeholder='City'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                District :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Udistrict}
                  name='Udistrict'
                  placeholder='District'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Province :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Uprovince}
                  name='Uprovince'
                  placeholder='Province'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                User Role :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <select
                  name='Urole'
                  value={userData.Urole}
                  onChange={handleChange}
                  className='w-full p-1 px-2 text-gray-800 outline-none'
                  required
                >
                  <option value="role">-Select A Role -</option>
                  <option value="Doner">Doner</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </div>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Age :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Uage}
                  name='Uage'
                  type='number'
                  placeholder='User Age'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Gender :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <select
                  name='Ugender'
                  value={userData.Ugender}
                  onChange={handleChange}
                  className='w-full p-1 px-2 text-gray-800 outline-none'
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Blood Type :
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <select
                  name='Btype'
                  value={userData.Btype}
                  onChange={handleChange}
                  className='w-full p-1 px-2 text-gray-800 outline-none'
                  required
                >
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


            <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Last Donation Date :
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='date'
              onChange={handleSubmit}
              value={userData.lastdonationdate}
              name='lastdonationdate'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
              //required
            />
          </div>
        </div>
      </div>

      
          

          <div className='flex justify-center pt-5'>
            <button
              type='submit'
              className='px-6 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 rounded-lg cursor-pointer hover:bg-slate-700 hover:text-white'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
