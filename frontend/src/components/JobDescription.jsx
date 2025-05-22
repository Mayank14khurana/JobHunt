import React,{useEffect, useState} from 'react';
import NavbarTemp from './NavbarTemp';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/slices/jobSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDescription = () => {
    
    const dispatch=useDispatch();
    const params=useParams();
    const {user}=useSelector(store=>store.auth)
    const {singleJob}=useSelector(store=>store.job);
    const jobId=params.id
    const isInitiallyApplied = singleJob?.applications?.some(app=>app.applicant===user?._id)||false;
    const [isApplied,setIsApplied]=useState(isInitiallyApplied);
    const applyJobHandler= async ()=>{
           try{
            const res=await fetch(`https://jobhunt-backend-hfqi.onrender.com/api/v1/application/apply/${jobId}`,
                {
                    method:"GET",
                    credentials:"include"
                }
            )
            if(res.ok){
              setIsApplied(true);
            const updateSingleJOb={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
            dispatch(setSingleJob(updateSingleJOb))
              toast.success('Applied Successfully');
            }
        }catch(err){
        console.log(err);
        toast.error("Failed to apply for Job");
        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await fetch(`https://jobhunt-backend-hfqi.onrender.com/api/v1/jobs/get/${jobId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' // Include credentials (cookies) with the request
                });

                if (res.ok) {
                    const data = await res.json();
                    dispatch(setSingleJob(data.job)); // Ensure data.jobs is the correct path
                    setIsApplied(data?.job?.applications.some(appl=>appli.applicant===user?._id))
                } else {
                    console.error('Failed to fetch jobs:', res.statusText);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchSingleJob();
    }, [jobId,dispatch,user?._id]); 
    return (
        <div>
            <NavbarTemp/>
        <div className='max-w-7xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg'>
            <div className='pb-4 flex justify-between mt-1'>
                <div><h1 className='font-bold text-2xl text-gray-800 text-left'>{singleJob?.title}</h1>
                <div className="flex space-x-2 mt-2 text-sm">
                    <span className="text-blue-700 font-bold bg-transparent border border-blue-700 px-2 py-1 rounded-md">{singleJob?.position} Positions</span>
                    <span className="text-[#f83002] font-bold bg-transparent border border-[#f83002] px-2 py-1 rounded-md">{singleJob?.jobType}</span>
                    <span className="text-[#7209b7] font-bold bg-transparent border border-[#7209b7] px-2 py-1 rounded-md">{singleJob?.salary} LPA</span>
                </div></div>
                
                <button   onClick={ isApplied?null: applyJobHandler} className={`text-white  px-2  rounded-xl transition duration-300   ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                {isApplied ? 'Already Applied' : 'Apply Now'}
            </button>
            </div>
            
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4 text-left text-lg'>Job Description</h1>
            <div className='mt-4 text-left'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
                <h1 className='font-bold my-1'>Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split('T')[0]}</span></h1>
            </div>
        </div>
        </div>
    );
}

export default JobDescription;
