import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies ,searchCompany} = useSelector(store => store.company);
    const [filteredData,setFilteredData]=useState(companies);
    const navigate=useNavigate()
    useEffect(()=>{
         const filteredCompany=companies.length>=0 && companies.filter((company)=>{
            if(!searchCompany){
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompany.toLowerCase());
         });
         setFilteredData(filteredCompany);
    },[searchCompany,companies])
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
                <caption className="text-lg font-semibold text-gray-700 mb-4 text-center">
                    A list of your recently registered companies
                </caption>
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-center">Logo</th>
                        <th className="px-4 py-2 text-center">Name</th>
                        <th className="px-4 py-2 text-center">Date</th>
                        <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {companies?.length <= 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-500">
                                You haven't registered any company yet
                            </td>
                        </tr>
                    ) : (
                        filteredData.map(company => (
                            <tr key={company?._id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 text-center flex justify-center items-center"> {/* Flexbox for centering */}
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage 
                                            className="object-cover w-12 h-12" 
                                            src={company?.logo} 
                                            alt={`${company?.name} logo`} 
                                        />
                                    </Avatar>
                                </td>
                                <td className="px-4 py-2 text-center">{company?.name}</td>
                                <td className="px-4 py-2 text-center">{new Date(company?.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-center">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer">
                                            <MoreHorizontal className="text-gray-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="p-2 bg-white shadow-md rounded-md">
                                            <div className="flex items-center" onClick={()=>{
                                                navigate(`/admin/companies/${company._id}`)
                                            }}>
                                                <Edit2 className="text-gray-600 mr-1" />
                                                <span className="text-gray-700">Edit</span>
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

export default CompaniesTable;
