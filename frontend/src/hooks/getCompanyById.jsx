import React from 'react';
import { setSingleCompany } from '@/redux/slices/companySlice';
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const getCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/v1/company/get/${companyId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' // Include credentials (cookies) with the request
                });

                if (res.ok) {
                    const data = await res.json();
                    dispatch(setSingleCompany(data.company)); 
                } else {
                    console.error('Failed to fetch company:', res.statusText);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchSingleCompany()
    }, [dispatch,companyId]); 

};

export default getCompanyById;
