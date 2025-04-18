import React , {useState ,useEffect } from 'react'
import{ useLocation , useNavigate} from 'react-router-dom'
import Navbar from "../components/Basic/Navbar.jsx";
import { useParams } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import toast from 'react-hot-toast'
import {completeLecture} from '../services/operations/coursesApi.js'
import '../index.css'
const Task = () => {
    

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const {id} =  useParams() ;
    const navigate = useNavigate()
   const [loading , setLoading] = useState(false ) ;
   const {courses} = useSelector((state) => state.courses)
    const [sectionName , setSectionName] = useState('')
   const [subSection , setSubSection ] = useState({})
   const [questionModal , setQuestionModal ] = useState(false) ;
   const [questions , setQuestions] = useState([])
   const [correctOption , setCorrectOption] = useState([])
   const [questionIndex , setQuestionIndex]  = useState(0) ;
const [choose , setChoose] = useState('')
const [submitted , setSubmitted ] = useState(false)


const token = localStorage.getItem('token') ;

const [correctQuestions , setCorrectQuestions] = useState([])
//to match the question 
const match = () => {
  if(questions[questionIndex].correctOption.options === choose){
    setCorrectQuestions((prev) => [...prev, questions[questionIndex]._id]);
// console.log(correctQuestions)
toast('Correct!', {
  icon: '👏',
});
  }else{
    toast.error('Oops!');
  }
  setCorrectOption(questions[questionIndex].correctOption.options)
  setSubmitted(true) ;
  // console.log(submitted)
}

const [disable , setDisable] = useState(false)

const next = async() =>{
  if(questions.length === questionIndex+1 ){
    try {
      setDisable(true)
      const responce = await dispatch(completeLecture({courseId:id , subsectionId:subSection._id , correctQuestions} , token))
    if(responce) {
      toast.success('Task Completed') ;
      navigate(`/courses/${id}`)}
    } catch (error) {
      toast.error(error.message) ;
    }
    setDisable(false)
  }else{
    setQuestionIndex(questionIndex+1) ;
    setSubmitted(false)
  }

}

useEffect(()=> {


    setLoading(true)  ;
  
   const course =  courses.filter((course) => course._id === id)[0] ;
   const compSubsec = user.courseProgress.filter((coursePro) => coursePro.courseID === id)[0]?.completedVideos
   const index =  compSubsec?.length ;
   let complete = compSubsec?.length ;
    let section;
    let subSection;
    
    for (let i = 0; i < course?.courseContent?.length; i++) {
        if (course.courseContent[i].subSection.length > complete) {
            section = course.courseContent[i];
            subSection = section.subSection[complete ];
            break;
        } else {
          // console.log(complete)
            complete -= course.courseContent[i]?.subSection?.length;
            // console.log(complete)
        }
    }

    setSectionName(section?.sectionName || '');
    setSubSection(subSection || {});
  setQuestions(subSection?.questions || [])
   setLoading(false)


} , [])

// console.log(subSection)
function convertYouTubeURL(url) {
  let videoID, startTime = "", endTime = "";

  // Regular expressions to extract video ID and parameters
  let regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/|live\/))([^?&]+)/;
  let match = url?.match(regex);
  if (match) {
      videoID = match[1]; // Extract video ID

      let urlParams = new URLSearchParams(url.split("?")[1]);
      if (urlParams.has("t")) {
          startTime = `?start=${urlParams.get("t").replace("s", "")}`; // Extract start time
      }
      if (urlParams.has("end")) {
          endTime = `${startTime ? "&" : "?"}end=${urlParams.get("end")}`; // Extract end time
      }

      return `https://www.youtube.com/embed/${videoID}${startTime}${endTime}`;
  }
  return url ;
}

const videoUrl = convertYouTubeURL(subSection?.videoUrl) ;


   if(loading){
    return (
    <div className='w-screen h-screen flex justify-center items-center'>
        
  <span className='loader text-black font-bold'></span>
    </div>)
  
   }

   if(!sectionName){
    return (
    <div className='min-h-screen relative flex justify-center items-center font-bold text-xl '>
      <button onClick={() => navigate('/courses')} className='absolute top-2 left-2 '>Go to Courses</button>
      Coming Soon...
    </div>)
   }
  return (
    <div>
      <Navbar/> 
{ questionModal ?
 <div className='pt-20 p-3 flex flex-col gap-5'>
<h2 className='text-center font-semibold text-lg'>Questions</h2>

<div className='capitalize px-4 text-lg'>
  <p>{`Q${questionIndex+1}: ${questions[questionIndex].questionText}`}</p>
</div>

<ul className='gap-2 px-5 list-decimal marker:text-black list-inside flex flex-col'>


  { submitted ? questions[questionIndex].options.map((option) => 
    <li
    className={`${correctOption === option.options ? "bg-green-500" : ""} 
                ${choose === option.options ? (choose === correctOption ? "bg-green-500 " : "bg-red-500 ") : ""}
                cursor-pointer p-2 backdrop-blur-3xl rounded-lg   shadow-black shadow-sm`}
  >
    {option.options}
  </li>
  ) 

    :
     questions[questionIndex].options.map((option) => 
      <li className={`${option.options === choose ? 'bg-blue-500' : "hover:bg-slate-300"} transition-all duration-200 p-2 backdrop-blur-3xl rounded-lg  shadow-black shadow-sm cursor-pointer`} 
    onClick={
    () => {
    setChoose(option.options)
    }
  }>
      {option.options}
    </li>
  )}
</ul>



<div className='w-full flex flex-col items-center justify-center'>
<button className='bg-green-400 text-white px-5 p-3 mt-4 shodow-sm shadow-slate-600 rounded-lg  ' disabled={submitted} onClick={match}>{submitted ?"Submitted" :"Submit"}</button>
{submitted && <button className='bg-green-400 text-white px-5 p-3 mt-4 shodow-sm shadow-slate-600 rounded-lg  '  disabled={disable}  onClick={next}>Next</button>}
</div>



</div> :

      
      <div className='pt-20 flex flex-col  min-h-screen'>
            <div className='w-full flex justify-center items-center font-bold uppercase text-2xl'>
              <h2>{sectionName}</h2>
            </div>
     
            <div className='p-4 px-6 flex flex-col gap-5  '>
              <h3 className='font-semibold w-full text-center text-xl capitalize '>{subSection?.title}</h3>

            <div className='w-full flex justify-center items-center p-3 mt-5 '>
            <iframe 
  className="w-full aspect-video rounded-lg shadow-lg"

  src={videoUrl}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
  allowFullScreen
></iframe>
</div>
             <div className='w-full p-3  '>
              <p className='text-center font-bold text-lg pb-3'>SUMMARY</p>
              <div className='max-w-[600px]  md:max-w-[750px] lg:max-w-[850px] mx-auto mt-3'>
              <textarea   style={{ height: `${Math.min(450, Math.max(200, subSection?.description?.length ))}px` }}
                className="w-full p-2 resize-none h-full  rounded-lg"
                value={subSection?.description}
                readOnly
              />
              </div>
           
             </div>
          
          <div className='w-full flex justify-center'>
          <button onClick={() =>subSection?.questions?.length > 0 ? setQuestionModal(true) : next()} className='mt-10 bg-blue-500 text-white font-semibold rounded-xl p-3 block px-8 '>
            {subSection?.questions?.length > 0 ? "Practice Questions": "Complete"}
          </button>
          </div>
       

            </div>
      </div>
}
      
    </div>
  )
}

export default Task
