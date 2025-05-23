import { setUser } from '@/redux/slices/authSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const UpdateProfile = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills.map(skill=>skill) || [], // Initialize as an empty array
        file: user?.profile?.resume||"",
    });

    const changleHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'skills') {
            setInput({ ...input, [name]: value.split(',') }); // Handle skills as an array
        } else {
            setInput({ ...input, [name]: value });
        }
    };

    const fileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    async function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName', input.fullName);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills.join(','));

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            const res = await fetch('http://localhost:4000/api/v1/user/profile/update', {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(setUser(data.user));
                toast.success('Profile Updated successfully');
            } else {
                toast.error(data.message || 'Failed to Update Profile');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to Update Profile');
        }

        setOpen(false);
    }

    return (
        <div>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                        <form onSubmit={submitHandler}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="fullName" className="text-right">Name</label>
                                    <input type="text" id="fullName" name="fullName" className="col-span-3 border rounded-md p-2" value={input.fullName} onChange={changleHandler} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="email" className="text-right">E-Mail</label>
                                    <input type="email" id="email" name="email" className="col-span-3 border rounded-md p-2" value={input.email} onChange={changleHandler} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="phoneNumber" className="text-right">Contact Number</label>
                                    <input type="number" id="phoneNumber" name="phoneNumber" className="col-span-3 border rounded-md p-2" value={input.phoneNumber} onChange={changleHandler} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="bio" className="text-right">Bio</label>
                                    <input type="text" id="bio" name="bio" className="col-span-3 border rounded-md p-2" value={input.bio} onChange={changleHandler} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="skills" className="text-right">Skills</label>
                                    <input type="text" id="skills" name="skills" className="col-span-3 border rounded-md p-2" value={input.skills.join(',')} onChange={changleHandler} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="file" className="text-right">Resume</label>
                                    <input type="file" id="file" name="file" className="col-span-3 border rounded-md p-2" accept="application/pdf" onChange={fileHandler} />
                                    {input.file && <p className="mt-2 text-gray-600">{input.file.name}</p>}
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="button" onClick={() => setOpen(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2">Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfile;
