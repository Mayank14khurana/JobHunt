import React, { useEffect, useState } from 'react'
import NavbarTemp from '../NavbarTemp'
import CompaniesTable from './companiesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompany } from '@/redux/slices/companySlice';
const Companies = () => {
    const navigate=useNavigate();
    useGetAllCompany();
    const [data,setData]=useState('');
    const dispatch=useDispatch();
    useEffect(()=>{
      dispatch(setSearchCompany(data))
  },[data]);
  return (
    <div>
       <NavbarTemp/>   
       <div className='max-w-6xl mx-auto my-10 '>
        <div className='flex items-center justify-between'>
        <input type="text" className='w-fit  border-2 px-2 py-2 rounded-lg' placeholder='Filter By Name ' onChange={(e)=>{
          setData(e.target.value)
        }}  />
        <button className='bg-black text-white px-2 py-3  rounded-lg' onClick={()=>navigate('/admin/companies/create')}> New Company</button>
        </div>
         <CompaniesTable/>
       </div>
    </div>
  )
}

export default Companies
