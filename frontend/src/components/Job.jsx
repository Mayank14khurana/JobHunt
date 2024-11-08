import { Bookmark } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (60 * 60 * 24 * 1000));
  };

  return (
    <div className="flex flex-col justify-between p-5 rounded-md shadow-lg bg-white border border-gray-200 mt-2 min-h-[350px]">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">
          {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <button className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition">
          <Bookmark />
        </button>
      </div>

      <div className="flex items-start gap-2 my-2">
        <button>
          <div className="relative inline-block w-10 h-10 overflow-hidden rounded-full">
            <img
              src={job?.company?.logo}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div className='flex items-start flex-col'>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p> {/* Tailwind's line-clamp for truncating text */}
      </div>

      <div className="flex space-x-2 mt-4 text-sm">
        <span className="text-blue-700 font-bold border px-2 py-1 rounded-md">
          {job?.position} Positions
        </span>
        <span className="text-[#f83002] font-bold border px-2 py-1 rounded-md">
          {job?.jobType}
        </span>
        <span className="text-[#7209b7] font-bold border px-2 py-1 rounded-md">
          {job?.salary} LPA
        </span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          className="border border-gray-200 rounded-lg p-2"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          Details
        </button>
        <button className="bg-[#7209b7] p-2 rounded-lg text-white">
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default Job;
