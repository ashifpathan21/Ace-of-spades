import React, { useState, useEffect } from 'react';
import gsap from 'gsap'; 
import { useGSAP } from '@gsap/react';
import Navbar from "./Navbar.jsx";
import Hero from '../../assets/hero.gif'


const HeroSection = () =>{

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
    <div className={`h-60  transition-all mt-20 mb-10 md:mb-20 lg:mb-20 duration-1000 flex items-center justify-center  relative w-full`}>
      

        <div className='flex my-auto ml-10  justify-center h-full items-center md:mt-20 lg:mt-20 p-2 flex-col'>
          <h2 className='text-xl md:text-2xl lg:text-3xl box font-bold'>Be the <span className='text-fuchsia-600 text-4xl font-bold'>#1</span> Ace the World </h2>
          <h2 className='text-md md:text-lg lg:text-lg mt-1 box font-semibold'>Step by Step Guide to Learn</h2>
          <h2 className={`text-5xl   w-full  md:font-bold lg:font-bold font-lg px-4 box mt-1 p-1 rounded-lg  md:mt-3 lg:mt-5 text-center transition-colors duration-500`}>
          <span className="changing-text">DSA</span>
          </h2>
        </div>

      </div>


)


}

export default HeroSection