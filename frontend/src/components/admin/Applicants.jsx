import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import NavbarTemp from '../NavbarTemp'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/slices/applicationSlice';

const Applicants = () => { 

    const dispatch =useDispatch();
    const navigate=useNavigate();
    const params=useParams();
    const {applicants}=useSelector(store=>store.application);
    useEffect(()=>{
    const fetchAllApplicants= async ()=>{
        try{
        const res=await fetch(`http://localhost:4000/api/v1/application/${params.id}/applicants`,{
            method:"GET",
            credentials:'include'
        })
        const data=await res.json();
        if(res.ok){
            toast.success("Applicants fetched successfully");
             dispatch(setAllApplicants(data.job));
        }
        }catch(err){
            console.log(err);
        }
    }    
    fetchAllApplicants();
    },[])

  return (
    <div>
       <NavbarTemp/>
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applications {applicants?.applications?.length}</h1>
       <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants
