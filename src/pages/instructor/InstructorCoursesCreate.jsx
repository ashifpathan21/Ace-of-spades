import React , {useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CourseStage from '../../components/Course/CourseStage';
import CreateCourseForm from '../../components/Course/CreateCourseForm';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../services/operations/coursesApi';
import { setCategories } from "../../Slices/courseSlice"

const InstructorCoursesCreate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [activeStage , setActiveStage] = useState(1) ;
    

        return (
            <div>
                <button onClick={() => navigate('/instructor/courses')} className="absolute top-1  p-3 ">
                    <i className=" text-2xl font-semibold  ri-arrow-left-line"></i>
                </button>
                <h2 className="text-2xl font-semibold w-full text-center p-3">Create Course <i className="ri-pencil-fill"></i></h2>
                <div className="flex items-center  justify-center mt-4">
                    <CourseStage stage={1} activeStage={activeStage} completed={activeStage >= 2 ? true : false } />
                    <div className="w-10 h-1 bg-gray-300"></div>
                    <CourseStage stage={2} activeStage={activeStage} completed={activeStage >= 3 ? true : false } />
                     <div className="w-10 h-1 bg-gray-300"></div>
                    <CourseStage stage={3} activeStage={activeStage} completed={activeStage === 4 ? true : false } />
                </div>

                <CreateCourseForm activeStage={activeStage} setActiveStage={setActiveStage} />


            </div>
        );
     
      
   
}

export default InstructorCoursesCreate
