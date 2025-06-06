import { setCompanies } from '@/redux/slices/companySlice';
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const useGetAllCompany = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/v1/company/get`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' 
                });

                if (res.ok) {
                    const data = await res.json();
                    dispatch(setCompanies(data.company)); 
                } else {
                    console.error('Failed to fetch jobs:', res.statusText);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllCompany()
    }, [dispatch]); 

};

export default useGetAllCompany;
