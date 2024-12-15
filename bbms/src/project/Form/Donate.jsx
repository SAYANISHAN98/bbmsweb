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
        .select('*')
        .eq('status', 'active'); // Adjust the column and value based on your schema


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
        date: formattedformData.Date,
      });
      

      const { error: donationError } = await supabase
            .from('donor_donations')
            .insert({
                donor_id: id,
                date: formattedformData.Date,
                bottle_id: formattedformData.BottleID,
                collected_by: formattedformData.collectedby,
                no_of_bottles: formattedformData.NoOfBottles,
                test_id,
                camp_id: formattedformData.Location // Ensure Location is a valid UUID
            });

            console.log(id);
    if (profileError || medicalError || donationError) {
      console.log(id);
      console.error('Error updating data:', profileError || medicalError || donationError);
    } else {
      console.log('Data updated successfully');
      navigate(`/donordonations`);
    }
  };

  return (
    <div className='w-5/6 pb-2 mx-auto bg-white shadow-xl rounded-2xl'>
      <div className='container p-6 mt-5'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <h2 className="mb-3 text-2xl font-bold text-center text-red-500">Donate</h2>
         
          <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'><label>First Name</label></div>
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
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'><label>NIC Number</label></div>
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
            <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'> <label>Date of Birth</label></div>
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
          type="email"
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
          type="tel"
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
          type="tel"
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
           required
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
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Province</label></div>
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
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Role</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="userRole"
          value={formData.userRole}
          onChange={handleChange}
           className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
           required
        />
      </div>
      </div>

      

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
        </div>

        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
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

      <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Date</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
       
        <input
          type="date"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
           className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
           required
        />
      </div>
          </div>
        </div>
        
        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Blood Pressure</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="blood_pressure"
          value={formData.blood_pressure}
          onChange={handleChange}
           className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
           required
        />
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Sugar Level</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="sugarLevel"
          value={formData.sugarLevel}
          onChange={handleChange}
           className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
           required
        />
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Hemoglobin Level</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
              
        
        <input
          type="text"
          name="hb_level"
          value={formData.hb_level}
          onChange={handleChange}
           className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
           required
        />
      </div>
          </div>
        </div>

        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Diseases</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        
        <input
          type="text"
          name="diseases"
          value={formData.diseases}
          onChange={handleChange}
           className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
           required
        />
      </div>
      </div>

      <div className='flex-1 ml-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Visible Marks</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
              
        
            <input
          type="text"
          name="visibleMarks"
          value={formData.visibleMarks}
          onChange={handleChange}
           className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
           required
        />
            </div>
          </div>
        </div>

        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><lable>Bottle Id </lable></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
            type='text'
            name='BottleID'
            value={formattedformData.BottleID}
            onChange={handleChange}
             className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
             required
          />
       
      </div>
      </div>

      <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><label>Number of bottles</label></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        <input
          type='number'
          min='0'
          name='NoOfBottles'
          value={formattedformData.NoOfBottles}
          onChange={handleChange}
           className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
           required
        />
       </div>
          </div>
        </div>

        <div className='flex w-full mx-2'>
          <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'><lable>Collected By</lable></div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
        <input
          type='text'
          onChange={handleChange}
          value={formattedformData.collectedby}
          name='collectedby'
          className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          required
        />
        </div>
        </div>

        <div className='flex-1 mr-2'>
            <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>Location</div>
            <div className='flex my-2 bg-white border border-gray-200 rounded'>
      
            <select
              name='Location'
              value={formattedformData.Location}
              onChange={handleChange}
               className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
               required
            >
              <option value="">Select a Camp</option>
              {campNames.map((camp, index) => (
                <option key={index} value={camp.id}>{camp.name}</option>
                
              ))
              
              
              }
            </select>
      
            </div>
          </div>
        </div>

      

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
};

export default Update;
