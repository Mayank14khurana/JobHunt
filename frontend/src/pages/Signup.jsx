import NavbarTemp from '@/components/NavbarTemp';
import { setLoading } from '@/redux/slices/authSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [file, setFile] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    const changeFileHandler = (e) => {
        setFile(e.target.files?.[0]);
    };

    async function submitData(e) {
        e.preventDefault();
        try {
            dispatch(setLoading(true));

            // Create a FormData object
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('role', role);
            formData.append('otp', otp);
            formData.append('phoneNumber', phoneNumber);
            if (file) {
                formData.append('file', file);
            }

            const response = await fetch('https://jobhunt-backend-hfqi.onrender.com/api/v1/user/signup', {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("SignUp successful");
                navigate('/login');
            } else {
                toast.error(result.message || "Signup failed");
            }
        } catch (err) {
            console.log('error in signing up', err);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
            <NavbarTemp />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-96 mt-8 mb-8">
                    <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
                    <form className="flex flex-col space-y-4" onSubmit={submitData}>
                        <label className="font-semibold">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                        <label className="font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        <label className="font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        <label className="font-semibold">OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter OTP"
                        />
                        <label className="font-semibold">Contact Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                        />
                        <div className="flex justify-around mt-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    value="student"
                                    name="role"
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mr-2"
                                />
                                <label>Student</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    value="recruiter"
                                    name="role"
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mr-2"
                                />
                                <label>Recruiter</label>
                            </div>
                           
                        </div>
                        <div className='flex items-center gap-2 flex-col'>
                                <label className='font-semibold'>Profile</label>
                                <input
                                    accept="image/*"
                                    type="file"
                                    name='file'
                                    onChange={changeFileHandler}
                                    className="cursor-pointer"
                                />
                            </div>
                        {loading ? (
                            <button disabled className="bg-gray-400 text-white py-2 rounded-md">
                                Please Wait
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                            >
                                Sign Up
                            </button>
                        )}
                        <div>Already have an account?<span className='text-blue-500'> <Link to='/login'>Login</Link> </span></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
