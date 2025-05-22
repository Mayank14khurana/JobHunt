import React, { useState } from 'react';
import NavbarTemp from '../NavbarTemp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/slices/companySlice';

const Createcompany = () => {
    const navigate=useNavigate();
    const [companyName,setCompanyName]=useState('');
    const dispatch=useDispatch();
    const registerNewCompany=async ()=>{
         try{
               const res=await fetch('https://jobhunt-backend-hfqi.onrender.com/api/v1/company/register',{
                method:"POST",
                body:JSON.stringify({companyName}), 
                headers: {
                  'Content-Type': 'application/json' // Add this line
              },
                credentials:'include'
               })
               const data= await res.json();
               if(res.ok){
                dispatch(setSingleCompany(data?.company))
                toast.success("Company Registered Successfully")
                const id=data?.company?._id;
                navigate(`/admin/companies/${id}`)
               }
         }catch(err){
            console.log(err);
         }
    }
  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarTemp />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 my-10">
        <div className="mb-6">
          <h1 className="font-bold text-2xl text-gray-800">Company Name</h1>
          <p className="text-gray-600">Enter Company Name. You can change it later on.</p>
        </div>
        <label htmlFor="company" className="block text-gray-700 mb-1">Company Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="JobHunt, Microsoft, etc."
          name="company" onChange={(e)=>setCompanyName(e.target.value)} value={companyName}
        />
        <div className="flex items-center gap-4 mt-6">
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition" onClick={()=>navigate('/admin/companies')}>Cancel</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition" onClick={registerNewCompany}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Createcompany;
