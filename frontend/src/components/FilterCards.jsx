import React, { useState } from 'react';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42K-1lakh", "1lakh-5lakh"]
  }
];

const FilterCards = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  
  const handleChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
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
                  name={data.filterType}
                  value={item}
                  checked={selectedFilters[data.filterType] === item}
                  onChange={() => handleChange(data.filterType, item)}
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
