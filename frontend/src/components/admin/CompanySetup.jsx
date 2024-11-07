import React, { useEffect, useState } from 'react';
import NavbarTemp from '../NavbarTemp';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import getCompanyById from '@/hooks/getCompanyById';

const CompanySetup = () => {
    const params=useParams();
    const reqId =params.id;
    getCompanyById(reqId);
    const [data, setData] = useState({
        companyName: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany}=useSelector(store=>store.company);
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const fileHandler = (e) => {
        const file = e.target?.files?.[0];
        setData({ ...data, file });
    }
    const navigate=useNavigate();

    const submitHandler= async (e)=>{
     e.preventDefault();
     const formData= new FormData();
       formData.append("name" ,data.name);
       formData.append("description", data.description)
       formData.append("website",data.website);
       formData.append("location",data.location);
       formData.append("file",data.file);
       try{
        const res=await fetch(`http://localhost:4000/api/v1/company/update/${reqId}`,{
            method:"PUT",
            credentials:"include",
            
            body:formData,
            
        })
        if(res.ok){
            toast.success("Information Updated Successfully");
            navigate('/admin/companies');
        }
       }catch(err){
        console.log(err);
        toast.error("Failed to update the Information");
       }
    
    }
    useEffect(()=>{
        setData({
            name: singleCompany.name||"",
            description: singleCompany.description||"",
            location:singleCompany.location || "",
            website:singleCompany.website || "",
            file: singleCompany.file ||null
        })
       },[singleCompany])
    return (
        <div className="bg-gray-100 min-h-screen">
            <NavbarTemp />
            <div className='mx-auto max-w-xl my-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 mb-6'>
                        <button className='flex items-center gap-2 font-semibold px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300' onClick={()=>{
                            navigate('/admin/companies')
                        }}>
                            <IoMdArrowRoundBack />
                            <span>Back</span>
                        </button>
                        <h1 className='font-bold text-2xl text-gray-800'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 gap-4'>
                    <div>
                            <label htmlFor="name" className='block mb-1 font-semibold text-gray-700'>Company Name</label>
                            <input
                                type="text"
                                name='name'
                                value={data.name}
                                onChange={changeHandler}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder="Enter company description"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className='block mb-1 font-semibold text-gray-700'>Description</label>
                            <input
                                type="text"
                                name='description'
                                value={data.description}
                                onChange={changeHandler}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder="Enter company description"
                            />
                        </div>
                        <div>
                            <label htmlFor="website" className='block mb-1 font-semibold text-gray-700'>Website</label>
                            <input
                                type="text"
                                name='website'
                                value={data.website}
                                onChange={changeHandler}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder="Enter company website"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className='block mb-1 font-semibold text-gray-700'>Location</label>
                            <input
                                type="text"
                                name='location'
                                value={data.location}
                                onChange={changeHandler}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder="Enter company location"
                            />
                        </div>
                        <div>
                            <label htmlFor="file" className='block mb-1 font-semibold text-gray-700'>Logo</label>
                            <input
                                type="file"
                                name='file'
                                onChange={fileHandler}
                                accept='image/*'
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>
                    <div className='mt-6'>
                        <button
                            type="submit"
                            className='w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300'
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CompanySetup;
