import React, { useState } from 'react';
import { StepperContext } from './context/StepperContext';
import Stepper from './Stepper';
import StepperControl from './StepperControl';
import Personal from './content/Personal';
import Health from './content/Health';
import Complete from './content/Complete';
import { supabase } from '../../../lib/supabase';

export default function Add() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState('');
  const [finalData, setFinalData] = useState([]);
  const steps = ['Personal Information', 'Health Information', 'Complete'];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Personal />;
      case 2:
        return <Health />;
      case 3:
        return <Complete />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    if (direction === 'next') newStep++;
    else if (direction === 'back') newStep--;
    else if (direction === 'confirm') {
      newStep++;
      handleSubmit();
    }
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const signUpUser = async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: "abc@err.com",
        password: 'halo96',
      });

      if (error) {
        throw error;
      }

      const userId = data?.user?.id;
      console.log('User ID:', userId);
      return userId;

    } catch (error) {
      console.error('Error signing up user:', error);
      alert('An unexpected error occurred during sign-up. Please try again.');
      return null;
    }
  };

  const addUserProfile = async (userId, userData) => {
    try {
      const { error } = await supabase.from('profiles').insert({
        id: userId, // assuming 'id' is the foreign key in 'profiles'
        f_name: userData['Fname'] ?? '',
        l_name: userData['Lname'] ?? '',
        dob: userData['dob'] ?? '',
        nic: userData['nic'] ?? '',
        contact_number: userData['Ucontactno'] ?? '',
        house_no: userData['UhomeNo'] ?? '',
        street: userData['Ustreet'] ?? '',
        city: userData['Ucity'] ?? '',
        district: userData['Udistrict'] ?? '',
        province: userData['Uprovince'] ?? '',
        role: userData['Urole'] ?? '',
        age: userData['Uage'] ?? '',
        gender: userData['Ugender'] ?? '',
        last_donation_date: '',
        location: '',
      });

      if (error) {
        throw error;
      }

      alert('User profile created successfully.');
    } catch (error) {
      console.error('Error adding user profile:', error);
      alert('An unexpected error occurred while adding the profile. Please try again.');
    }
  };

  const handleSubmit = async () => {
    console.log("Test")
    const userId = await signUpUser(userData);

    if (userId) {
      console.log('User ID:', userId);
      await addUserProfile(userId, userData);
      alert('Sign-up and profile creation successful. Please check your email for verification.');
    }
  };

  return (
    <div className="w-4/5 pb-2 mx-auto bg-white shadow-xl rounded-2xl ">
      <div className="container mt-5 horizontal">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="p-8 my-5">
          <StepperContext.Provider value={{ userData, setUserData, finalData, setFinalData }}>
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>

      {currentStep !== steps.length && (
        <StepperControl handleClick={handleClick} currentStep={currentStep} steps={steps} />
      )}
    </div>
  );
}
