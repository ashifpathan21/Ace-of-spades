import React, { useState, useEffect } from 'react';
import light from '../assets/light.png';
import dark from '../assets/dark.png';
import '../index.css'
import gsap from 'gsap'; 
import { useGSAP } from '@gsap/react';
import Navbar from "../components/Navbar.jsx";
import Hero from '../assets/hero.gif'


const HeroSection = (props) =>{

    useGSAP(() => {
        // gsap code here...
        gsap.from('.box', {  
          delay: .5 ,
          duration: 2,
          opacity: 0,
          scale: 0,
          autoAlpha: 0,
          y: 80,
          rotationX: 180,
          transformOrigin: "0% 50% -50",
          ease: "back",
          stagger: 1 ,
         }); // <-- automatically reverted
    });
      

    
    
    useEffect(() => {
        const texts = ["DSA", "DEVELOPMENT", "GEN-AI" , "ANIMATION"];
        let index = 0;
  
        const changeText = () => {
          gsap.to(".changing-text", {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              index = (index + 1) % texts.length;
              document.querySelector(".changing-text").innerText = texts[index];
              gsap.to(".changing-text", { opacity: 1, duration: 0.5 });
            },
          });
        };
  
        const interval = setInterval(changeText, 1500);
  
        return () => clearInterval(interval);
      }, []);


return (
    <div className={`h-80 md:h-100 lg:h-100 transition-all duration-1000 mt-20 relative w-full`}>
        <img src={Hero} className='h-full w-full absolute object-cover' />

        <div className='flex absolute ml-10 -mt-2 justify-center items-center md:mt-20 lg:mt-20 p-2 flex-col'>
          <h2 className='text-lg box font-semibold'>Be the <span className='text-fuchsia-600 text-2xl font-bold'>#1</span> Ace the World 🌍</h2>
          <h2 className='text-lg -mt-1 box font-semibold'>Step by Step Guide to Learn</h2>
          <h2 className={`text-lg font-bold px-4 box mt-1 p-1 rounded-lg ${props.isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} md:mt-3 lg:mt-5 text-center transition-colors duration-1000`}>
          <span className="changing-text">DSA</span>
          </h2>
        </div>

        <div className={`absolute p-2 right-10 md:right-30 lg:right-40 flex-col justify-between ${props.profileModal ? 'transition-all duration-1000 flex' : 'transition-all duration-1000 hidden'} ${props.isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} transition-all duration-1000 rounded-lg h-[100px] w-40 top-1`}>
          <button className='flex justify-center items-center w-full h-[48%]'>
          My Profile
          </button>
          <button onClick={() => {
          props.setIsLoggedIn(false);
          props.setProfileModal(false);
          }} className='flex justify-center items-center w-full h-[48%]'>
          Log Out
          </button>
        </div>
      </div>


)


}

export default HeroSection