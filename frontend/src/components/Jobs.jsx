import React, { useEffect, useState } from 'react'
import NavbarTemp from './NavbarTemp'
import FilterCards from './FilterCards'
import Job from './Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
  const {allJobs ,searchedQuery} =useSelector(store=>store.job);
  const [filterJobs,setFilterJobs]=useState(allJobs);
   useEffect(()=>{
    if(searchedQuery){

      const filteredJobs= allJobs.filter((job)=>{
        return      job?.title?.toLowerCase().includes(searchedQuery.toLowerCase())||
             job?.description?.toLowerCase().includes(searchedQuery.toLowerCase())||
              job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) 
      }
      )

      setFilterJobs(filteredJobs);
    }
    if(!searchedQuery) {
     setFilterJobs(allJobs);
    }
   },[searchedQuery])
  return (
    <div className='text-start'>
      <NavbarTemp/>
      <div className='max-w-7xl mt-5 mx-auto'>
        <div className='flex gap-5'>
            <div className='w-[20%]'>
               <FilterCards/>            
            </div>
   
      {
        filterJobs.length<=0 ? <span>Job not found</span>:(
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'> 
             <div className='grid grid-cols-3 gap-4'>
           {
             filterJobs.map((job)=>(<div key={job?._id}> <Job job={job} /> </div>) )
           }
             </div>
            </div>
        )
       
      }
        </div>
   
      </div>
      
    </div>
  )
}

export default Jobs
