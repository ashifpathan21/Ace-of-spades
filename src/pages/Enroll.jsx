import React, { useEffect, useRef , useState } from "react";
import { gsap } from "gsap";
import{ useLocation , useNavigate} from 'react-router-dom'
import Navbar from "../components/Basic/Navbar.jsx";
import { useParams } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import {addCourse } from './../services/operations/profileApi'
import toast from 'react-hot-toast'
import '../index.css'
import RatingAndReviews from "../components/RatingAndReviews.jsx";
import { FaStar } from "react-icons/fa";



const Enroll = () => {
  
  const [feedback , setFeedback ] = useState('')
  const [rating, setRating] = useState(5);
 
  const reviews = [
    {
      user: {
        firstName: "Rohan",
        lastName: "Mehta",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      rating: 4.5,
      review: "Amazing experience! The content was well-structured and easy to follow.",
      date: "April 20, 2025"
    },
    {
      user: {
        firstName: "Priya",
        lastName: "Sharma",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      rating: 5,
      review: "Perfect course! Loved every bit of it. The examples were super clear.",
      date: "April 18, 2025"
    },
    {
      user: {
        firstName: "Ankit",
        lastName: "Verma",
        image: "https://randomuser.me/api/portraits/men/52.jpg"
      },
      rating: 3.5,
      review: "Good course for beginners. Some advanced topics were missing though.",
      date: "April 15, 2025"
    },
    {
      user: {
        firstName: "Sneha",
        lastName: "Singh",
        image: "https://randomuser.me/api/portraits/women/68.jpg"
      },
      rating: 4,
      review: "Really helpful and well-paced. I would recommend it to my juniors.",
      date: "April 12, 2025"
    },
    {
      user: {
        firstName: "Mohit",
        lastName: "Yadav",
        image: "https://randomuser.me/api/portraits/men/27.jpg"
      },
      rating: 2,
      review: "Some modules were confusing, and support was a bit slow.",
      date: "April 10, 2025"
    }
  ];

  

  
  const addFeedback = (e) => {
    e.preventDefault() 
    try {


      
    } catch (error) {
      toast.error('Something Went Wrong')
    }
  }

  const [ratingReviewModal , setRatingReviewModal] = useState(true )

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
    const {id} =  useParams() ;
const navigate = useNavigate()
    const {courses} = useSelector((state) => state.courses)
   
    const [course , setCourse] = useState('') 

    if(!user){
      navigate('/login')
    }
    
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

  :  ratingReviewModal ? 
  //rating and review modal form 
   <div className='gap-10 flex-col backdrop-blur-2xl h-full min-h-screen  relative w-screen flex justify-center items-center  '>
      
      <h2 className='font-bold text-xl '>Give Your Feedback  </h2>
      <button onClick={() => setRatingReviewModal(false)} className='absolute right-10 top-20 '>      <i className="font-semibold text-2xl  ri-close-large-line"></i></button>

     <form onSubmit={addFeedback} className='max-w-[500px] w-full md:max-w-[650px] flex flex-col gap-3  lg:max-w-[800px] mx-auto backdrop-blur-3xl rounded-lg shadow shadow-cyan-300 p-4   '>
      
      <p>Review</p>
       <textarea required value={feedback} onChange={(e) =>  setFeedback(e.target.value)} name="" id="" rows="3" className='bg-white p-2  rounded-lg text-black resize-none border ' placeholder='Enter your Feedback'></textarea>




      <p>Rating</p>
     <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const current = index + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => setRating(current)}
           
            className="focus:outline-none"
          >
            <FaStar
              size={28}
              className={
                current <= ( rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        );
      })}
    </div>
      

      <button className={`p-2 text-xl capitalize  bg-green-400   rounded-lg mt-10  text-slate-200 font-semibold `}  type='submit'>Submit</button>
     </form>



  </div>  :  <div className='w-full pt-20 relative '>



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

         {  course?.price === 0 &&   <button onClick={() =>
              {user?.courses?.some(c => c._id === course._id) ? navigate(`/courses/progress/${course._id}`) :  addCourses()}
              } className={`p-2 text-xl capitalize ${user.courses.some(c => c._id === course._id) ? 'bg-green-400' :' bg-blue-400'} rounded-lg mt-10  text-slate-200 font-semibold `} 
              >
                {user?.courses?.some(c => c._id === course._id) ? "Go to Course" : "Enroll Now"}</button>
          }  </div>
       </div>

    </div>
//  disabled={user.courses.some(c => c._id === course._id) || user.accountType === 'Instructor'}
    }



            <div className='w-full h-full p-4 gap-4 mb-20 flex flex-col '>
          
            <h1 className='text-center font-bold text-xl '>Ratings & Review</h1>

            <RatingAndReviews reviews={reviews} />


              </div>


    </div>
  )
}

export default Enroll
