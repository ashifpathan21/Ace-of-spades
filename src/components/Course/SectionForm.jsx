import React , {useState , useEffect} from 'react'
import toast from 'react-hot-toast'
import {createSectionn , deleteSectionn , updateSection , updateSubSection , getCourseDetailsInstructor , createSubSection , deleteSubSectionn} from '../../services/operations/coursesApi'
import {useSelector , useDispatch} from 'react-redux'
import QuestionForm from './QuestionForm'
import {getInstructorCourses} from '../../services/operations/instructorApi'
const SectionForm = (props) => {


  const {courses} = useSelector((state)=> state.instructorCourses)
  const {course} = useSelector((state) => state.createCourse)

  //index when create course we dont share course id when creating or if we do it cant impact 
const index =  courses.length - 1 
const courseId = props.courseId  || courses[index]._id ;
const {changeStage} = props ;

const dispatch = useDispatch()
const token = localStorage.getItem('token')




const [mode , setMode] = useState('Create')
const [moding , setModing] = useState('Creating...')
const [waiting , setWaiting] = useState(false)
const [loading, setLoading] = useState(false )

//all modals 
const [createSectionModal, setCreateSectionModal] = useState(false) ;
const [subsectionModal , setSubsectionModal] = useState(false)
const [questionModal , setQuestionModal] = useState(false);




//section contains only name 
const [sectionName, setSectionName] = useState('')

//subsection contain title description video url and question by question modal 
const [title , setTitle] = useState('');
const [description , setDescription ] = useState('') ;
const [videoUrl , setVideoUrl] = useState('')


const [sections , setSections] = useState('')
const [subsections , setSubsections] = useState([])


const [sectionId , setSectionId] = useState('') ;
const [subsectionId , setSubsectionId] = useState('')



///works when already course present (update condition )
useEffect(()=>{
async function getSec() {
  setLoading(true)
  const courseDetails = await dispatch(getCourseDetailsInstructor({courseId }, token))
  setSections(courseDetails?.courseContent) ;
  setLoading(false) ;
}
getSec()
}, [courseId, createSectionModal, subsectionModal, questionModal , waiting])







//sections 

   //create section 
  function createSection(e) {
    e.preventDefault() ;
    setLoading(true) ;
    async function section() {
      try{
        const payload = await dispatch(createSectionn({sectionName , courseId} , token)) ;  
        setSectionName('')
        setLoading(false);
        setCreateSectionModal(false) ;
      }catch(err){
        // console.log(err)
        toast.error('Something Went Wrong ')
      }
    }
      section()
}

//update section 
function update(id){

  async function updateSec() {
    try{
      const payload = await dispatch(updateSection({sectionName , sectionId , courseId , token }))
      }catch(err){
              // console.log(err)
              toast.error('Something Went Wrong ')
            }}
  updateSec()
  setCreateSectionModal(false) ;
  setSectionName('')
    setMode('Create');
    setModing('Creating...')
  }
  
  //delete sections 
  function deleteSection(id){
    async function deleteSec() {
      setWaiting(true)
      try{
        const payload = await dispatch(deleteSectionn({sectionId:id , courseId} , token)) ;  
     
        setWaiting(false);
       
      }catch(err){
        // console.log(err)
        toast.error('Something Went Wrong ')
      }
    }

    deleteSec()

}






//subsections 

//create subsec 

function createSubsectionn(e){
  e.preventDefault() ;
async function subSec() {
  setWaiting(true)
  try {
    const payload = await dispatch(createSubSection({sectionId , title , description , videoUrl } , token )) ;
    // console.log(payload)
    let subS =  payload.subSection ;
    // console.log(subS)
      let index = subS.length -1 ;
      // console.log(index)
    setSubsectionId(subS[index]._id);
  } catch (error) {
    // console.log(error)
    toast.error('Something Went Wrong ')
  }
  setWaiting(false)
  setQuestionModal(true)
}
subSec()
}

//update subsec
function updateSub(e){
  e.preventDefault()
  setWaiting(true) ;
  async function upd() {
    try {
      setLoading(true)
      const payload = await dispatch(updateSubSection({sectionId , subSectionId: subsectionId , title , description , videoUrl} , token))
      setQuestionModal(true)
     
    } catch (error) {
      // console.log(error)
    }
    setWaiting(false)
  }
  upd()
}
 
//delete subsec
  function deleteSubSection(id , secId) {
    async function del() {
  
      setWaiting(true)
   
      try {
        const responce = await dispatch(deleteSubSectionn({ sectionId:secId ,subSectionId:id  }, token))
     await dispatch(getCourseDetailsInstructor({courseId} , token))
      } catch (error) {
        // console.log(error)
        toast.error('Something Went Wrong')
      }
      setWaiting(false)
    }
    del()
}

  






// useEffect(() => {
// async function getCourse() {
//   setWaiting(true)
//    const responce = await dispatch(getCourseDetailsInstructor({courseId }, token))
//    // console.log(responce)
//   setWaiting(false)
// }
// getCourse()
// } , [])


  

  return (
       createSectionModal ?
  <div className='min-h-[90vh]'>
<div className='min-h-[90vh]   h-full left-0  w-screen absolute top-0   flex p-10    justify-center   backdrop-blur-3xl '>
<button onClick={() => { 
  setSectionName('');
  setCreateSectionModal(false )
}} className="absolute top-5 right-10 ">
<i className="font-semibold text-2xl  ri-close-large-line"></i>
                </button>
         <form onSubmit={(e)=> {
          mode === 'Create' ?
          createSection(e) : update(sectionId)
         }} className='space-y-1 max-w-[500px]  md:max-w-[750px] mt-30  lg:max-w-[1000px]   ' >
        <label htmlFor="sectionName" >Section Name</label>
       <input type="text" id='sectionName' required  className='bg-white w-full p-2 rounded-lg text-black' value={sectionName} onChange={(e)=>{
        setSectionName(e.target.value)
       }} placeholder='enter section name' />
          <button  className=' mx-auto  bg-green-400 text-white font-semibold rounded-lg px-5 mt-5  p-2 block '>{loading? moding : mode }</button>
      </form>
       </div> 
  </div>
       


       :  
       
       
       
       
       subsectionModal ?
       
       
       
       questionModal ? 
      
   

          
            <QuestionForm courseId={courseId } sectionId={sectionId} changeStage={changeStage} setSubsectionModal={setSubsectionModal} setQuestionModal={setQuestionModal} subsectionId={subsectionId} />
          
      
     
       :
     //  subsectionForm
     <div className='min-h-[90vh]'>
     <div className='min-h-[90vh]   h-full left-0  w-screen absolute top-0   p-10      backdrop-blur-3xl '>
     <button onClick={() => {   
       setSubsectionModal(false )
     }} className="absolute top-5 right-10 ">
     <i className="font-semibold text-2xl  ri-close-large-line"></i>
                     </button>

             <h2 className='w-full text-center font-semibold text-xl'>{mode} SubSection</h2>
         <form onSubmit={(e) => {
         mode === 'Create' ?  createSubsectionn(e) : updateSub(e)
          }} className='gap-4 p-3 mt-10 flex flex-col '>
           <div className='flex flex-col '> 
             <label htmlFor="title">Title</label>
             <input type="text" id='title' value={title} onChange={(e) => {
              setTitle(e.target.value)
             }} required placeholder='Enter Title' className='bg-white rounded-lg px-3 text-black p-2 ' />
           </div> 


           <div className='flex flex-col '> 
             <label htmlFor="video">Video URL</label>
             <input type="text" id='video' value={videoUrl} onChange={(e)=>{
              setVideoUrl(e.target.value)
             }} required placeholder='Paste Video URL' className='bg-white rounded-lg px-3 text-black p-2 ' />
           </div> 


          <div className='flex flex-col '>
             <label htmlFor="summary">Summary</label>
            <textarea name="summary" id="summary" value={description} onChange={(e)=>{
              setDescription(e.target.value)
            }} required placeholder='Enter summary of the video' className='bg-white rounded-lg px-3 resize-none text-black p-2 ' ></textarea>
          </div>


 <div className='flex justify-between w-full gap-3 mt-10 '>

 <button type='submit' disabled={waiting}
              className='bg-green-400 text-white font-semibold p-3 px-4  rounded-lg '>
              {waiting ? moding : mode }
             </button>
{  mode === 'Update' &&
             <button onClick={() => setQuestionModal(true)}  disabled={waiting}
              className='bg-green-400 text-white font-semibold p-3 px-4  rounded-lg '>
              Next
             </button>}
 </div>



         </form>

        </div>
    </div>




: 





       <div>
       <div className='min-h-screen h-full  ' >
       <div className='w-full mb-5  flex items-center  justify-between'>
         <p className='p-2 font-semibold text-lg'>Create Chapters </p>
         <button onClick={()=>{
          setSectionName()
          setMode('Create')
          setModing('Creating...')
          setCreateSectionModal(true)
         }} className=' bg-green-400 text-white font-semibold rounded-lg px-3 p-2 block '>New Section </button>
        </div>
         {
          waiting ? <div className='w-full h-full justify-center items-center '>
          updating.....
          </div>



           : 




            <div className='flex flex-col gap-3 '>
          {
            sections?.length>0 && sections.map((section , index) => {
              return <div key={index} onClick={()=>{
                setSectionId(section._id)
              }}>
              
             <div className='flex bg-white p-3 rounded-lg py-4 text-black justify-between w-full'>

                <h2 className='text-xl uppercase '>{section.sectionName}</h2>
                <div className='px-3 flex gap-3 '>
                <button onClick={()=>{
                  setSectionId(section._id)
                  setSectionName(section.sectionName)
                  setMode('Update')
                  setModing('Updating...')
                  setCreateSectionModal(true)
                 
                 }} ><i className=" text-xl font-semibold ri-pencil-fill"></i></button>
                <button onClick={()=>{
                  setSectionId(section._id)
                  deleteSection(section._id)
                 }} > <i className=" text-xl font-semibold ri-delete-bin-5-fill"></i></button>
                 <button onClick={()=>{
                  setSectionId(section._id)
                  setTitle('')
                  setVideoUrl('')
                  setDescription('')
                     setMode('Create')
                     setModing('Creating...')



                  setSubsectionModal(true)
                 }} > <i className=" text-xl font-semibold ri-add-large-line"></i></button>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-full bg-white pb-4 -mt-1 rounded-lg '>
          
                {
                  section?.subSection?.map((subSect , index)=> {
                    return <div key={index} className='px-7 flex justify-between bg-white text-black  ' >
                    <h2>{subSect.title}</h2>

       <div className='flex gap-4 p-1 '>
          <button onClick={()=>{
                  setSectionId(section._id)
                  setSubsectionId(subSect._id)
               setTitle(subSect.title)
               setVideoUrl(subSect.videoUrl)
               setDescription(subSect.description)
                  setMode('Update')
                  setModing('Updating...')
                  setSubsectionModal(true)
                 
                 }} ><i className=" text-xl font-semibold ri-pencil-fill"></i></button>


                    <button onClick={()=>{    
                      deleteSubSection(subSect._id , section._id)
                      }} > <i className=" text-xl font-semibold ri-delete-bin-5-fill"></i></button>
          </div>
                  
                    </div>
                  })
                }
                </div>
              </div>
            })
            }
             </div>
           }




       
       { sections?.length > 0 ? 
         <div className ='w-full flex justify-center items-center'>
         <button onClick={()=> {
          changeStage(3)
         }} className='bg-green-400 text-white rounded-lg mt-10 px-5  font-semibold p-3  '>Next</button>
       </div> : ''}



        </div>
       </div> 
      


       
        
  )
}

export default SectionForm
