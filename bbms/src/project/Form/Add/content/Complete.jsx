import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Complete() {
  const navigate = useNavigate();
  return (
    <div className='container md:mt-10'>
      <div className='flex flex-col items-center'>
        <div className='mt-3 text-xl font-semibold text-red-500 uppercase'> Congratulations!</div>
        <div className='mt-3 text-xl font-semibold text-gray-500'>
          New User Added Succussfully 
        </div>
  
        <button onClick={()=>navigate('/user')} className='h-10 px-5 text-red-600 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-red-500 hover:text-red-100'>Close</button>
        
       
        
      </div>
    </div>
  )
}
