import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nicNo: '',
    dob: '',
    email: '',
    contactNumber: '',
    homeNumber: '',
    street: '',
    city: '',
    district: '',
    province: '',
    userRole: '',
    gender: '',
    bloodType: '',
    lastDonationDate: '',
    blood_pressure: '',  // Default value to avoid 'undefined'
    sugarLevel: '',       // Default value to avoid 'undefined'
    hb_level: '',         // Default value to avoid 'undefined'
    diseases: '',         // Default value to avoid 'undefined'
    visibleMarks: '',     // Default value to avoid 'undefined'
    BottleID: '',
    collectedby: '',
    NoOfBottles: '',
    Date: '',
    Location:'',
  });

  const test_id=null;

  const [ campNames,setCampNames] = useState([]);
  useEffect(() => {
    // Fetch camp names from the bloodcamp table
    const fetchCampNames = async () => {
      const { data , error } = await supabase
        .from('blood_camp')
        .select('*');

      if (error) {
        console.error('Error fetching camp names:', error.message);
      } else {
        console.log(data)
        setCampNames(data);
      }
    };

    fetchCampNames();
  }, []);

  const formattedformData = {
    ...formData,
    dob: formData.dob || null,  // Send null if dob is empty
    lastdonationdate: formData.lastdonationdate || null ,
    Date: formData.Date || null ,
     // Send null if last donation date is empty
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id); 

      if (data && data.length > 0) {
        const profileData = data[0];
        setFormData((prevData) => ({
          ...prevData,
          firstName: profileData.f_name,
          lastName: profileData.l_name,
          nicNo: profileData.nic_no,
          dob: profileData.dob,
          email: profileData.email,
          contactNumber: profileData.contact_number,
          homeNumber: profileData.home_number,
          street: profileData.street,
          city: profileData.city,
          district: profileData.district,
          province: profileData.province,
          userRole: profileData.user_role,
          gender: profileData.gender,
          bloodType: profileData.blood_type,
          lastDonationDate: profileData.last_donation_date,
        }));

        const { data: medicalData, error: medicalError } = await supabase
          .from('medical_status')
          .select('*')
          .eq('id', id);

        if (medicalData && medicalData.length > 0) {
          const medicalInfo = medicalData[0];
          setFormData((prevData) => ({
            ...prevData,
            blood_pressure: medicalInfo.blood_pressure || '',  // Ensure there's a default empty string
            sugarLevel: medicalInfo.sugar_level || '',         // Ensure there's a default empty string
            hb_level: medicalInfo.hb_level || '',               // Ensure there's a default empty string
            diseases: medicalInfo.diseases || '',               // Ensure there's a default empty string
            visibleMarks: medicalInfo.visible_marks || '',     // Ensure there's a default empty string
          }));
        }
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        f_name: formData.firstName,
        l_name: formData.lastName,
        nic_no: formData.nicNo,
        dob: formData.dob,
        email: formData.email,
        contact_number: formData.contactNumber,
        home_no: formData.homeNumber,
        street: formData.street,
        city: formData.city,
        district: formData.district,
        province: formData.province,
        role: formData.userRole,
        gender: formData.gender,
        blood_type: formData.bloodType,
        last_donation_date: formData.lastDonationDate,
      })
      .eq('id', id);

    const { error: medicalError } = await supabase
      .from('medical_status')
      .upsert({
        donor_id: id,
        blood_pressure: formData.blood_pressure,
        sugar_level: formData.sugarLevel,
        hb_level: formData.hb_level,
        diseases: formData.diseases,
        visible_marks: formData.visibleMarks,
        date: new Date().toISOString(),
      });
      

      const { error: donationError } = await supabase
            .from('donor_donations')
            .insert({
                donor_id: id,
                date: formattedformData.Date,
                bottle_id: formattedformData.bottle_id,
                collected_by: formattedformData.collectedby,
                no_of_bottles: formattedformData.no_of_bottles,
                test_id,
                camp_id: formattedformData.Location // Ensure Location is a valid UUID
            });

            console.log(id);
    if (profileError || medicalError || donationError) {
      console.log(id);
      console.error('Error updating data:', profileError || medicalError || donationError);
    } else {
      console.log('Data updated successfully');
      navigate(`/Doner`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>NIC Number</label>
        <input
          type="text"
          name="nicNo"
          value={formData.nicNo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Contact Number</label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Home Number</label>
        <input
          type="tel"
          name="homeNumber"
          value={formData.homeNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Street</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>District</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Province</label>
        <input
          type="text"
          name="province"
          value={formData.province}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Role</label>
        <input
          type="text"
          name="userRole"
          value={formData.userRole}
          onChange={handleChange}
        />
      </div>

      

      <div>
        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Blood Type</label>
        <input
          type="text"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Last Donation Date</label>
        <input
          type="date"
          name="lastDonationDate"
          value={formData.lastDonationDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Blood Pressure</label>
        <input
          type="text"
          name="blood_pressure"
          value={formData.blood_pressure}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Sugar Level</label>
        <input
          type="text"
          name="sugarLevel"
          value={formData.sugarLevel}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Hemoglobin Level</label>
        <input
          type="text"
          name="hb_level"
          value={formData.hb_level}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Diseases</label>
        <input
          type="text"
          name="diseases"
          value={formData.diseases}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Visible Marks</label>
        <select
              name='VisibleMarks'
              value={formData.visibleMarks}
              onChange={handleChange}
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

      <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Bottle ID:
        </div>
        <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type='text'
            name='BottleID'
            value={formattedformData.bottle_id}
            onChange={handleChange}
            className='w-full p-1 px-2 text-gray-800 outline-none'
          />
       
      </div>

      <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
        Number of Bottles:
      </div>
      <div className='flex bg-white border border-gray-200 rounded'>
        <input
          type='number'
          min='0'
          name='NoOfBottles'
          value={formattedformData.no_of_bottles}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none'
        />
      </div>

      <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
        Collected By:
      </div>
      <div className='flex bg-white border border-gray-200 rounded'>
        <input
          type='text'
          onChange={handleChange}
          value={formattedformData.collectedby}
          name='collectedby'
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
        />
        </div>

        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Location:
        </div>
        <div className='flex bg-white border border-gray-200 rounded'>
      
            <select
              name='Location'
              value={formattedformData.Location}
              onChange={handleChange}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            >
              <option value="">Select a Camp</option>
              {campNames.map((camp, index) => (
                <option key={index} value={camp.id}>{camp.name}</option>
                
              ))
              
              
              }
            </select>
      
        </div>

      

      <button type="submit">Donate</button>
    </form>
  );
};

export default Update;
