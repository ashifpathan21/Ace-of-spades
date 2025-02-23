import React, { useState, useEffect } from 'react';
import light from '../assets/light.png';
import dark from '../assets/dark.png';
import '../index.css'
import {useNavigate} from 'react-router-dom'
const Navbar = (props) => {
  

  const logo = props.isDarkMode ? dark : light;




  const toggleMode = () => {
    props.setIsDarkMode(!props.isDarkMode);
  };

  useEffect(() => {
    if (props.isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [props.isDarkMode]);

  const navigate= useNavigate()




  return (
    <div className='transition w-screen absolute top-0 duration-3000'>
    {/* navbar */}
    <div className='lg:max-w-[1080px] md:max-w-[950px] w-screen  mx-auto flex justify-between px-3 h-20 '>
      <div className='flex transition duration-200  justify-center relative top-0'>
        <img src={logo} className='h-[90%] transition-all duration-2000 object-cover' />
      </div>




      <div className='flex justify-between items-center relative px-4 w-[50%] md:w-[35%] lg:w-[35%]'>
        <div onClick={toggleMode} className=' cursor-pointer transition duration-100'>
          {props.isDarkMode ? (
              <i className=" ri-moon-clear-fill"></i>
          ) : (
         
            <i className=" ri-sun-line"></i>
          )}
        </div>



        <div >
{
props.isLoggedIn? (
  <div className='flex items-center w-[50%]  md:p-2 lg:p-2 -mr-5 md:mr-10 lg:mr-10 md:gap-5 lg:gap-5 gap-2'> 
 
        <div className=''>
        <div onClick={() => {
          props.setProfileModal(!props.profileModal)
        }}  className='bg-amber-100 transition-all duration-1000 h-[40px] w-[40px] rounded-full'>

           </div>

        
         </div>
      
       <div className='text-2xl '>
       <i className="ri-menu-line"></i>
       </div>


  </div>
) : (
  <div className='flex items-center p-0  w-[50%] md:p-2 lg:p-2 md:gap-2 lg:gap-2 -mr-5 md:mr-10 lg:mr-10 gap-1'>

<button  onClick={()=>{
          navigate('/signup')
         
         }} className={props.isDarkMode? ("bg-white transition-all duration-1000  text-black p-2 font-semibold  rounded-lg ") : ("bg-black transition-all duration-1000  text-white p-2 font-semibold  rounded-lg ")}>
          SignUp
          </button>
         <button onClick={()=>{
          navigate('/login')
       
         }} className={props.isDarkMode? ("bg-white transition-all duration-1000 text-black p-2 font-semibold  rounded-lg ") : ("bg-black transition-all duration-1000  text-white p-2 font-semibold  rounded-lg ")}>
          LogIn
          </button>
  </div>
)
}

          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Navbar
