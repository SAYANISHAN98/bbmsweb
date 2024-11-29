import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Completed() {
  
  const navigate = useNavigate();
  
  const [completes, setcomplete] = useState([
    { id: 1, hospitalName: 'Hospital A', wardNo: '101', bloodType: 'A+', quantity: '2 Units', requestDate: '2024-11-01' },
    { id: 2, hospitalName: 'Hospital B', wardNo: '102', bloodType: 'B-', quantity: '1 Unit', requestDate: '2024-11-05' },
    
  ]);

  const [visibleRows, setVisibleRows] = useState(10); 
  const loadMore = () => {
    setVisibleRows((prev) => prev + 10); 
    };



  return (

  <div className='flex items-center justify-center w-full mx-4 space-y-2 lg:w-full'>
      <div className='w-4/5'>
           <div className="flex items-center justify-center w-full py-2 space-x-0 px-30">
        <button
          onClick={() => navigate('/Request')}
          className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10  rounded-l-md"
        >
          New Request
        </button>
        <button
          onClick={() => navigate('/Ongoing')}
          className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10 "
        >
          On Going
        </button>

        <button
          onClick={() => navigate('/Completed')}
          className="font-bold text-white bg-red-500 active:scale-[.98] hover:bg-slate-700 active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-10  rounded-r-md"
        >
          Completed
        </button>
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <div className="relative w-3/5">
            <input
              type="text"
              placeholder="Search for a donor..."
              className="w-full px-4 py-2 pr-10 text-gray-700 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2" />
          </div>
        </div>

      


        <div className="py-8">
        <table className="w-full overflow-hidden bg-white border-collapse rounded-lg shadow-md">
            <thead className="">
              <tr className="">
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">No</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Hospital Name</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Ward No</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Blood Type</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase">Request Date</th>
                
              </tr>
            </thead>
            <tbody>
              {completes.slice(0, visibleRows).map((complete, index) => (
                <tr key={complete.id} className="border-b hover:bg-red-50">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{complete.hospitalName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complete.wardNo}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{complete.bloodType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complete.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complete.requestDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {completes.length > visibleRows && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMore}
                className="px-6 py-2 text-white bg-red-500 rounded-xl hover:bg-slate-700"
              >
                More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  
  );
}
