import React , {useState ,useEffect } from 'react'
import{ useLocation , useNavigate} from 'react-router-dom'
import Navbar from "../components/Basic/Navbar.jsx";
import { useParams } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import {addCourse } from './../services/operations/profileApi'
import toast from 'react-hot-toast'
import '../index.css'
const Enroll = () => {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
    const {id} =  useParams() ;
const navigate = useNavigate()
    const {courses} = useSelector((state) => state.courses)
   
    const [course , setCourse] = useState('') 
    
    useEffect(() => {
     const  payload =   courses.filter((course) => course._id === id)[0] ; 
      setCourse(payload)
    
    } , [])
  
    const token = localStorage.getItem('token')
    const [loading , setLoading] = useState(false)

    async function addCourses() {

      try {
      const responce = await dispatch(addCourse({courseId:course._id} , token , setLoading)) ;
    if(responce){
      navigate('/courses')
    }

      }catch(error){
        toast.error('Something Went Wrong')
       
        
      }
    
      
    }

    return (
    <div>
      <Navbar/>

    {loading ? <div className='flex justify-center items-center min-h-screen'> 
      <span className='loader'></span>
    </div>

  :  <div className='w-full pt-20 relative '>
      <h2 className='w-full capitalize text-center  p-2 text-xl md:text-2xl justify-between lg:text-3xl font-semibold '>{course?.courseName}</h2>
          

       <div className='max-w-[500px] mt-5 mx-auto md:max-w-[750px] lg:max-w-[1000px] flex flex-col md:flex-row lg:flex-row p-3  '>
            
            <div className='flex flex-col gap-3 justify-center mx-auto '>
              <img src={course?.thumbnail} className=' object-cover  h-60 rounded-lg border-2 border-gray-800 ' />
              
              <p className='capitalize  font-bold text-sm'>By: {course?.instructor?.firstName + " " + course?.instructor?.lastName}
              </p>
            </div>
            
            <div className='px-2 mt-5 flex  flex-col gap-2  w-full md:max-w-[48%]  lg:max-w-[48%] '>
            <h2 className='text-xl p-2 mt-3 font-semibold capitalize' >Course Description</h2>
              <p className='px-2 '>
              {course?.courseDescription}
              </p>
              <h2 className='text-xl p-2 mt-3 font-semibold capitalize ' >What you will learn ?</h2>
              <ul className="space-y-2 p-2 list-disc">
  {course?.whatYouWillLearn
    ?.split(".") // Full stop पर तोड़ना
    .filter(line => line.trim() !== "") // खाली स्ट्रिंग हटाना
    .map((line, index) => (
      <li className='capitalize' key={index}>{line.trim()}.</li> // Extra space हटाकर return करना
    ))}
</ul>
              <h2 className='text-xl capitalize p-2 mt-3 font-semibold  ' >Instructions</h2>
              <ul className="space-y-2 capitalize p-2 list-disc">

  
   {course?.instructions?.flatMap((inst) =>
    inst
      ?.split(".") // Full stop पर तोड़ना
      .filter((line) => line.trim() !== "") // खाली स्ट्रिंग हटाना
      .map((line, index) => (
        <li key={index}>{line.trim()}.</li> // Extra space हटाकर return करना
      ))
  )}
   
</ul>

         {  course.price === 0 &&   <button onClick={() =>
              {user.courses.some(c => c._id === course._id) ? navigate(`/courses/progress/${course._id}`) :  addCourses()}
              } className={`p-2 text-xl capitalize ${user.courses.some(c => c._id === course._id) ? 'bg-green-400' :' bg-blue-400'} rounded-lg mt-10  text-slate-200 font-semibold `} 
              >
                {user.courses.some(c => c._id === course._id) ? "Go to Course" : "Enroll Now"}</button>
          }  </div>
       </div>

    </div>
//  disabled={user.courses.some(c => c._id === course._id) || user.accountType === 'Instructor'}
    }
    </div>
  )
}

export default Enroll
