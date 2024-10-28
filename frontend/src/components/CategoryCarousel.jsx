import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { setSearchedQuery } from '@/redux/slices/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const category = [
    "Frontend Developer", "Backend Developer", "Data Science", "Graphic Designer", "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();;
   const searchHandler = (query)=>{
        dispatch(setSearchedQuery(query));
        navigate('/browse');
   }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent className="flex">
          {
            category.map((cat, index) => (
              <CarouselItem key={index} className="basis-1/2"> {/* Changed to basis-1/2 to fit two items */}
                <button className='bg-black text-white border-2 border-black rounded-md px-3 py-2 ' onClick={()=>searchHandler(cat)}>
                  {cat}
                </button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
