// src/components/ImageSlider.js
import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Tilt from 'react-parallax-tilt';
const ImageSlider = ({ images }) => {
  const navigate = useNavigate() ;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  

  return (
    <div onClick={
      () => {
        navigate('/about')
      }
    } className="relative mb-10 max-w-[550px] md:max-w-[650px] lg:max-w-[750px]  p-4 mx-auto rounded-lg">
     
        

     <Tilt glareEnable={true} glareMaxOpacity={1} glareColor="lightblue" glarePosition="all" glareBorderRadius="10px">

        <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000}}
        loop={true}
        className="w-full  h-64"
      >
        
        
 {images.map((image, index) => (
  <SwiperSlide  key={index}>
    <div 
   
      key={index} 
      className="flex h-full items-center space-x-4 p-4 shadow-lg rounded-lg border border-gray-200 
                 transition-all duration-300 hover:shadow-xl hover:border-gray-300"
    >
      <img 
        src={image.image} 
        alt={image.alt} 
        width={100} 
        className="object-cover rounded-full border-4 border-gray-300 sm:w-24 lg:w-28"
      />
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl">{image.name}</h2>
        <h3 className="text-md  sm:text-lg">{image.job}</h3>
        <p className="text-sm mt-1 sm:text-base">{image.text}</p>
      </div>
    </div>
  </SwiperSlide>
  ))}
      </Swiper>
      </Tilt>
    </div>

  );
};

export default ImageSlider;
