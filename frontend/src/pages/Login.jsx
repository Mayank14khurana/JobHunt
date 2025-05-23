import NavbarTemp from '@/components/NavbarTemp';
import { setLoading, setUser } from '@/redux/slices/authSlice';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const dispath =useDispatch();
    const {loading} =useSelector(store=>store.auth);
    async function submitHandler(e) {
        e.preventDefault();
        try {
            dispath(setLoading(true));
            const response = await fetch('http://localhost:4000/api/v1/user/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include',
                body: JSON.stringify({ email, password, role })
            });
            const data =await response.json()
            if (response.ok) {
                dispath(setUser(data.user))
                navigate('/');
                toast.success("Log In successfull");
            }
        } catch (err) {
            console.log('error in logging', err);
        }
        finally{
            dispath(setLoading(false));
        }
    }

    return (
        <div><NavbarTemp/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
              
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center text-gray-800">Login Here</h1>
                <form className="mt-6" onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg text-gray-700">Email</label>
                        <input
                            type="email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='mt-1 block w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-lg text-gray-700">Password</label>
                        <input
                            type="password"
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-1 block w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <fieldset className="mb-2 flex justify-around gap-3 ">
                        <legend className="text-lg text-gray-700">Select your role:</legend>
                        <div className="flex items-center gap-5 mt-3">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value='student'
                                    name='role'
                                    onClick={(e) => setRole(e.target.value)}
                                    className="mr-2"
                                />
                                Student
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value='recruiter'
                                    name='role'
                                    onClick={(e) => setRole(e.target.value)}
                                    className="mr-2"
                                />
                                Recruiter
                            </label>
                        </div>
                    </fieldset>
                        {
                            loading ?<button> <Loader2 className='animate-spin mr-2 h-4 w-4'/> Please Wait </button> : <button
                            type='submit'
                            className='w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200'
                        >
                            Log In
                        </button>
                        } 
                   

                    <div className='mt-4 text-center'>
                        <span className='text-gray-600'>Don't have an account? </span>
                        <Link to='/signup' className='text-blue-500 hover:underline'>Create account here</Link>
                    </div>
                    <div className='text-center mt-2'>
                        <Link to='/forgotOtp' className='text-blue-500 hover:underline'>Forgot Password?</Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Login;
