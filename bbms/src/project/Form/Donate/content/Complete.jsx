import React from 'react'

export default function Complete() {
  return (
    <div className='container md:mt-10'>
      <div className='flex flex-col items-center'>
        <div className='mt-3 text-xl font-semibold text-red-500 uppercase'> Congratulations!</div>
        <div className='mt-3 text-xl font-semibold text-gray-500'>
          User Updated Succussfully 
        </div>
        <a className='mt-10' href='/Layout/User'>
        <button className='h-10 px-5 text-red-600 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-red-500 hover:text-red-100'>Close</button>
        
        </a>
        
      </div>
    </div>
  )
}
