import React, { useContext } from 'react';
import { StepperContext } from '../context/StepperContext';

export default function Health() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const currentDiseases = userData["Diseases"] || [];

    if (checked) {
      setUserData({ ...userData, Diseases: [...currentDiseases, name] });
    } else {
      setUserData({ ...userData, Diseases: currentDiseases.filter(disease => disease !== name) });
    }
  };
  return (
    <div className='flex flex-col'>
      <div className='flex-1 w-full mx-2'>
        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Blood Type :
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <select
            name='Btype'
            
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

      <div className='flex-1 w-full mx-2'>
        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Last Donation Date:
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
            type='date'
          
            name='lastdonationdate'
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
      </div>

      

      <div className='flex-1 w-full mx-2'>
        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Health History:
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <textarea
            
            name='Hhitory'
            placeholder=''
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
      </div>

      <div className='flex-1 w-full mx-2'>
        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Diseases:
        </div>
        <div className='grid grid-cols-3 gap-2 p-2 my-2 bg-white border border-gray-200 rounded'>
          {["Heart Disease", "Diabetes", "Fits", "Strokes", "Asthma", "Liver Diseases", "Kidney Diseases", "Blood Disorders", "Cancer"].map(disease => (
            <label key={disease} className='flex items-center'>
              <input
                type='checkbox'
                name={disease}
                checked={userData["Diseases"]?.includes(disease) || false}
                onChange={handleChange}
                className='mr-2'
              />
              {disease}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
