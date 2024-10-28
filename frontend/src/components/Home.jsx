import React, { useEffect } from 'react'
import NavbarTemp from './NavbarTemp'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from '@/pages/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const navigate=useNavigate();
  const {user} =useSelector(store=>store.auth);
  useEffect(()=>{
    if(user?.role==='recruiter'){
     navigate('/admin/companies');
    }
  },[])
  return (
    <div>
      <NavbarTemp/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
