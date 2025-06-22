import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Hero from '../../assets/hero.gif'
import Start from '../../assets/start.jpg'
import HeroSection from "./HeroSection.jsx";
import Tilt from 'react-parallax-tilt';
import { useSelector, useDispatch } from 'react-redux';

const Startwith0 = (props) => {

  const navigate = useNavigate()
  const {user } = useSelector((state) => state.user) ;

  return (
    <div className='mt-10 '>
  <Tilt glareEnable={true} glareMaxOpacity={0.9} glareColor="lightblue" glarePosition="all" glareBorderRadius="20px"  className=' w-full lg:max-w-[1000px] md:max-w-[800px] max-w-[500px] mx-auto h-80 p-3 '>
    <h1 className='w-full  text-center py-2 text-2xl font-bold transition-all duration-500'>Beginner</h1>

   <div className='h-[95%] max-w-[1000px] p-2 mx-auto w-full flex  justify-between'>
    <div className=' p-2 flex flex-col justify-start items-center h-[80%] w-[48%] '>
        <ul className='p-3 list-disc space-y-1 md:text-xl lg:text-2xl font-semibold'>
          <li>C </li>
          <li>C++</li>
          <li>Data Structures</li>
         
          <li>Algorithms</li>
          <li>Web Development</li>
        </ul>

    </div>
    <div className='flex gap-3 flex-col justify-center items-center h-[80%] w-[48%] mt-4 '>
      <img src={Start} className='rounded-lg object-cover drop-shadow-2xl' />

      <button  className={props.isDarkMode? ("bg-white transition-all lg:w-75  md:w-70 w-full  hover:bg-amber-100 duration-1000  text-black p-2 font-semibold  rounded-lg ") : ("bg-black transition-all hover:bg-gray-800 duration-1000  text-white p-2 font-semibold lg:w-75  md:w-70 w-full rounded-lg")}>Start with 0</button>
    </div>
   </div>


</Tilt>

    </div>
  
  )
}

export default Startwith0
