import { Badge } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const LatestJobsCards = ({job}) => {
  const navigate=useNavigate();
  return (
    <div  onClick={()=>navigate(`/description/${job._id}`)} className='text-start p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'   >
        <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>    
        </div>
        <div>
        <h1 className='font-bold text-lg my-2'> {job.title}</h1>
        <p className='text-sm text-gray-600'> {job.description}</p>
        </div>
        <div class="flex space-x-2 mt-4">
    <span class="text-blue-700 font-bold bg-transparent border  px-2 py-1 rounded-md">{job?.position} Positions</span>
    <span class="text-[#f83002] font-bold bg-transparent border  px-2 py-1 rounded-md">{job?.jobType}</span>
    <span class="text-[#7209b7] font-bold bg-transparent border  px-2 py-1 rounded-md">{job?.salary} LPA</span>
</div>
    
    </div>
  )
}

export default LatestJobsCards
