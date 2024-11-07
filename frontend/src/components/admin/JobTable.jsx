import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const JobTable = () => {
    const { searchJob, adminJobs } = useSelector(store => store.job);
    const [filteredData, setFilteredData] = useState(adminJobs);
    const navigate = useNavigate();
    useEffect(() => {
        if (adminJobs.length > 0) {
            const filteredJob = adminJobs.filter(job => {
                if (!searchJob) {
                    return true;
                }
                return job.title.toLowerCase().includes(searchJob.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJob.toLowerCase());
            });
            setFilteredData(filteredJob);
        } 
    }, [adminJobs, searchJob]); 
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
                <caption className="text-lg font-semibold text-gray-700 mb-4 text-center">
                    A list of your recently registered Jobs
                </caption>
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-center">Company Name</th>
                        <th className="px-4 py-2 text-center">Role</th>
                        <th className="px-4 py-2 text-center">Date</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length <= 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-500">
                                You haven't registered any Job yet
                            </td>
                        </tr>
                    ) : (
                        filteredData.map(job => (
                            <tr key={job._id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 text-center">{job.company.name}</td>
                                <td className="px-4 py-2 text-center">{job.title}</td>
                                <td className="px-4 py-2 text-center">{new Date(job.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-center">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer">
                                            <MoreHorizontal className="text-gray-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="p-2 bg-white shadow-md rounded-md">
                                            {/* <div className="flex items-center" onClick={() => {
                                                navigate(`/admin/companies/${job._id}`);
                                            }}>
                                                <Edit2 className="text-gray-600 mr-1" />
                                                <span className="text-gray-700">Edit</span>
                                            </div> */}
                                            <div className="flex items-center" onClick={() => {
                                                navigate(`/admin/jobs/${job._id}/applicants`);
                                            }}>
                                                <Eye className="text-gray-600 mr-1 " />
                                                <span className="text-gray-700">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default JobTable;
