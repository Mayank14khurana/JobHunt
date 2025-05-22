import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllJobs, setSingleJob } from '@/redux/slices/jobSlice';
import { setSingleCompany } from '@/redux/slices/companySlice';

const useGetSingleJob = ({companyId}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await fetch(`https://jobhunt-backend-hfqi.onrender.com/api/v1/company/get/${companyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' // Include credentials (cookies) with the request
                });

                if (res.ok) {
                    const data = await res.json();
                    dispatch(setSingleCompany(data.company)); // Ensure data.jobs is the correct path
                } else {
                    console.error('Failed to fetch jobs:', res.statusText);
                }
            } catch (err) {
                console.error(err);
            }
        };
    }, [companyId,dispatch]); // Include dispatch in the dependency array

};

export default useGetSingleJob;
