import React, { useState } from 'react'
import NavbarTemp from './NavbarTemp'
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedJobs from './AppliedJobs'
import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <NavbarTemp />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className="h-24 w-24 rounded-full overflow-hidden">
                            <img
                                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                alt="profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className=" p-2  text-gray-700 hover:bg-gray-50"
                    >
                        <Pen />
                    </button>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5 flex items-start flex-col'>
                    <h1 className='font-semibold text-lg mb-3'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-2'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm"
                                >
                                    {item}
                                </span>
                            )) : <span>NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm place-items-start gap-1.5'>
                    <label className="text-md font-bold">Resume</label>
                    {
                        isResume ? (
                            <a
                                target='_blank'
                                href={user?.profile?.resume}
                                className='text-blue-500 hover:underline cursor-pointer'
                            >
                                {user?.fullName} Resume
                            </a>
                        ) : <span>NA</span>
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobs />
            </div>

            <UpdateProfile open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
