import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAdminJobs} from '@/redux/slices/jobSlice';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/v1/jobs/get/adminJobs', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' 
                });

                if (res.ok) {
                    const data = await res.json();
                    dispatch(setAdminJobs(data.jobs)); 
                } else {
                    console.error('Failed to fetch jobs:', res.statusText);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]); 
    
};

export default useGetAllAdminJobs;
