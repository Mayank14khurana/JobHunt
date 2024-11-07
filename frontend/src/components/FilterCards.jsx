import { setSearchedQuery } from '@/redux/slices/jobSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
  },
  
];

const FilterCards = () => {
  const [selectedFilters, setSelectedFilters] = useState('');
  const dispatch =useDispatch();
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedFilters));
  },[selectedFilters,dispatch])
  const handleChange = (value) => {
     setSelectedFilters(value);
  }; 

  return (
    <div>
      <h1 className="text-2xl font-bold">Filter Jobs</h1>
      <hr className='mt-3' />
      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h2 className="text-lg font-semibold">{data.filterType}</h2>
          <div className="flex flex-col">
            {data.array.map((item, itemIndex) => (
              <label key={itemIndex} className="flex items-center cursor-pointer mt-2">
                <input
                  type="radio"
                  name="filter"
                  value={item}
                  checked={selectedFilters === item}
                  onChange={() => handleChange(item)}
                  className="mr-2 form-radio text-blue-600 focus:ring-blue-500"
                />
                <span className="text-md">{item}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterCards;
