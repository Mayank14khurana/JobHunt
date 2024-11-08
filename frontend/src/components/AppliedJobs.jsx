import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobs = () => {
  const {allAppliedJobs}=useSelector(store=>store.job);
  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Job Role</th>
            <th className="py-2 px-4 text-left">Company</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
            {
            allAppliedJobs.length>0? ( allAppliedJobs.map((item, index) => (
            <tr key={item._id} className="border-b">
              <td className="py-2 px-4">{item?.createdAt.split('T')[0]}</td>
              <td className="py-2 px-4">{item?.job?.title}</td>
              <td className="py-2 px-4">{item?.job?.company?.name}</td>
              <td className="py-2 px-4"> <span className= {`${item?.status === "rejected" ? 'bg-red-400' : item.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'} py-1 px-2 rounded-xl`}> {item?.status.toUpperCase()}</span></td>
            </tr>
          ))) : <div>You Haven't applied for any jobs yet</div>
           }
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobs;
