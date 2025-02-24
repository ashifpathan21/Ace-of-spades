import React from 'react'
import Course from "./Course.jsx";
const Courses = () => {
  return (
    <div className='p-4 ' >
        <h1 className='w-full text-center py-2 text-2xl font-bold transition-all duration-500'>Courses</h1>

<div className='max-w-[900px] mx-auto p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>

  <Course/>
  <Course/>
  <Course/>
  <Course/>




  <p className='w-full text-center   font-bold transition-all duration-500' >And many more comming soon......</p>


</div>

        </div>
  )
}

export default Courses
