import React, { useEffect } from 'react'
import NavbarTemp from './NavbarTemp'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/slices/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const {allJobs}=useSelector(store=>store.job);
  const dispatch=useDispatch();
  useEffect(()=>{
    return ()=>
    {
      dispatch(setSearchedQuery(''));
    }
  },[]);
  return (
    <div>
      <NavbarTemp/>
      <div className='max-w-7xl mx-auto my-10'>
     <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
     <div className='grid grid-cols-3 gap-4 '>
 {
        allJobs.map((job)=>{
            return(
              <div key={job?._id}>
                 <Job  job={job}/>
              </div>
               
            )
        })
     }
     </div>
    
      </div>
    </div>
  )
}

export default Browse
