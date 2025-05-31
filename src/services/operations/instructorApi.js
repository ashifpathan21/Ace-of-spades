
import { apiConnector } from "../apiConnector"
import { categories  , courseEndpoints} from "../apis"
import {setCourse} from '../../Slices/instructorCourseSlice'
import toast from 'react-hot-toast'



const {
  GET_ALL_COURSE_API,
  COURSE_DETAILS_API,
  EDIT_COURSE_API,
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  LECTURE_COMPLETION_API,
  CREATE_RATING_API ,
  ADD_QUESTION,
  UPDATE_QUESTION,
  GET_INSTRUCTOR_TOP_COURSES,
  DELETE_QUESTION ,
  ADD_OPTION,
  UPDATE_OPTION,
  DELETE_OPTION,
  ADD_CORRECT_OPTION,
  UPDATE_CORRECT_OPTION,
  DELETE_CORRECT_OPTION
} = courseEndpoints


export function getInstructorCourses(token){
    return async (dispatch) => {
      try {
        const response = await apiConnector('GET' , GET_ALL_INSTRUCTOR_COURSES_API , null ,  { Authorization: `bearer ${token}`} )
      
   
        if (!response?.data.success) {
          throw new Error("Could not Fetch Course categories")
        }
  
        const payload = response.data.data
        
       await dispatch(setCourse(payload))
  
        return response.data.data ;
      } catch (error) {
        // //(error)
      }
      
    }
  }

export function getInstructorTopCourses(token){
    return async (dispatch) => {
      try {
        const response = await apiConnector('GET' , GET_INSTRUCTOR_TOP_COURSES , null ,  { Authorization: `bearer ${token}`} )
      
        if (!response?.data.success) {
          throw new Error("Could not Fetch Course categories")
        }
      
  
        const payload = response.data.data
      
  
        return response.data.data ;
      } catch (error) {
        // //(error)
      }
      
    }
  }