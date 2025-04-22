import React from 'react'
import {useNavigate } from'react-router-dom'
import {useSelector , useDispatch } from 'react-redux' 
const InstructorsCourses = (props) => {

    const {courses} = useSelector((state)=> state.instructorCourses)
    const navigate = useNavigate()
   


  return (
    <div className=' pb-4  max-w-[500px] mx-auto p-3 flex flex-col gap-5 md:max-w-[750px] mb-10 lg:max-w-[900px] '>
         <h2 className='font-semibold '>Your Published Courses</h2>
        {/* filterring the published course || pending ---have to memoize so that the whole page not load */}
    {  courses?.filter((course) => course.status === 'Published').map((course , index) => {
      let totalSubsections = 0 
      course.courseContent.map((section) => {
            totalSubsections +=  section.subSection.length
      })
        return <div key={index} onClick={() => {
          props.setCourseId(course._id);
          setTimeout(() => {
            props.setShowThisCourseDetails(true);
          }, 0);
        }}
         className=' hover:scale-105 shadow  shadow-cyan-300 hover:shadow-md rounded-xl p-3 flex flex-col ga-2 transition-all duration-300'>
              <h2 className=' text-xl font-semibold'>{course.courseName }</h2>
              <div className=' mt-2 flex w-full justify-between gap-2 p-1'>
                <p className=' text-sm  '>Total Sections: {course.courseContent.length}</p>
                <p className=' text-sm  '>Total SubSections: {totalSubsections}</p>
                <p className=' text-sm  ' >Students Enrolled: {course.studentsEnrolled.length}</p>

              </div>
        </div>
      })}

      <div>
        <button onClick={() => {
          navigate('/instructor/courses')
        }} className= 'hover:bg-cyan-200 shadow-cyan-300 shadow font-bold py-2 px-4 rounded '>Go to Courses</button>
      </div>
    </div>
  )
}

export default InstructorsCourses
