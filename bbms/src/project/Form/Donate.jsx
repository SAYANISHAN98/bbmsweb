import React from 'react'

export default function Add() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("");
      };
      return (
        <div className='w-5/6 pb-2 mx-auto bg-white shadow-xl rounded-2xl '>
        <div className='container p-6 mt-5 horizontal'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <h2 className="mb-3 text-2xl font-bold text-center text-red-500"> Donor </h2>

        <div className='flex-1 w-full mx-2'>
        <div className='h-6 text-xs font-bold leading-8 text-gray-600 uppercase'> 
          UserName :
        </div>
        <div className='flex my-2 bg-white border border-gray-200 rounded'>
          <input
            
            value={""}
            name='Uname'
            placeholder='User name'
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
      </div>
      
      <div className='flex w-full mx-2'>
        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Email :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              
              value={ ""}
              name='Uemail'
              placeholder='User email'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>

        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Contact_number :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
             
              value={""}
              name='Ucontactno'
              placeholder='User contact No'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
      </div>

      <div className='flex w-full mx-2'>
        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Home No :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              
              value={""}
              name='UhomeNo'
              placeholder='Home number'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Street :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
            
              value={""}
              name='Ustreet'
              placeholder='Street'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            City :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
             
              value={""}
              name='Ucity'
              placeholder='City'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
      </div>

      <div className='flex w-full mx-2'>
        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            District :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
            
              value={""}
              name='Udistrict'
              placeholder='District'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Province :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              
              value={""}
              name='Uprovince'
              placeholder='Province'
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>
      </div>

      <div className='flex w-full mx-2'>
        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            User Role :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <select
              name='Urole'
              value={""}
              
              className='w-full p-1 px-2 text-gray-800 outline-none'
            >
              <option value="Admin">Admin</option>
              <option value="Doner">Doner</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>

        <div className='flex-1 mr-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Age :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <input
              
              value={""}
              name='Uage'
              placeholder=''
              type='number'
              min='18'
              max="60"
              className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
            />
          </div>
        </div>

        <div className='flex-1 ml-2'>
          <div className='h-6 mt-1 text-xs font-bold leading-8 text-gray-600 uppercase'>
            Gender :
          </div>
          <div className='flex my-2 bg-white border border-gray-200 rounded'>
            <select
              name='Ugender'
              value={""}
             
              className='w-full p-1 px-2 text-gray-800 outline-none'
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
         
    
        
      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Blood Type:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <select
              name='Btype'
              value={""}
              onChange={""}
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
              onChange={""}
              value={""}
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
              value={""}
              onChange={""}
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
              value={""}
              onChange={""}
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
              value={""}
              onChange={""}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
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
            value={""}
            onChange={""}
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
              onChange={""}
              value={""}
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
              value={""}
              onChange={""}
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
              value={""}
              onChange={""}
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
              value={""}
              onChange={""}
              className='w-full p-1 px-2 text-gray-800 outline-none'
            />
          </div>
        </div>
      </div>

    { /* <div className='flex-1 w-full mx-2'>
        <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
          Health History:
        </div>
        <div className='flex bg-white border border-gray-200 rounded'>
          <textarea
            onChange={""}
            value={userData["Hhitory"] || ""}
            name='Hhitory'
            placeholder='Health history...'
            className='w-full p-1 px-2 text-gray-800 outline-none appearance-none'
          />
        </div>
      </div> */}

      <div className='flex flex-1 w-full mx-2 space-x-4'>
        <div className='w-1/2'>
          <div className='h-6 text-xs font-bold leading-8 text-gray-500 uppercase'>
            Diseases:
          </div>
          <div className='flex bg-white border border-gray-200 rounded'>
            <select
              name='Diseases'
              value={""}
              onChange={""}
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
              value={""}
              onChange={""}
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

    
          <div className='flex justify-center pt-5'>
            <button  type='submit' className='px-4 py-2 font-semibold text-white uppercase transition duration-200 ease-in-out bg-red-500 cursor-pointer hover:bg-slate-700 hover:text-white rounded-xl'>
              Submit
            </button>
          </div>
        </form>
        </div>
        </div>
        
      );
    };
