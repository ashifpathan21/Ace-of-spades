import { apiConnector } from "../apiConnector"
import { categories  , courseEndpoints} from "../apis"
import {setCourse} from '../../Slices/workingCourseSlice'
import {getInstructorCourses } from './instructorApi'
import toast from 'react-hot-toast'
import {setCourses} from '../../Slices/courseSlice'


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
  DELETE_QUESTION ,
  ADD_OPTION,
  UPDATE_OPTION,
  DELETE_OPTION,
  ADD_CORRECT_OPTION,
  UPDATE_CORRECT_OPTION,
  DELETE_CORRECT_OPTION
} = courseEndpoints

const {
    CATEGORIES_API
  } = categories

export function getAllCategories(navigate) {
   return  async (dispatch) => {
    try {
      const response = await apiConnector("GET", CATEGORIES_API)
     
      
      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories")
      }

      return response.data.data ;
     
    } catch (error) {
      // console.log("COURSE_CATEGORY_API API ERROR............", error)
      toast.error(error.message)
    }
  }
}

export function createNewCourse({
  courseName,
  courseDescription,
  whatYouWillLearn,
  price,
  category,
  status,
  thumbnail,
  instructions
} , token ) {
   return  async (dispatch) => {
    try {
      const response = await apiConnector("POST", CREATE_COURSE_API , {
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        category,
        status,
        thumbnail,
        instructions
      }, { Authorization: `Bearer ${token}`} )
     
      
      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories")
      }

      toast.success('Course Created ')
      const payload = response.data.data
      dispatch(setCourse(payload))
      return response.data.data ;
     
    } catch (error) {
      // console.log("COURSE_CATEGORY_API API ERROR............", error)
      toast.error('Something went wrong ')
    }
  }
}



export function deleteSectionn({
  sectionId,
  courseId
} , token ){
  return async (dispatch) => {
    


    try{
      
    const response = await apiConnector("POST", DELETE_SECTION_API , {
     sectionId , courseId 
    }, { Authorization: `Bearer ${token}`} )
   
   
    if (!response?.data?.success) {
      throw new Error("Could not Fetch Course categories")
    }

  
    const payload = response.data.data ;

    await dispatch(setCourse(payload))

  return response.data.data

  } catch (error) {
    // console.log("delete section  API ERROR............", error)
    toast.error('Something went wrong ')
  }

    
  }
} 

export function createSectionn({
  sectionName,
  courseId
} , token ){
  return async (dispatch) => {
    try{
    const response = await apiConnector("POST", CREATE_SECTION_API , {
     sectionName , courseId 
    }, { Authorization: `Bearer ${token}`} )
   if (!response?.data?.success) {
      throw new Error("Could not Fetch Course categories")
    }
    const payload = response.data.updatedCourse ;
    await dispatch(setCourse(payload))
  return response.data.updatedCourse
  } catch (error) {
    // console.log("create section  API ERROR............", error)
    toast.error('Something went wrong ')
  }
  }
} 

export function updateSection({
  sectionName ,
  sectionId,
  courseId,
  token
}){
return async (dispatch) => {
  try{
    const response = await apiConnector("POST", UPDATE_SECTION_API , {
     sectionName , sectionId , courseId 
    }, { Authorization: `Bearer ${token}`} )
   
   // console.log(response) 


    if (!response?.data?.success) {
      throw new Error("Could not Fetch Course categories")
    }

    const payload = response.data.data ;

    await dispatch(setCourse(payload))

  return response.data.data

  } catch (error) {
    // console.log("update section  API ERROR............", error)
    toast.error('Something went wrong ')
  }

}
}

export function updateSubSection({
sectionId ,
subSectionId,
title,
description,
videoUrl
}, token ){
  return async (dispatch) => {
    
    try{
      const response = await apiConnector("POST", UPDATE_SUBSECTION_API , {
        sectionId ,
        subSectionId,
        title,
        description,
        videoUrl
      }, { Authorization: `Bearer ${token}`} )
     
     // console.log(response) 
  
  
      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories")
      }
  
      const payload = response.data.data ;
  
     
  
    return response.data.data
  
    } catch (error) {
      // console.log("update subsection  API ERROR............", error)
      toast.error('Something went wrong ')
    }

  }
}


//get all published courses ;
export function getAllCourses(){
  return async (dispatch) => {
    try{
      const response = await apiConnector("GET", GET_ALL_COURSE_API  )
      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories")
      }
      const payload = response.data.data;
   
      // console.log(payload)
      await dispatch(setCourses(payload))
    return response.data.data
    } catch (error) {
      // console.log("Get course   API ERROR............", error)
      toast.error('Something went wrong ')
    }
  }
}


export function getCourseDetailsInstructor({
  courseId 
},
token){
  return async (dispatch) => {
    try{
      const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED , {
       courseId 
      }, { Authorization: `bearer ${token}`} )
      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories")
      }
      const payload = response.data.data.courseDetails ;
   
    return response.data.data.courseDetails
    } catch (error) {
      // console.log("Get course   API ERROR............", error)
      toast.error('Something went wrong ')
    }
  }
}



export function createSubSection({
  sectionId, title, description , videoUrl
} , token ){
  return async (dispatch) => {
    try{
      const response = await apiConnector("POST", CREATE_SUBSECTION_API , {
       sectionId , title , description , videoUrl 
      }, { Authorization: `bearer ${token}`} )

    
      
      if (!response?.data?.success) {
        throw new Error("Could not Fetch Course categories")
      }
     
     
    return response.data.data
    } catch (error) {
      // console.log("CREATE SUBSECTION  API ERROR............", error)
      toast.error('Something went wrong ')
    }
    
  }
}


export function addQuestion({
  subSectionId , questionText
} , token){
  return async (dispatch) => {
    try{
       const response = await apiConnector('POST' , ADD_QUESTION , {
        subSectionId , questionText
       }, { Authorization: `bearer ${token}`} )

      
       if (!response?.status === 201 ) {
         throw new Error("Could not Fetch Course categories")
       }
      
      
     return response.data.question

    }catch(error){
      // console.log("ADD QUESTION  API ERROR............", error)
      toast.error('Something went wrong ')
    }
  }
}
export function addOption({
  questionId , optionText
} , token){
  return async (dispatch) => {
    try{
       const response = await apiConnector('POST' , ADD_OPTION , {
        questionId , optionText
       }, { Authorization: `bearer ${token}`} )

     
       if (!response?.status === 201 ) {
         throw new Error("Could not Fetch Course categories")
       }
      
      
     return response.data.updateQuestion

    }catch(error){
      // console.log("ADD OPTION  API ERROR............", error)
      toast.error('Something went wrong ')
    }
  }
}



export function addCorrectOption({
 subSectionId , questionId , correctOption
}, token){
  return async (dispatch) => {
    try{
      const response = await apiConnector('POST' , ADD_CORRECT_OPTION , {
        subSectionId , questionId , correctOption
      }, { Authorization: `bearer ${token}`} )

     
      if (!response?.status === 201 ) {
        toast.error(response.data.message);
        return
      }
     
     
    return response.data.question

   }catch(error){
     // console.log("ADD OPTION  API ERROR............", error)
     toast.error('Something went wrong ')
     toast.error(error.message)
     
   }
    
  }
}



export function deleteSubSectionn({
sectionId,
subSectionId
}, token){
  return async (dispatch) => {
    try{
      const responce = await apiConnector('POST' , DELETE_SUBSECTION_API , {
        subSectionId , sectionId
      }, { Authorization: `bearer ${token}`} )

      if (!responce?.data?.success) {
        throw new Error("Could not Fetch Course categories")
      }


      return responce ;



    }catch(error){
      // console.log(error)
    }
  }
}



export function deleteQuestion({
  subSectionId , questionId
}, token ){
  return async (dispatch) => {
    try{
      const responce = await apiConnector('POST' , DELETE_QUESTION , {
        subSectionId , questionId
      }, { Authorization: `bearer ${token}`} )
    
      if (!responce?.status === 200) {
        throw new Error("Could not Fetch Course categories")
      }


      return questionId ;



    }catch(error){
      // console.log(error)
    }
  }
}

//only to update status now 
export function updateCourse({
  courseId ,
updates
} , token){
  return async (dispatch) => {
    try{
    
      const responce = await apiConnector('POST' , EDIT_COURSE_API , {
        courseId , updates
      }, { Authorization: `bearer ${token}`} )
    
      // console.log(responce)
      if (!responce?.data.success) {
        throw new Error("Could not Fetch Course categories")
      }


      return responce.data.data ;



    }catch(error){
      // console.log(error)
    }
    
    dispatch(getInstructorCourses(token)) ;

  }
}





export function delelteCourse(
  courseId
, token ){
  return async (dispatch) => {
    try{
      // console.log(courseId)
      const responce = await apiConnector('DELETE' , DELETE_COURSE_API , {
       courseId
      }, { Authorization: `bearer ${token}`} )
    // console.log(responce )
      if (!responce?.status === 200) {
        throw new Error("Could not Fetch Course categories")
      }
   

      return 



    }catch(error){
      // console.log(error)
    }
  }
}


//for lecture complete 
export function completeLecture({courseId , subsectionId , correctQuestions} , token){
  return async (dispatch) => {
    try{
      // console.log(courseId)
      const responce = await apiConnector('POST' , LECTURE_COMPLETION_API , {
       courseId , subsectionId , correctQuestions
      }, { Authorization: `bearer ${token}`} )
    // console.log(responce )
      if (!responce?.status === 200) {
        throw new Error("Could not Complete Lecture")
      }
   

      return responce.data



    }catch(error){
      // console.log(error)
    }


  }
}