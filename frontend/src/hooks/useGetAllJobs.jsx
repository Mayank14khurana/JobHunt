import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/slices/jobSlice';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery}=useSelector(store=>store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await fetch(`https://jobhunt-backend-hfqi.onrender.com/api/v1/jobs/getAll?keyword=${searchedQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' 
                });

                if (res.ok) {
                    const data = await res.json();
                    dispatch(setAllJobs(data.jobs)); 
                } else {
                    console.error('Failed to fetch jobs:', res.statusText);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchAllJobs();
    }, [dispatch]); 
    
};

export default useGetAllJobs;
