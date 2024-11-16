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
          firstName: profileData.first_name,
          lastName: profileData.last_name,
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

      

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Update;
