import { setAllAppliedJobs } from '@/redux/slices/jobSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
     const dispatch=useDispatch()
     useEffect(()=>{
         const fetchAllAppliedJobs=async ()=>{
          try{
                const res =await fetch(`https://jobhunt-backend-hfqi.onrender.com/api/v1/application/get`,{
                    method:"GET",
                    credentials:'include'
                })
                if(res.ok){
                    const data=await res.json();
                    dispatch(setAllAppliedJobs(data.application));
                }
          }catch(err){
               console.log(err)
          }
         }
         fetchAllAppliedJobs();
     },[])
}

export default useGetAppliedJobs
