import React, { useState } from 'react';
import NavbarTemp from '../NavbarTemp';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PostJobs = () => {
    const [data, setData] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        setData({ ...data, companyId: e.target.value });
    };
    async function submitHandler(e) {
        e.preventDefault();
        try{
            const res=await fetch('http://localhost:4000/api/v1/jobs/post',{
                method:"POST",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(data) 
            })
            if(res.ok){
                toast.success("Job Posted Successfully");
                navigate('/admin/jobs');
            }
        }catch(err){
            toast.error("Failed to post job");
            console.log(err);
        }
    }
    return (

        <div>
         <NavbarTemp />
        <div className="min-h-screen bg-gray-100 p-5">
           
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-5">
                <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>
                <form onSubmit={submitHandler}>
                    <div className='grid grid-cols-1 gap-4'>
                        {[
                            { label: "Title", name: "title", type: "text" },
                            { label: "Description", name: "description", type: "text" },
                            { label: "Requirements", name: "requirements", type: "text" },
                            { label: "Salary", name: "salary", type: "text" },
                            { label: "Location", name: "location", type: "text" },
                            { label: "Job Type", name: "jobType", type: "text" },
                            { label: "Experience Level", name: "experience", type: "text" },
                            { label: "No Of Positions", name: "position", type: "number" }
                        ].map(({ label, name, type }) => (
                            <div key={name}>
                                <label htmlFor={name} className="block font-semibold mb-1">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={data[name]}
                                    onChange={changeHandler}
                                    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                />
                            </div>
                        ))}

                        {companies.length > 0 && (
                            <div>
                                <label htmlFor="companyId" className="block font-semibold mb-1">Select a Company</label>
                                <select
                                    name="companyId"
                                    onChange={selectChangeHandler}
                                    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                >
                                    <option value="" disabled>Select a Company</option>
                                    {companies.map((company) => (
                                        <option key={company._id} value={company._id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <button type='submit' className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                        Post New Job
                    </button>
                    {companies.length === 0 && <p className="mt-4 text-red-600">Please register a company first before posting a job</p>}
                </form>
            </div>
        </div>
        </div>
    );
}

export default PostJobs;
