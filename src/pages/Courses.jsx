import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";
import '../index.css'
import Modals from "../components/Modals.jsx";
import Category from "../components/Category.jsx";
import CourseProgress from "../components/CourseProgress.jsx";
import Tilt from 'react-parallax-tilt';
import {useNavigate} from 'react-router-dom'
import Course from "../components/Course";
import { useSelector, useDispatch } from 'react-redux';
const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const {courses } = useSelector((state) => state.courses) ;
const navigate = useNavigate()
  return (
    <div>
     

      <div className='p-4' >
        <div onClick={
            ()=>{
                navigate('/')
            }
        } className='absolute  left-4 p-2 text-3xl'> <i className="ri-home-9-fill"></i></div>

      <h2 className='w-full p-2 text-center mb-2 text-3xl font-semibold '>Courses</h2>
         
         <Category activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>

         <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[1000px] mx-auto gap-3 w-full '>
    { 
         activeCategory === 'All' ? (
           courses.map((course , index ) => {
          return     <Course key={index} course={course} />
           } )
  ): (
  courses
    .filter((course) => course.category === activeCategory)
    .map((course, index) => {
    return <Course key={index} course={course} />;
    })

  )
     }
     </div>

      </div>
    </div>
  )
}

export default Courses
