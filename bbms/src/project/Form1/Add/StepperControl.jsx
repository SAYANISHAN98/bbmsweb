import React from 'react'


const StepperControl = ({handleClick,currentStep,steps}) => {
  let buttonText;
  let handler;

  if(currentStep===steps.length -1) {
    buttonText="Confirm"
    handler="confirm"

  } 
  else{
    buttonText="NEXT"
    handler="next"

  }

  return (
    <div className='container flex justify-around mb-5'>
        
    <button 
    onClick={()=>handleClick("back")}
    className={`px-4 py-2 font-semibold uppercase transition duration-200 ease-in-out bg-white border-2 cursor-pointer border-slate-300 hover:bg-slate-700 hover:text-white text-slate-400 rounded-xl ${currentStep===1 ? "opacity-50 cursor-not-allowed":""}`}>
        Back
    </button>
    <button 
    onClick={()=>handleClick(handler)}
    className='px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl'>
        {buttonText}
    </button>
    
</div>
  )
}

export default StepperControl



