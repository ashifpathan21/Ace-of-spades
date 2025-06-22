import React, { useEffect, useRef , useState } from "react";
import { gsap } from "gsap";
import{ useLocation , useNavigate} from 'react-router-dom'
import Navbar from "../components/Basic/Navbar.jsx";
import { useParams } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import {addCourse } from './../services/operations/profileApi'
import { fetchAverageRating  ,  sendFeedBack } from './../services/operations/ratingAndReview.js'
import toast from 'react-hot-toast'
import '../index.css'
import RatingAndReviews from "../components/RatingAndReviews.jsx";
import { FaStar } from "react-icons/fa";

const Enroll = () => {
  const [feedback , setFeedback ] = useState('')
  const [rating, setRating] = useState(5);
  const [reviewed , setReviewed] = useState(false)
  const [ratingReviewModal , setRatingReviewModal] = useState(false)
  const [loading , setLoading] = useState(false)
  const [reviews , setReviewes ] = useState([])
  const { user } = useSelector((state) => state.user);
  const {courses} = useSelector((state) => state.courses)
  const dispatch = useDispatch()
  const {id} =  useParams() ;
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [course , setCourse] = useState('')

  useEffect(() => {
    const payload = courses.filter((course) => course._id === id)[0];
    setCourse(payload);
    setReviewes(payload?.ratingAndReviews);
  }, [])

  useEffect(() => {
    if (!course?._id) return;
    async function getAverage() {
      setLoading(true)
      try {
        const responce = await dispatch(fetchAverageRating({courseId: course._id}));
        console.log(course)
        const already = course?.ratingAndReviews?.some(
          (review) => review?.user._id.toString() === user._id.toString()
        );
        if (already) {
          setReviewed(true)
        }
      } catch (error) {
        toast.error('Something went wrong')
      }
      setLoading(false)
    }
    getAverage()
  }, [course])

  const addFeedback = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const responce = await dispatch(sendFeedBack({ rating, review: feedback, courseId: course._id }, token))
    } catch (error) {
      toast.error('Something Went Wrong')
    }
    setLoading(false)
    setFeedback('')
    setRatingReviewModal(false)
  }

  async function addCourses() {
    try {
      const responce = await dispatch(addCourse({ courseId: course._id }, token, setLoading));
      if (responce) {
        navigate('/courses')
      }
    } catch (error) {
      toast.error('Something Went Wrong')
    }
  }

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <span className='loader'></span>
        </div>
      ) : ratingReviewModal ? (
        <div className='gap-10 flex-col backdrop-blur-2xl h-full min-h-screen relative w-screen flex justify-center items-center'>
          <h2 className='font-bold text-xl '>Give Your Feedback</h2>
          <button onClick={() => setRatingReviewModal(false)} className='absolute right-10 top-20'>
            <i className="font-semibold text-2xl ri-close-large-line"></i>
          </button>
          <form onSubmit={addFeedback} className='max-w-[500px] w-full md:max-w-[650px] flex flex-col gap-3 lg:max-w-[800px] mx-auto backdrop-blur-3xl rounded-lg shadow shadow-cyan-300 p-4'>
            <p>Review</p>
            <textarea required value={feedback} onChange={(e) => setFeedback(e.target.value)} rows="3" className='bg-white p-2 rounded-lg text-black resize-none border' placeholder='Enter your Feedback'></textarea>
            <p>Rating</p>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => {
                const current = index + 1;
                return (
                  <button key={index} type="button" onClick={() => setRating(current)} className="focus:outline-none">
                    <FaStar size={28} className={current <= rating ? "text-yellow-400" : "text-gray-300"} />
                  </button>
                )
              })}
            </div>
            <button className='p-2 text-xl capitalize bg-green-400 rounded-lg mt-10 text-slate-200 font-semibold' type='submit'>Submit</button>
          </form>
        </div>
      ) : (
        <div className='w-full pt-20 relative'>
          <h2 className='w-full capitalize text-center p-2 text-xl md:text-2xl lg:text-3xl font-semibold'>{course?.courseName}</h2>
          <div className='max-w-[1000px] mt-5 mx-auto  flex flex-col  p-3'>
            <div className='flex flex-col gap-3 justify-center mx-auto'>
              <img src={course?.thumbnail} className='object-cover h-60 rounded-lg border-2 border-gray-800' />
              <p className='capitalize font-bold text-sm'>By: {course?.instructor?.firstName + " " + course?.instructor?.lastName}</p>
            </div>
            <div className='px-2 mt-5 flex flex-col gap-2 w-full '>
              <h2 className='text-xl p-2 mt-3  list-disc font-semibold capitalize'>Course Description</h2>
              <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: course?.courseDescription }} />
              <h2 className='text-xl p-2  list-disc  mt-3 font-semibold capitalize'>What you will learn?</h2>
              <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: course?.whatYouWillLearn }} />
              <h2 className='text-xl capitalize p-2 mt-3 font-semibold'>Instructions</h2>
              <div className="prose  list-disc dark:prose-invert" dangerouslySetInnerHTML={{ __html: course?.instructions }} />
              {course?.price === 0 && (
                <button onClick={() => {
                  user?.courses?.some(c => c._id === course._id)
                    ? navigate(`/courses/progress/${course._id}`)
                    : addCourses()
                }} className={`p-2 text-xl capitalize ${user.courses.some(c => c._id === course._id) ? 'bg-green-400' : 'bg-blue-400'} rounded-lg mt-10 text-slate-200 font-semibold`}>
                  {user?.courses?.some(c => c._id === course._id) ? "Go to Course" : "Enroll Now"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {!ratingReviewModal && (
        <div className='w-full h-full p-4 gap-4 mb-20 flex flex-col'>
          <h1 className='text-center font-bold text-xl'>Ratings & Review</h1>
          <RatingAndReviews reviews={reviews} />
          {!reviewed && (
            <button onClick={() => setRatingReviewModal(true)} className='p-3 font-bold mt-10 text-lg bg-green-400 rounded-2xl text-white'>Add Review</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Enroll;
