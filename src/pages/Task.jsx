import React , {useState ,useEffect } from 'react'
import{ useLocation , useNavigate} from 'react-router-dom'
import Navbar from "../components/Basic/Navbar.jsx";
import { useParams } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import toast from 'react-hot-toast'
import {completeLecture} from '../services/operations/coursesApi.js'
import Footer from '../components/Basic/Footer.jsx'
import '../index.css'
const Task = () => {

  function convertSecondsToMinutes(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }
  

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




const toggleSection = (index) => {
  setOpenSections((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};

const [compl , setCompl] = useState(true) ;



const token = localStorage.getItem('token') ;

const [correctQuestions , setCorrectQuestions] = useState([])
//to match the question 
const match = () => {
  if(questions[questionIndex].correctOption.options === choose){
    setCorrectQuestions((prev) => [...prev, questions[questionIndex]._id]);
// //(correctQuestions)
toast('Correct!', {
  icon: '👏',
});
  }else{
    toast.error('Oops!');
  }
  setCorrectOption(questions[questionIndex].correctOption.options)
  setSubmitted(true) ;
  // //(submitted)
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

const [selectedCourse , setSelectedCourse] = useState({})

useEffect(()=> {


    setLoading(true)  ;
  
   const course =  courses.filter((course) => course._id === id)[0] ;
   setSelectedCourse(course)
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
          // //(complete)
            complete -= course.courseContent[i]?.subSection?.length;
            // //(complete)
        }
    }
    
    const defaultSectionName = course?.courseContent[0]?.sectionName
    const defaultSubSection = course?.courseContent[0]?.subSection[0]

    if(subSection){
      setCompl(false)
    }
    setSectionName(section?.sectionName || defaultSectionName);
    setSubSection(subSection || defaultSubSection);
  setQuestions(subSection?.questions || defaultSubSection?.questions)
   setLoading(false)


} , [])


const [openSections, setOpenSections] = useState({}) ;

useEffect(() => {
  if (selectedCourse?.courseContent) {
    const initialState = {};
    selectedCourse.courseContent.forEach((_, index) => {
      initialState[index] = true;
    });
    setOpenSections(initialState);
  }
}, [selectedCourse]);

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


  const changeSubsection = (subsect) => {
    const compSubsec = user.courseProgress.find((coursePro) => coursePro.courseID === id)?.completedVideos || [];

const isCompleted = compSubsec.some((section) => section.subSection._id === subsect._id);
setCompl(isCompleted);

    setSubSection(subsect)
    setQuestions(subsect?.questions)
   }

  
  return (
    <div className=''>
      <Navbar/> 
{ questionModal ?
 <div className='pt-20  p-3 flex flex-col gap-5'>
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


<div className='pt-20 flex flex-col md:flex-row lg:flex-row gap-10 p-4  w-full justify-between min-h-screen' >

                       {/* video element */}
                       <div className=' w-full flex flex-col  min-h-screen'>


                 
                  
                  <div className='p-4 px-2 flex flex-col gap-5  '>
  <h3 className='font-semibold w-full text-slate-400 text-lg capitalize '>{ selectedCourse?.courseName?.slice(0, 10) + '...>'  + sectionName + ">" + subSection?.title?.slice(0, 10) + ".."}</h3>

                  <div className='w-full flex justify-center items-center  mt-5 '>
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
                   <p className='text-center capitalize font-bold text-lg pb-3'>{subSection?.title}</p>
                   <div className='max-w-[600px]  md:max-w-[750px] lg:max-w-[850px] mx-auto mt-3'>
                   <textarea   style={{ height: `${Math.min(450, Math.max(200, subSection?.description?.length ))}px` }}
                     className="w-full capitalize p-2 resize-none h-full  rounded-lg"
                     value={subSection?.description}
                     readOnly
                   />
                   </div>

                   </div>
                  
                  <div className='w-full flex justify-center'>
                  {!compl && <button onClick={() =>subSection?.questions?.length > 0 ? setQuestionModal(true) : next()} className='mt-10 bg-blue-500 text-white font-semibold rounded-xl p-3 block px-8 '>
                  {  subSection?.questions?.length > 0 ? "Practice Questions": "Complete"}
                  </button>}
                  </div>


                  </div>




                  </div>

{/* right area  */}
     
     <div  className='p-4 px-6 flex gap-4 flex-col backdrop-blur-4xl   shadow-md shadow-emerald-200   rounded-lg md:w-[45%] lg:w-[45%]  w-full   h-full py-10 self-start ' >
     
     
      <div className='text-xl  font-semibold '>
         {selectedCourse?.courseName}
      </div>

     <div className='w-full bg gap-3 flex flex-col  h-full '>
       {
        selectedCourse?.courseContent?.map((section , index) => {

           
  

          return (  <div className='relative w-full backdrop-blur-5xl   shadow-md shadow-cyan-200 rounded-lg p-4 ' key={index}>

           <h2 className=' uppercase font-semibold '>{section?.sectionName}</h2>
          
           <button
  onClick={() => toggleSection(index)}
  className={`absolute right-0 top-0 p-4 text-2xl font-bold transition-all  ${openSections[index] ? 'rotate-180' : 'rotate-0'} duration-300`}
>
  <i className={`ri-arrow-down-double-line transition-transform duration-300 `}></i>
</button>



            <p className=' text-sm text-slate-600  '>{section?.subSection?.length > 0 ? section?.subSection?.length + " Lesson" : "" }</p>
             {openSections[index] &&  
              
                (section?.subSection?.length > 0 ?
                 
                <div onClick={() => {
                  setSectionName(section?.sectionName)
                 }} className='  shadow-xl mt-2  rounded-lg  flex flex-col gap-2 '>
{
                section?.subSection?.map((subsect , index) => {
                  return (
                    <div onClick={() => {
                     changeSubsection(subsect) ;
                    }} className={`capitalize flex p-2 rounded-lg shadow-fuchsia-200 shadow ${subSection._id === subsect._id ? " bg-cyan-400 " : 'hover:bg-cyan-300'}   transition-all duration-200 `}   key={index}>
                   <button className='p-2 '>
                   <i class="font-bold text-xl ri-play-mini-line"></i>
                   </button>
                   
                   <div className='w-full text-md'>
                   <h3 className=''>{" " + subsect?.title}</h3>
                   <p className='px-1 text-slate-500 text-sm '>{convertSecondsToMinutes(subsect?.timeDuration)}</p>
                   </div>
                     
                    </div>
                  )
                })}
                </div>
                
                :
                <p>Comming Soon ..</p>
               )
             }
               
          </div>)
        })
       }
     </div>


     </div>



</div>
}


{
  !questionModal && <Footer/>
}

</div>





      
     
  )


}

export default Task
