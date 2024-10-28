import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

const Navbar = () => {
    // const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const user=null;
    // const logoutHandler = async () => {
    //     try {
    //         const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
    //         if (res.data.success) {
    //             dispatch(setUser(null));
    //             navigate("/");
    //             toast.success(res.data.message);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response.data.message);
    //     }
    // };

    return (
        <div className='bg-white shadow'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user && user?.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies" className='text-gray-600 hover:text-gray-900'>Companies</Link></li>
                                <li><Link to="/admin/jobs" className='text-gray-600 hover:text-gray-900'>Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className='text-gray-600 hover:text-gray-900'>Home</Link></li>
                                <li><Link to="/jobs" className='text-gray-600 hover:text-gray-900'>Jobs</Link></li>
                                <li><Link to="/browse" className='text-gray-600 hover:text-gray-900'>Browse</Link></li>
                            </>
                        )}
                    </ul>
                    {/* {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <button className='border border-gray-300 rounded px-4 py-2 hover:bg-gray-100'>Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className='bg-[#6A38C2] text-white rounded px-4 py-2 hover:bg-[#5b30a6]'>Signup</button>
                            </Link>
                        </div>
                    ) : (
                        <div className='relative'>
                            <button className="flex items-center">
                                <img src={user?.profile?.profilePhoto} alt="@user" className="w-10 h-10 rounded-full cursor-pointer" />
                            </button>
                            <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg'>
                                <div className='flex gap-2 p-2'>
                                    <img src={user?.profile?.profilePhoto} alt="@user" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col p-2 text-gray-600'>
                                    {user && user.role === 'student' && (
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <Link to="/profile" className='text-blue-600 hover:underline'>View Profile</Link>
                                        </div>
                                    )}
                                    <div className='flex items-center gap-2 cursor-pointer' onClick={logoutHandler}>
                                        <span className='text-red-600'>Logout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
