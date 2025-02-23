import React, { useState, useEffect } from 'react';
import light from '../assets/light.png';
import dark from '../assets/dark.png';
import '../index.css'
import gsap from 'gsap'; 
import { useGSAP } from '@gsap/react';
import Navbar from "../components/Navbar.jsx";
import Hero from '../assets/hero.gif'
import bg from '../assets/startup-bg.gif'
import Start from '../assets/start.jpg'
import startup from '../assets/startup.gif'
import HeroSection from "../components/HeroSection.jsx";
import StartWith from '../components/Startwith0.jsx' 
import Courses from '../components/Courses.jsx' 
const Startup = (props) => {
  return (
    <div className=' w-full h-80 p-3 relative border-b startup border-amber-200'>
    <h1 className='w-full  text-center py-2 text-2xl text-white font-bold transition-all  duration-500'>Have Some Idea ?</h1>



   <div className='h-[95%] max-w-[1000px] p-2 mx-auto w-full flex  justify-between'>

    <div className=' p-2 flex flex-col text-white justify-start items-center h-[80%] w-[48%] '>
      
    <h2 className='font-bold text-xl  p-2'>Startup Support </h2>
        <ul className='p-3 list-disc space-y-1 md:text-xl lg:text-2xl font-semibold'>
          <li>Free website building</li>
          <li>Team Support</li>
          <li>Expert Guidance</li>
         
        </ul>

    </div>

    <div className='flex gap-3 flex-col p-2 justify-center items-center h-[80%] w-[48%] mt-4 '>
      <img src={startup} className='rounded-lg h-40 object-cover drop-shadow-2xl' />

      <button className={props.isDarkMode? ("bg-white transition-all w-40  hover:bg-amber-100 duration-1000  text-black p-2 font-semibold  rounded-lg ") : ("bg-black transition-all hover:bg-gray-800 duration-1000  text-white p-2 font-semibold w-40 rounded-lg")}>Share Your Idea</button>
    </div>

   </div>


</div>
  )
}

export default Startup
