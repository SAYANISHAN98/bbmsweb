import React, { useState } from 'react'
import { StepperContext } from './context/StepperContext';
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import Personal from "./content/Personal";
import Health from "./content/Health";
import Complete from "./content/Complete";
import { supabase } from '../../../lib/supabase';



export default function Add() {
  const [currentStep,setCurrentStep]=useState(1);
  const[userData,setUserData]=useState('');
  const[finalData,setFinalData]=useState([]);
  const steps=[
    "Personal Information",
    "Health Information",
    "Complete"
  ];

  const displayStep=(step)=>{
    switch(step){
      case 1:
        return <Personal/>
        case 2:
        return <Health/>
        case 3:
        return <Complete/>
        default:
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;

    if (direction === "next") newStep++;
    else if (direction === "back") newStep--;
    else if (direction === "confirm") {
      newStep++;
      handleSubmit();
    }
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const handleSubmit = async () => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email: userData['Uemail'] ,
        password: "halo96",
        options: {
           data: {
            f_name: userData['Fname'] ?? "",
            l_name: userData['Lname'] ?? "",
            dob: userData['dob'] ?? "",
            nic: userData['nic'] ?? "",

            contact_number: userData['Ucontactno'] ?? "",
            house_no: userData['UhomeNo'] ?? "",
            street: userData['Ustreet'] ?? "",
            city: userData['Ucity'] ?? "",
            district: userData['Udistrict'] ?? "",
            province: userData['Uprovince'] ?? "",
            role: userData['Urole'] ?? "",
            age: userData['Uage'] ?? "",
            gender: userData['Ugender'] ?? "",
            last_donation_date:"",
            location:"",
            




          }
        }
      });

      if (error) {
        alert(`Error: ${error.message}`);
      } else {
      
   
        alert('Sign-up successful. Please check your email for verification.');
      }
    } catch (error) {
      console.error('Error signing up user', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
   

    <div className='w-4/5 pb-2 mx-auto bg-white shadow-xl rounded-2xl '>
      <div className='container mt-5 horizontal'>
      <Stepper steps={steps}
      currentStep={currentStep}/>

      <div className='p-8 my-5'>
        <StepperContext.Provider value={{
          userData,
          setUserData,
          finalData,
          setFinalData
          
        }}>
          {displayStep(currentStep)}
        </StepperContext.Provider>
      </div>
      
      </div>
    

     
      
      {currentStep!==steps.length &&
      <StepperControl
      handleClick={handleClick}
      currentStep={currentStep}
      steps={steps}
      />
      }

  </div>
 

  )
}
