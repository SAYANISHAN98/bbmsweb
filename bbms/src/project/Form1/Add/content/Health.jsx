import React, { useContext } from 'react';
import { StepperContext } from '../context/StepperContext';

export default function Health() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Blood Type:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <select
              name='Btype'
              value={userData["Btype"] || ""}
              onChange={handleChange}
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

        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Last Donation Date:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='date'
              onChange={handleChange}
              value={userData["lastdonationdate"] || ""}
              name='lastdonationdate'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Blood Pressure:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              name='BPtype'
              value={userData["BPtype"] || ""}
              onChange={handleChange}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>

        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Sugar Level:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              name='Sugertype'
              value={userData["Sugertype"] || ""}
              onChange={handleChange}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>

        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Hemoglobin Level:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              name='HPtype'
              value={userData["HPtype"] || ""}
              onChange={handleChange}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Diseases:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <select
              name='Diseases'
              value={userData["Diseases"] || ""}
              onChange={handleChange}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            >
              <option value="">Select a disease</option>
              <option value="Heart Disease">Heart Disease</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Fits">Fits</option>
              <option value="Strokes">Strokes</option>
              <option value="Asthma">Asthma</option>
              <option value="Liver Diseases">Liver Diseases</option>
              <option value="Kidney Diseases">Kidney Diseases</option>
              <option value="Blood Disorders">Blood Disorders</option>
              <option value="Cancer">Cancer</option>
            </select>
          </div>
        </div>

        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Visible Marks:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <select
              name='VisibleMarks'
              value={userData["VisibleMarks"] || ""}
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
        </div>
      </div>

      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/2'>

        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Bottle ID:
        </div>
        <div className='flex bg-white border border-gray-200 rounded'>
          <input
            type='text'
            name='BottleID'
            value={userData["BottleID"] || ""}
            onChange={handleChange}
            className='w-full p-1 px-2 text-gray-800 outline-none'
          />
       
      </div>
        </div>

        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Collected By:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              onChange={handleChange}
              value={userData["collectedby"] || ""}
              name='collectedby'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
      </div>



      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Number of Bottles:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='number'
              min='0'
              name='NoOfBottles'
              value={userData["NoOfBottles"] || ""}
              onChange={handleChange}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>

        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Date:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='date'
              name='Date'
              value={userData["Date"] || ""}
              onChange={handleChange}
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>

        <div className='w-1/3'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Location:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <input
              type='text'
              name='Location'
              value={userData["Location"] || ""}
              onChange={handleChange}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>
      </div>

    
    </div>
  );
}
