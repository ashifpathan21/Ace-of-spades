import React  , { useState}from 'react'

const CourseProgress = (props) => {
    const [progress, setProgress] = useState(90)
  return (
    <div className="flex flex-col h-full gap-2 justify-between p-4 px-10  shadow-lg rounded-lg border border-gray-200 
    transition-all duration-300 hover:shadow-xl hover:border-gray-300">
   {/* course name  */}
  <h2 className='w-full p-2 text-left text-md  font-medium'>{props.name}</h2>

      <input 
   type="range" 
        max={100} 
     value={progress} 
   readOnly
   className="appearance-none rounded-lg  bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[10px] "
   style={{
  background: `linear-gradient(90deg, orange ${progress}%, white 10%)`
    }} 
     />

 <p className='text-gray-500 text-sm '>9/10</p>
 </div>

  )
}

export default CourseProgress
