import React, { useState, useEffect } from 'react';
import '../index.css'
import gsap from 'gsap'; 
import { useGSAP } from '@gsap/react';
import Navbar from "../components/Navbar.jsx";
import Hero from '../assets/hero.gif'
import {  useNavigate} from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import AddFriend from '../components/AddFriend.jsx'
const FindFriends = () => {
  const navigate = useNavigate()
    const [search, setSearch] = useState(false)
  return (
    <div>

 <div className='px-4 flex '>
 <div onClick={
             ()=>{
                navigate('/')
            }
        } className='absolute  left-4 p-2 text-3xl'> <i className="ri-home-9-fill"></i></div>

      <h2 className='w-full p-2 text-center text-3xl font-semibold '>Find friends</h2>

 </div>
       
         
      



     
    <div className='px-3 '>
        <div className='max-w-[450px] md:max-w-[700px] lg:max-w-[1000px] flex flex-col  justify-between h-full mt-5 mx-auto'>
         
          <div className='flex flex-col w-full  '>
           <div className='p-3 mb-5  gap-2 flex '>
               <input type="text" placeholder='   enter @username' className='bg-white p-2 h-10 text-black w-full rounded-lg' />
                <button onClick={()=>{
                    setSearch(true)
                }} className='bg-green-400 p-2 rounded-lg '><i className="font-semibold ri-search-line"></i></button>
            </div>
          </div>

        <div className='max-w-[450px] md:max-w-[700px] lg:max-w-[900px]   flex flex-col p-2 gap-4'>

         <AddFriend search={search}/>

        </div>

     
        

        </div>

     </div>
      

    </div>
  )
}

export default FindFriends
