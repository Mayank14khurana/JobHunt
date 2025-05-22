import { setUser } from '@/redux/slices/authSlice';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
const NavbarTemp = () => {
  const { user } = useSelector(store => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const togglePopover = () => {
    setIsOpen(prev => !prev);
  };
  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const logoutHandler= async ()=>{
    try{
     const res =await fetch('https://jobhunt-backend-hfqi.onrender.com/api/v1/user/logout',{
      method:'GET'
     });
     if(res.ok){
      dispatch(setUser(null));
      navigate('/');
      toast.success("Logged Out Successfully");
     }
    }catch(err){
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <div className='text-xl font-bold'><Link to={'/'}>Job Hunt</Link> </div>
      <div>
        <ul className='flex space-x-6'>

           {
            user && user?.role==='recruiter'?(  <> 
            <li className='hover:text-gray-400 cursor-pointer mt-2'> <Link to={'/admin/companies'}>Companies</Link> </li>
            <li className='hover:text-gray-400 cursor-pointer mt-2'> <Link to={'/admin/jobs'}>Jobs</Link> </li>
            </>):(<>
              <li className='hover:text-gray-400 cursor-pointer mt-2'>
            <Link to={'/'}>Home</Link>
          </li>
          <li className='hover:text-gray-400 cursor-pointer mt-2'>
            <Link to={'/jobs'}>Jobs</Link>
          </li>
          <li className='hover:text-gray-400 cursor-pointer mt-2'>
            <Link to={'/browse'}>Browse</Link>
          </li>
            </>)
          
           }
        
          {!user ? (
            <div className='flex gap-5'>
              <li>
                <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'>
                  <Link to={'/login'}>Login</Link>
                </button>
              </li>
              <li>
                <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200'>
                  <Link to={'/getOtp'}>Signup</Link>
                </button>
              </li>
            </div>
          ) : (
            <div className='relative' ref={popoverRef}>
              <button className="flex items-center" onClick={togglePopover}>
                <img src={user.profile?.profilePhoto} alt="@user" className="w-10 h-10 rounded-full cursor-pointer" />
              </button>
              {isOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md'>
                  <div className='flex gap-2 p-2'>
                    <img src={user.profile?.profilePhoto} alt="@user" className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className='font-medium text-gray-500 text-sm'>{user.fullName}</h4>
                      <p className='text-sm text-gray-500'>{user.profile?.bio}</p>
                    </div>
                  </div>
                  <div className='flex flex-col p-2 text-gray-600'>
                    {
                      user && user?.role==='student'?   <div className='flex items-center gap-2 cursor-pointer'>
                        <CgProfile/>
                      <Link to="/profile" className='text-blue-600 hover:underline'>View Profile</Link>
                    </div> : <></>
                    }
                  
                    <div className='flex items-center gap-2 cursor-pointer' >
                       <RiLogoutBoxRLine/>
                      <span className='text-red-600'> <button onClick={logoutHandler}> Logout</button></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarTemp;
