import React , {useState } from 'react';
import {delelteCourse} from '../../services/operations/coursesApi'
import {getInstructorCourses} from '../../services/operations/instructorApi'
import {useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import{toast} from 'react-toastify'



const CourseCard = ({ course }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const token = localStorage.getItem('token')
   const [waiting , setWaiting] = useState(false)

   //function to delete course
   const delet = async () => {
    setWaiting(true)
      try {
         const responce = await dispatch(delelteCourse( course._id, token ))
         const res = await dispatch(getInstructorCourses(token))
         toast.success('Course Deleted ')
      }catch(error) {
         // //(error)
      }
     setWaiting(false)
   }


//function to update card by navigating to the update page ;
   const update = () => {
       navigate('update' , { state : {courseId: course._id}})
   }


  return (
    <div className="shadow shadow-cyan-200  rounded-lg flex justify-between  hover:shadow-md hover:scale-105 transition-all duration-500  p-4">
        <div>
           <h3 className="text-lg font-semibold mb-2">{course.courseName}</h3>
           


        </div>
     
     {
   waiting ? 'Wait....' : <div className='flex justify-between items-center gap-2 p-3 '>
   <button onClick={update} className='text-xl font-semibold  p-2 '><i className="ri-pencil-fill"></i></button>
   <button onClick={delet} className='text-lg font-semibold  p-2 ' ><i className="ri-delete-bin-6-fill"></i></button>
</div>

     }
     
    </div>
  );
};

export default CourseCard;
