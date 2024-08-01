import React, { useEffect, useRef, useState } from 'react'



const  Stepper=({steps,currentStep})=> {
  const[newStep,setNewStep]=useState([]);
  const stepRef=useRef();
  const updateStep = (stepNumber,steps)=>{
    const newSteps =[...steps]
    let count =0;
    while(count<newSteps.length){
      //currentstep
      if(count===stepNumber){
        newSteps[count]={
          ...newSteps[count],
          highlighted:true,
          selected:true,
          completed:true,
        };
        count++;
      }

      //step completed
      else if(count<stepNumber){
        newSteps[count]={
          ...newSteps[count],
          highlighted:false,
          selected:true,
          completed:true,
        };
        count++; 
      }
      // step pending
      else{
        newSteps[count]={
          ...newSteps[count],
          highlighted:false,
          selected:false,
          completed:false,
        };
        count++; 
      }
    }
    return newSteps;
  };
  useEffect(()=>{
    const stepsState =steps.map((step,index)=>
    Object.assign({},{
      description:step,
      completed:false,
      highlighted:index=== 0 ? true:false,
      selected:index=== 0 ? true:false,
    }));

    stepRef.current=stepsState;
    const current=updateStep(currentStep-1,stepRef.current);
    setNewStep(current);
    
    },[steps,currentStep]);
  
  const displaySteps=newStep.map((step,index)=>{
    return(
        <div key={index}
        className={index !==newStep.length-1 ?'flex items-center w-full':"flex items-center"}>
          
            <div className='relative flex flex-col items-center text-rose-600'>
             <div className={`flex items-center justify-center w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-gray-300 rounded-full ${step.selected ? "bg-red-600 text-white font-bold  border border-red-600" : ""}`}>
                {/* Display number*/}{step.completed ? (
                  <span className='text-xl font-bold text-white'>&#10003;</span>
                ):(index+1)}
             </div>
    
            <div className={`absolute top-0 w-32 mt-16 text-xs font-medium text-center uppercase ${step.highlighted ? "text-gray-900": "text-gray-400"}`}>
                {/* Display Description*/}{step.description}
            </div>
    
            
    
           </div>
           <div className={`flex-auto transition duration-500 ease-in-out border-t-2 ${step.completed ? "border-red-600": "border-gray-300"}`}>
                {/* Display Line*/}
            </div>
        </div>
    );
    
    
   });
  return (
    <div className='flex items-center justify-between p-2 mx-4'>
        {displaySteps}
    </div>
  )
}

export default Stepper;
