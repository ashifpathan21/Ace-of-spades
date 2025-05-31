import React , {useState} from 'react'
import {useLocation } from 'react-router-dom'
import Navbar from '../components/Basic/Navbar'
import '../index.css'
import SliderData from './SliderData.js' 
const AboutUs = () => {
    
    const data = SliderData ;
   
    const [index , setIndex ] = useState(0) ;
  return (
    <div className='min-h-screen relative '>
      <Navbar/>
      <div className='pt-20'>
       
       <h2 className='w-full text-center font-semibold text-2xl '>About Us</h2>

         
        <div className='max-w-[500px]  md:max-w-[750px] lg:max-w-[950px] mx-auto p-4 gap-10 flex items-center justify-between mt-5'>
            <img src={data[index].image} className='aspect-square bgpic h-40 rounded-lg shadow-xl ' />

         <div className='w-full p-4 flex flex-col gap-3 justify-start '>
         <h3 className='w-full  text-xl font-semibold'>{data[index].name}</h3>
         <h4 className='w-full   text-lg font-medium '>{data[index].job}</h4>
         <p>{data[index].text}</p>
         </div>
         
        </div>


      <div className='w-full px-20 mt-20 py-4 flex justify-between items-center absolute bottom-0'>
        <button onClick={() => {

            let prev = index ?  index - 1 : data.length - 1   ;
            setIndex(prev)
            // //(index)
        }} className='bg-white p-2 text-slate-500 rounded-lg font-bold text-4xl'>{'<'}</button>
        <button 
        onClick={() => {
            let next = index === data.length - 1  ?  0 : index + 1  ;
            setIndex(next)
          
        }}
        className='bg-white p-2 text-slate-500 rounded-lg font-bold text-4xl'>{'>'}</button>
       
      </div>
      </div>
    </div>
  )
}

export default AboutUs
