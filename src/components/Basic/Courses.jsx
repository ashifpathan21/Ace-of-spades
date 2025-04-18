import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar.jsx";
import Modals from "./Modals.jsx";
import Category from "./Category.jsx";
import Tilt from 'react-parallax-tilt';
import { useNavigate } from 'react-router-dom'
import Course from "./Course";
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux';
import {getAllCourses} from '../../services/operations/coursesApi'
const Courses = () => {

  const dispatch = useDispatch() ;

  useEffect(() => {
    async function getCourses() {
      try {
        const courses =  await dispatch(getAllCourses())
      } catch (error) {
        toast.error('Something went wrong')
      }
    }
  
    getCourses()
    
  }, [])
  

  const { courses } = useSelector((state) => state.courses);

  return (
    <div className='p-4 ' >
      <h1 className='w-full text-center py-2 text-2xl font-bold transition-all duration-500'>Courses</h1>

      <div className='max-w-[900px] mx-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>

        {
          courses.map((course, index) => {
            return <Course key={index} course={course} />
          })

        }




      </div>

      <p className='w-full text-center   font-bold transition-all duration-500' >And many more comming soon......</p>

    </div>
  )
}

export default Courses
