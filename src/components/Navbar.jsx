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


  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // स्क्रॉल करने पर navbar छुपेगा
      } else {
        setShowNavbar(true);  // ऊपर स्क्रॉल करने पर दिखेगा
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className={`transition bg-transparent ${
      showNavbar ? "translate-y-0" : "-translate-y-full"
    } backdrop-blur-sm z-10 w-screen fixed top-0 duration-1000`}>
    {/* navbar */}
    <div className='lg:max-w-[1080px] md:max-w-[900px] max-w-[600px] w-full  mx-auto flex justify-between px-3 h-20 '>
      <div className='flex transition p-5 duration-200 items-center   justify-center '>
       <h2 className=' md:text-2xl text-lg lg:text-2xl font-semibold lg:font-bold font-serif  '> Ace of $pades</h2>
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
  <div className='flex items-center p-0  md:p-2 lg:p-2 md:gap-2 lg:gap-2 -mr-5 md:mr-10 lg:mr-10 gap-1'>

<button  onClick={()=>{
          navigate('/signup')
         
         }} className=' backdrop-blur-lg transition-all  duration-500  p-2 font-semibold  rounded-2xl'>
          SignUp
          </button>
<button  onClick={()=>{
          navigate('/login')
         
         }} className=' backdrop-blur-lg transition-all  duration-500  p-2 font-semibold  rounded-2xl '>
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
