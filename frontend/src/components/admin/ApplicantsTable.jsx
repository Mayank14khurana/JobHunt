import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [openDropdown, setOpenDropdown] = useState(null);

    const statusHandler = async (status, id) => {
        try {
            const res = await fetch(`https://jobhunt-backend-hfqi.onrender.com/api/v1/application/status/${id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Status updated successfully");
            } else {
                toast.error('Failed to update the status');
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-menu') && !event.target.closest('.dropdown-button')) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdown((prev) => (prev === id ? null : id));
    };

    return (
        <div>
            <table className="min-w-full bg-white">
                <caption className="text-left text-sm text-gray-500 mb-2">A list of your recent applied users</caption>
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FullName</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {applicants && applicants?.applications?.map((item) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.applicant?.fullName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.applicant?.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item?.applicant?.phoneNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item?.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 underline"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                    >
                                       Resume
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item?.applicant.createdAt.split("T")[0]}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="relative inline-block text-left">
                                    <button
                                        className="dropdown-button inline-flex justify-center w-full px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                                        onClick={() => toggleDropdown(item._id)}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v.01M12 12v.01M12 18v.01" />
                                        </svg>
                                    </button>
                                    {openDropdown === item._id && (
                                        <div className="dropdown-menu absolute right-0 z-10 mt-2 w-32 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        statusHandler(status, item._id);
                                                        setOpenDropdown(null);
                                                    }}
                                                    className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                                >
                                                    {status}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsTable;
