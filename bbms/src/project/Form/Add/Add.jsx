import React, { useState } from 'react'
import { StepperContext } from './context/StepperContext';
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import Personal from "./content/Personal";
import Health from "./content/Health";
import Complete from "./content/Complete";


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
  
  const handleClick =(direction)=>{
    let newStep = currentStep;
    
    direction==="next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }
  
  return (

    <div className='w-1/2 pb-2 mx-auto bg-white shadow-xl rounded-2xl'>
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
