import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import{ createNewCourse , updateCourse , getCourseDetailsInstructor }from '../../services/operations/coursesApi'
import SectionForm from "./SectionForm";


const UpdateCourseForm = (props) => {



    const {courseId} = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    
    function changeStage(num){
      props.setActiveStage(num)
    }


    const [loading, setLoading] = useState(false);
    const [waiting , setWaiting] = useState(false);


    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [whatYouWillLearn, setWhatYouWillLearn] = useState('');
    const [price, setPrice] = useState('');
    const [actualPrice, setActualPrice] = useState(''); // new state for number input
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [instructions, setInstructions] = useState('');

      // Access categories from Redux store and coursesof user
    const { categories } = useSelector((state) => state.courses);
    const { courses } =  useSelector((state)=> state.instructorCourses)
       

    //fetching the course details without api call by redux and filter 
  useEffect(()=>{
    setLoading(true)
    async function getCourse() {
   
    const responce  = await dispatch(getCourseDetailsInstructor({courseId} , token))
    setCourseName(responce.courseName);
    setCourseDescription(responce.courseDescription)
    setWhatYouWillLearn(responce.whatYouWillLearn) ;
    setPrice(responce.price === 0 ? 'free' : 'paid');
    setActualPrice(responce.price);
    setStatus(responce.status);
    setThumbnail(responce.thumbnail);
    setInstructions(responce.instructions)
    setCategory(responce.category?.name)
    setLoading(false)
    setStat(responce.status)
    }
    getCourse()
  } , [])
  
  
   
   
    

    const token = localStorage.getItem('token')
    // Ref for the thumbnail input
    const inputFile = useRef(null);
  
  
    // Thumbnail upload handler
    const onFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        setLoading(true);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'aceofspades');
        data.append('cloud_name', 'dslhfux94');
        try {
          const res = await fetch('https://api.cloudinary.com/v1_1/dslhfux94/image/upload', {
            method: 'POST',
            body: data,
          });
          const uploadImageURL = await res.json();
          setThumbnail(uploadImageURL.url);
          setLoading(false);
        } catch (error) {
          // console.error('Error uploading thumbnail:', error);
          setLoading(false);
        }
      }
    };
  
  
    //set status 
  const completeCourse= () => {
    setWaiting(true)
     async function update() {
    try { 
      const responce = await dispatch(updateCourse({courseId ,updates:{status:stat} } , token))
      
      toast.success('Course Updated Successfully')
      navigate('/instructor/courses')
      } catch (error) {
       // console.log(error)
      }
      setWaiting(false)
      }
     update()
   }


const [stat , setStat] = useState('Draft')
  //make this because of some bug the state change but after we change it one more time 
  const changeStatus = (e) => {
    async function change() {

      setStatus(e.target.value)
      setStat(e.target.value)
       
  
    }
    change()
  }




    //course update ; 
    const handleSubmit = (e) => {
      e.preventDefault();
    setLoading(true);
    async function upd() {
        try {
           const responce  = await dispatch(updateCourse({courseId , updates:{
            courseName,
            courseDescription,
            whatYouWillLearn,
            price: price === 'free' ? 0 : actualPrice,
            status,
            category,
            thumbnail,
            instructions
           } } , token ))

          if(responce)
           changeStage(2)
          else{
            toast.error('Something went wrong , Please try again..')
          }
        } catch (error) {
            // console.log(error)
        }
        setLoading(false) }
     upd() 
   };
  




  return (
    <div className="max-w-[500px] p-4 md:max-w-[750px] lg:max-w-[1000px]  mx-auto mt-8">
    { props.activeStage === 1 &&   <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="courseName" className="block  text-gray-700 text-sm font-bold mb-2">
          Course Name:
        </label>
        <input
          type="text"
          id="courseName"
          required
          className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="courseDescription" className="block text-gray-700 text-sm font-bold mb-2">
          Course Description:
        </label>
        <textarea
          id="courseDescription"
          required
          className="shadow appearance-none border rounded bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter course description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="whatYouWillLearn" className="block  text-gray-700 text-sm font-bold mb-2">
          What You Will Learn:
        </label>
        <textarea
          id="whatYouWillLearn"
          required
          className="shadow appearance-none border rounded bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter what students will learn"
          value={whatYouWillLearn}
          onChange={(e) => setWhatYouWillLearn(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
          Price:
        </label>
        <select
          id="price"
          required
          className="shadow appearance-none border rounded w-full bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">Select price</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        {price === 'paid' && (
          <div className="flex relative  items-center mt-2">
            <span className="absolute p-2  mr-2">₹</span>
            <input
              type="number"
              required
              className="shadow  appearance-none border rounded w-full bg-white py-2 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter price"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)} // update actualPrice state
            />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
          Category:
        </label>
        <select
          id="category"
          required
          className="shadow appearance-none border rounded w-full bg-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories && categories.map((cat) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">
          Thumbnail:
        </label>
        <input
          type="file"
         
          id="thumbnail"
          className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={onFileChange}
    
          ref={inputFile}
        />
        {thumbnail && <img src={thumbnail} alt="Thumbnail" className="mt-2 h-20 w-20 object-cover" />}
      </div>
      <div>
        <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">
          Instructions:
        </label>
        <textarea
          id="instructions"
          required
          className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>
      <div className='w-full flex justify-around mt-10 items-center'>
        <button
        id='update'
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Course'}
        </button>
        <button disabled={loading}
        onClick={() => changeStage(2)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
         >
          Next
        </button>
      </div>
    </form>}


       {/* 2nd stage  */}


    {
      props.activeStage === 2 && 
      <SectionForm mode='update' changeStage={changeStage} courseId={courseId} />
    }

     
     {/* 3rd stage  */}

   {
    props.activeStage === 3 && <div>
      <div className='bg-white rounded-lg text-black p-3  '>
        <h2 className='w-full text-center text-xl '>Publish Your Course</h2>
        <div className='w-[90%] mt-10 mx-auto  rounded-lg mb-10 shadow-xl '>
           <p className='p-2 '>Set Status</p>
          <form className='w-full  border rounded-lg ' >
            <select required className='w-full p-3 px-4 ' value={status} onChange={(e)=> {
              changeStatus(e) ;
              setStatus(e.target.value)}} name="status" id="status">
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </form>    
        </div>
        <div className='w-full flex  justify-center'>

        <button type='submit' onClick={completeCourse} className='p-3 px-5 bg-green-400 text-white font-semibold rounded-lg  mx-auto  '>{waiting ? 'updating.......' : 'Submit'}</button>
        
        </div>    
      </div>
    </div>
   }


  </div>
  )
}

export default UpdateCourseForm
