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
   
  });

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
          homeNumber: profileData.home_no,
          street: profileData.street,
          city: profileData.city,
          district: profileData.district,
          province: profileData.province,
          userRole: profileData.role,
          gender: profileData.gender,
          bloodType: profileData.blood_type,
          lastDonationDate: profileData.last_donation_date,
        }));

              
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

    

    if (profileError ) {
      console.error('Error updating data:', profileError );
    } else {
      console.log('Data updated successfully');
      navigate(`/ViewDetail/${id}`);
    }
  };

  return (
    <div className='w-5/6 pb-2 mx-auto bg-white shadow-xl rounded-2xl'>
      <div className='container p-6 mt-5 horizontal'>
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
    <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Update Donor</h2>

  <div className='flex w-full mx-2'> 
    <div className='flex-1 mr-2'>
      <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'>
      <label>First Name</label>
        </div>
        
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
        </div>
    </div>

     <div className='flex-1 ml-2'>
     <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Last Name</label></div>
     <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
      </div>
    </div> 
    </div>
    
    <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'> <label>NIC Number</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
       
        <input
          type="text"
          name="nicNo"
          value={formData.nicNo}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Date of Birth</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
       </div>
          </div>
        </div>

        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'> <label>Email</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
       
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Contact Number</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
         </div>
          </div>
        </div>

        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Home Number</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="homeNumber"
          value={formData.homeNumber}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Street</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>City</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
        />
            </div>
          </div>
        </div>

        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>District</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'> <label>Province</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
       
        <input
          type="text"
          name="province"
          value={formData.province}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
         </div>
          </div>
        </div>

      

      

        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Gender</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none '
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Blood Type</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Last Donation Date</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="date"
          name="lastDonationDate"
          value={formData.lastDonationDate}
          onChange={handleChange}
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
        />
         </div>
          </div>
        </div>

      

        <div className='w-full text-center'>
          <button type='submit' className='px-6 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 rounded-lg cursor-pointer hover:bg-slate-700 hover:text-white'>
            Update Donor
          </button>
        </div>
    </form>
    </div>
    </div>
  );
};

export default Update;
