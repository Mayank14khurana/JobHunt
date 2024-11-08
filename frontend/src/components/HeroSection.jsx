import { setSearchedQuery } from '@/redux/slices/jobSlice';
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
   const [query,setQuery]=useState('');
   const searchHandler = ()=>{
        dispatch(setSearchedQuery(query));
        navigate('/browse');
   }
  return (
    <div className='mt-4  '>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        </div>
        <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto '>
            <input type="text" placeholder='Find Your Dream Job!' className='outline-none border-none w-full' onChange={(e)=>{
              setQuery(e.target.value)
            }}
            /> 
            <button onClick={searchHandler}  className='rounded-r-full bg-[#6A38C2] h-10 w-7  '>
                <Search className='h-5 w-5 text-white '/>
            </button>
        </div>
    </div>
  )
}

export default HeroSection
