import React, { useState, useEffect } from 'react';
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
import Startup from '../components/Startup.jsx' 
import ImageSlider from '../components/ImageSlider.jsx' 
import WhyUs from '../components/WhyUs.jsx' 
import Footer from '../components/Footer.jsx'
import SliderData from './SliderData.js' 
import { useSelector, useDispatch } from 'react-redux';



const Home = () => {

  const { isDarkMode } = useSelector((state) => state.pages);

    return (
      <div className='w-screen relative transition-all duration-700 scroll-smooth overflow-x-hidden'>
        <Navbar />
        <HeroSection />
       
        <StartWith isDarkMode={isDarkMode} />
        <Courses/>
     <Startup isDarkMode={isDarkMode}  />
      
     <div className="text-2xl mb-5 font-bold flex justify-center uppercase" id='info'>our team</div>
    <ImageSlider images={SliderData}/>


    <WhyUs />

    <Footer />

      </div>
    );
  };

  export default Home;

