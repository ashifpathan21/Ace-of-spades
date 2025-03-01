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

  const {courses } = useSelector((state) => state.courses) ;
  
  return (
    <div className='p-4 ' >
        <h1 className='w-full text-center py-2 text-2xl font-bold transition-all duration-500'>Courses</h1>

<div className='max-w-[900px] mx-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>

{
           courses.map((course , index ) => {
          return     <Course key={index} course={course} />
           } )
  
     }



  <p className='w-full text-center   font-bold transition-all duration-500' >And many more comming soon......</p>


</div>

        </div>
  )
}

export default Courses
