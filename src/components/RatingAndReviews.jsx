import React, { useEffect, useRef , useState } from "react";
import { gsap } from "gsap";
import { FaStar } from "react-icons/fa";
import StarDisplay from '../components/StarDisplay.jsx'

const RatingAndReviews = ({reviews}) => {

    
  const reviewsContainerRef = useRef(null);

  useEffect(() => {
    gsap.to(reviewsContainerRef.current, {
      x: "-100%",
      duration: 5,
      repeat: -1,
      ease: "linear",
    });
  }, []);


  return (
    <div
              ref={reviewsContainerRef}
             className=' flex gap-5  p-4 whitespace-nowrap mx-auto md:max-w-[750px] lg:max-w-[900px]  '> 
                {
                 reviews.map((review) => {
                  return ( <div className='flex p-6  backdrop-blur-3xl shadow hover:shadow-md transition-all duration-200 shadow-cyan-400   flex-col gap-5 w-full  '>
                    <div className='flex items-center gap-4 '>
                      
                        <div className='aspect-square h-20 '>
                        <img src={review?.user?.image} className='aspect-square h-20 object-cover rounded-full' />

                        
                        </div>
                       <h3>{review?.user?.firstName + " " +  review?.user?.lastName}</h3>

                      
                    </div>
                    
                    <div className='w-full h-full '>
                      <p>{review?.review}</p>  
                    </div>

                     
                    <StarDisplay rating={review?.rating} />

                  </div> )
                 })
                }
             </div>
  )
}

export default RatingAndReviews
