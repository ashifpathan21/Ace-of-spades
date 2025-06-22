import React, { useState, useRef, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  updateCourse,
  getCourseDetailsInstructor
} from '../../services/operations/coursesApi';
import SectionForm from "./SectionForm";
import RichTextEditor from '../RichTextEditor.jsx';

const UpdateCourseForm = (props) => {
  const { courseId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [whatYouWillLearn, setWhatYouWillLearn] = useState('');
  const [price, setPrice] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [instructions, setInstructions] = useState('');
  const [stat , setStat] = useState('Draft');

  const { categories } = useSelector((state) => state.courses);
  const inputFile = useRef(null);
  const token = localStorage.getItem('token');

  function changeStage(num){
    props.setActiveStage(num);
  }

  useEffect(() => {
    setLoading(true);
    async function getCourse() {
      const responce = await dispatch(getCourseDetailsInstructor({ courseId }, token));
      setCourseName(responce.courseName);
      setCourseDescription(responce.courseDescription);
      setWhatYouWillLearn(responce.whatYouWillLearn);
      setPrice(responce.price === 0 ? 'free' : 'paid');
      setActualPrice(responce.price);
      setStatus(responce.status);
      setThumbnail(responce.thumbnail);
      setInstructions(responce.instructions);
      setCategory(responce.category?.name);
      setStat(responce.status);
      setLoading(false);
    }
    getCourse();
  }, []);

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
      } catch (error) {
        toast.error("Thumbnail upload failed");
      }
      setLoading(false);
    }
  };

  const completeCourse = () => {
    setWaiting(true);
    async function update() {
      try {
        const responce = await dispatch(updateCourse({ courseId, updates: { status: stat } }, token));
        toast.success('Course Updated Successfully');
        navigate('/instructor/courses');
      } catch (error) {
        toast.error("Update failed");
      }
      setWaiting(false);
    }
    update();
  };

  const changeStatus = (e) => {
    setStatus(e.target.value);
    setStat(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    async function upd() {
      try {
        const responce = await dispatch(updateCourse({
          courseId,
          updates: {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price: price === 'free' ? 0 : actualPrice,
            status,
            category,
            thumbnail,
            instructions
          }
        }, token));
        if (responce) {
          changeStage(2);
        } else {
          toast.error('Something went wrong, please try again.');
        }
      } catch (error) {
        toast.error("Update failed");
      }
      setLoading(false);
    }
    upd();
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-8 p-4">
      {props.activeStage === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="courseName" className="block text-gray-700 text-sm font-bold mb-2">
              Course Name:
            </label>
            <input
              type="text"
              id="courseName"
              required
              className="shadow bg-white border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="courseDescription" className="block text-gray-700 text-sm font-bold mb-2">
              Course Description:
            </label>
            <RichTextEditor
              id="courseDescription"
              required
              className="shadow border rounded bg-white w-full"
              placeholder="Enter course description"
              value={courseDescription}
              onChange={(value) => setCourseDescription(value)}
            />
          </div>

          <div>
            <label htmlFor="whatYouWillLearn" className="block text-gray-700 text-sm font-bold mb-2">
              What You Will Learn:
            </label>
            <RichTextEditor
              id="whatYouWillLearn"
              required
              className="shadow border rounded bg-white w-full"
              placeholder="Enter what students will learn"
              value={whatYouWillLearn}
              onChange={(value) => setWhatYouWillLearn(value)}
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Price:
            </label>
            <select
              id="price"
              required
              className="shadow border rounded bg-white w-full py-2 px-3 text-gray-700"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Select price</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            {price === 'paid' && (
              <div className="relative mt-2">
                <span className="absolute p-2">₹</span>
                <input
                  type="number"
                  required
                  className="shadow border rounded w-full bg-white py-2 px-5 text-gray-700"
                  placeholder="Enter price"
                  value={actualPrice}
                  onChange={(e) => setActualPrice(e.target.value)}
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
              className="shadow border rounded bg-white w-full py-2 px-3 text-gray-700"
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
              className="shadow border bg-white rounded w-full py-2 px-3 text-gray-700"
              onChange={onFileChange}
              ref={inputFile}
            />
            {thumbnail && <img src={thumbnail} alt="Thumbnail" className="mt-2 h-20 w-20 object-cover" />}
          </div>

          <div>
            <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">
              Instructions:
            </label>
            <RichTextEditor
              id="instructions"
              required
              className="shadow border bg-white rounded w-full"
              placeholder="Enter instructions"
              value={instructions}
              onChange={(value) => setInstructions(value)}
            />
          </div>

          <div className="flex justify-around mt-10">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Course'}
            </button>
            <button
              disabled={loading}
              onClick={() => changeStage(2)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {props.activeStage === 2 && (
        <SectionForm mode='update' changeStage={changeStage} courseId={courseId} />
      )}

      {props.activeStage === 3 && (
        <div className='bg-white rounded-lg text-black p-3'>
          <h2 className='text-center text-xl'>Publish Your Course</h2>
          <div className='w-[90%] mx-auto mt-10 rounded-lg shadow-xl mb-10'>
            <p className='p-2'>Set Status</p>
            <form className='w-full border rounded-lg'>
              <select
                required
                className='w-full p-3 px-4'
                value={status}
                onChange={changeStatus}
                name="status"
                id="status"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </form>
          </div>
          <div className='flex justify-center'>
            <button
              onClick={completeCourse}
              className='p-3 px-5 bg-green-400 text-white font-semibold rounded-lg'
            >
              {waiting ? 'Updating...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCourseForm;
