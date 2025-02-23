import React from 'react'
import dsa from '../assets/dsa.jpg'

const Course = () => {
  return (
    <div className='p-2 flex border border-slate-700 rounded-lg  flex-col gap-2'>

    <img src={dsa} className='object-cover h-60 w-full drop-shadow-2xl rounded-lg ' />
     <div>
         <h2 className='font-semibold text-lg p-2'>Data Structures & Algorithm</h2>
      </div>
     <button className='bg-blue-600 hover:bg-blue-400 text-xl font-semibold rounded-md  w-full p-2 transition-all duration-1000'>
        Explore Now 
      </button>
  </div>
  )
}

export default Course

