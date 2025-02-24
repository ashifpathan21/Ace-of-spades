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
import Startup from '../components/Startup.jsx' 
import ImageSlider from '../components/ImageSlider.jsx' 
import WhyUs from '../components/WhyUs.jsx' 
import Footer from '../components/Footer.jsx'
import SliderData from './SliderData.js' 




const Home = () => {


  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileModal , setProfileModal] = useState(false);
  const [isLoggedIn , setIsLoggedIn] = useState(true)



    return (
      <div className='w-screen relative overflow-x-hidden'>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} profileModal={profileModal} setProfileModal={setProfileModal}/>
        <HeroSection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDarkMode={isDarkMode}  profileModal={profileModal} setProfileModal={setProfileModal}/>
        <StartWith isDarkMode={isDarkMode} />
        <Courses/>
     <Startup isDarkMode={isDarkMode}  />
      
     <div className="text-2xl mb-5 font-bold flex justify-center uppercase" >our team</div>
    <ImageSlider images={SliderData}/>


    <WhyUs images={SliderData}/>

    <Footer />

      </div>
    );
  };

  export default Home;

