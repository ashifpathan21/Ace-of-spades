import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import{ createNewCourse , updateCourse}from '../../services/operations/coursesApi'
import SectionForm from "./SectionForm";
const CreateCourseForm = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  
  //function to move submitions
  function changeStage(num){
    props.setActiveStage(num)
  }


  
const [waiting , setWaiting] = useState(false)



  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [whatYouWillLearn, setWhatYouWillLearn] = useState('');
  const [price, setPrice] = useState('');
  const [actualPrice, setActualPrice] = useState(''); // new state for number input
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [courseId , setCourseId ] = useState('')

  
  const token = localStorage.getItem('token')
  // Ref for the thumbnail input
  const inputFile = useRef(null);

  // Access categories from Redux store
  const { categories } = useSelector((state) => state.courses);

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
        // //console.error('Error uploading thumbnail:', error);
        setLoading(false);
      }
    }
  };


  
const completeCourse= () => {
  setWaiting(true)

  
  
 
   async function update() {

  try {
    const responce = await dispatch(updateCourse({courseId ,updates:{status:stat} } , token))
// //(responce)
toast.success('Course Created Successfully')
navigate('/instructor/courses')
  } catch (error) {
    // //(error)
    
  }
  
  }
 
update()
setWaiting(false)

}
const [stat , setStat] = useState('Draft')
const changeStatus = (e) => {
  async function change() {
    // //(e.target.value)
    setStat(e.target.value)
    await setStatus(e.target.value)
    // //(status)
  }
  change()
}


  //course create 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setLoading(true) 
const finalPrice = price === 'free' ? 0 : actualPrice ;
  async function createCourse() {
        try{
          const course = await dispatch(createNewCourse({
            courseName,
      courseDescription,
      whatYouWillLearn,
      price: finalPrice,
      category,
      status:'Draft',
      thumbnail,
      instructions
          } , token  ))

          // //(course)
          setCourseId(course._id) ;
          props.setActiveStage(2);
          setLoading(false )
        }catch(error){
            toast.error('Something went Wrong') ;
        }  
    }
    createCourse() ;   
  };





  

  return (
    <div className="max-w-[500px] p-4 md:max-w-[750px] lg:max-w-[1000px]  mx-auto mt-8">
      { props.activeStage === 1 &&  <form onSubmit={handleSubmit} className="space-y-4">
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
            required
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
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Create Course'}
          </button>
        </div>
      </form>}
      {
        props.activeStage === 2 && 
        <SectionForm changeStage={changeStage} courseId={courseId} />
      }
     {
      props.activeStage === 3 && <div>
        <div className='bg-white rounded-lg text-black p-3  '>
          <h2 className='w-full text-center text-xl '>Publish Your Course</h2>
          
          <div className='w-[90%] mt-10 mx-auto  rounded-lg mb-10 shadow-xl '>
             <p className='p-2 '>Set Status</p>
            <form className='w-full  border rounded-lg ' >
              <select required className='w-full p-3 px-4 ' value={status} onChange={changeStatus} name="status" id="status">
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </form>
            
          </div>
          <div className='w-full flex  justify-center'>
          <button type='submit' onClick={completeCourse} className='p-3 px-5 bg-green-400 text-white font-semibold rounded-lg  mx-auto  '>{waiting ? 'Creating.......' : 'Submit'}</button>
          </div>
            
        </div>

      </div>
     }
    </div>
  );
};

export default CreateCourseForm;
