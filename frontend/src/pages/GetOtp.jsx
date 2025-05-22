import NavbarTemp from '@/components/NavbarTemp';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

const GetOtp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    async function submitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch('https://jobhunt-backend-hfqi.onrender.com/api/v1/user/getotp', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/signup');
            } else {
                console.error('Error:', data.message);
            }
        } catch (err) {
            console.error('Error in sending OTP', err);
        }
    }

    return (
        <div>
            <NavbarTemp/>
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* <Navbar /> */}
            <div className="flex flex-col justify-center items-center w-full max-w-lg mx-auto mt-16 p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h1 className="text-4xl mb-6 font-bold text-center text-gray-800">Sign Up</h1>
                <form onSubmit={submitHandler} className="flex flex-col w-full">
                    <label htmlFor="email" className="text-lg mb-2 text-gray-700">Enter your Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        className="border border-gray-300 rounded-lg w-full h-12 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"  
                        name='email'
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder='abc@gmail.com'
                    />
                    <button 
                        type='submit' 
                        className="bg-blue-600 text-white font-semibold text-lg px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Get OTP
                    </button>
                </form>
            </div>
        </div>
        </div>

    );
}

export default GetOtp;
