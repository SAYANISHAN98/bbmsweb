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
    lastdonationdate: '',
    BPtype: '',
    Sugertype: '',
    HPtype: '',
    Diseases: '',
    VisibleMarks: '',
    BottleID: '',
    collectedby: '',
    NoOfBottles: '',
    Date: '',
    Location: ''
  });
  const formattedUserData = {
    ...userData,
    dob: userData.dob || null,  // Send null if dob is empty
    lastdonationdate: userData.lastdonationdate || null  // Send null if last donation date is empty
  };

  const insertDonor = async (email) => {
    try {
      const { error } = await supabase
        .from('donors')
        .insert({
          email: email,
          blood_type: formattedUserData.Btype,
          last_donation_date: formattedUserData.lastdonationdate,
          visible_marks: formattedUserData.VisibleMarks,
          diseases: formattedUserData.Diseases,
          
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
        password: userData.password,
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
            province: formattedUserData.Uprovince,
            role: formattedUserData.Urole,
            gender: formattedUserData.Ugender,
            blood_type: formattedUserData.Btype,
            last_donation_date: formattedUserData.lastdonationdate,
            location: formattedUserData.Location
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
                First Name:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Fname}
                  name='Fname'
                  placeholder='First name'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Last Name:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Lname}
                  name='Lname'
                  placeholder='Last name'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                NIC no:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.nicNo}
                  name='nicNo'
                  placeholder='NIC number'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Date of Birth:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  type='date'
                  value={userData.dob}
                  name='dob'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Email:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Uemail}
                  name='Uemail'
                  placeholder='User email'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Contact Number:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Ucontactno}
                  name='Ucontactno'
                  placeholder='User contact No'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Home No:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.UhomeNo}
                  name='UhomeNo'
                  placeholder='Home number'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Street:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Ustreet}
                  name='Ustreet'
                  placeholder='Street'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                City:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Ucity}
                  name='Ucity'
                  placeholder='City'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                District:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Udistrict}
                  name='Udistrict'
                  placeholder='District'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
            <div className='flex-1 ml-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Province:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Uprovince}
                  name='Uprovince'
                  placeholder='Province'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                User Role:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <select
                  name='Urole'
                  value={userData.Urole}
                  onChange={handleChange}
                  className='w-full p-1 px-2 text-gray-800 outline-none'
                >
                  <option value="Admin">Admin</option>
                  <option value="Doner">Doner</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </div>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Age:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <input
                  onChange={handleChange}
                  value={userData.Uage}
                  name='Uage'
                  type='number'
                  placeholder='User Age'
                  className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
                />
              </div>
            </div>
          </div>

          <div className='flex w-full mx-2'>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Gender:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <select
                  name='Ugender'
                  value={userData.Ugender}
                  onChange={handleChange}
                  className='w-full p-1 px-2 text-gray-800 outline-none'
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className='flex-1 mr-2'>
              <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
                Blood Type:
              </div>
              <div className='flex my-2 bg-white border border-gray-200 rounded'>
                <select
                  name='Btype'
                  value={userData.Btype}
                  onChange={handleChange}
                  className='w-full p-1 px-2 text-gray-800 outline-none'
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
            Last Donation Date:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='date'
              onChange={handleSubmit}
              value={userData.lastdonationdate}
              name='lastdonationdate'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
      </div>

      {/* <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Blood Pressure:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              name='BPtype'
              value={userData.BPtype}
              onChange={handleSubmit}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>

        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Sugar Level:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              name='Sugertype'
              value={userData.Sugertype}
              onChange={handleSubmit}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>

        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Hemoglobin Level:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              name='HPtype'
              value={userData.HPtype}
              onChange={handleSubmit}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Diseases:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <select
              name='Diseases'
              value={userData.Diseases}
              onChange={handleSubmit}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            >
              <option value="">Select a disease</option>
              <option value="Heart Disease">Heart Disease</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Fits">Fits</option>
              <option value="Strokes">Strokes</option>
              <option value="Asthma">Asthma</option>
              <option value="Liver Diseases">Liver Diseases</option>
              <option value="Kidney Diseases">Kidney Diseases</option>
              <option value="Blood Disorders">Blood Disorders</option>
              <option value="Cancer">Cancer</option>
            </select>
          </div>
        </div>

        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Visible Marks:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <select
              name='VisibleMarks'
              value={userData.VisibleMarks}
              onChange={handleSubmit}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            >
              <option value="">Select a mark</option>
              <option value="A">Tatoos</option>
              <option value="B">Surgery Marks</option>
              <option value="C">Wounds</option>
              <option value="D">Injection Marks</option>
              <option value="E">Permenant Disabilities</option>
            </select>
          </div>
        </div>
      </div>

      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/2'>

        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Bottle ID:
        </div>
        <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type='text'
            name='BottleID'
            value={userData.BottleID}
            onChange={handleSubmit}
            className='w-full p-1 px-2 text-gray-800 outline-none'
          />
       
      </div>
        </div>

        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Collected By:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              onChange={handleSubmit}
              value={userData.collectedby}
              name='collectedby'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
      </div>



      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Number of Bottles:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='number'
              min='0'
              name='NoOfBottles'
              value={userData.NoOfBottles}
              onChange={handleSubmit}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>

        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Date:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='date'
              name='Date'
              value={userData.Date}
              onChange={handleSubmit}
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>

        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Location:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              name='Location'
              value={userData.Location}
              onChange={handleSubmit}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
          </div>
          </div> */}
          

          <div className='flex justify-center pt-5'>
            <button
              type='submit'
              className='px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
