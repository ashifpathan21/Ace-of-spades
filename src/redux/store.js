import { configureStore } from '@reduxjs/toolkit'
import pageReducer from '../Slices/pagesSlice.js'
import userReducer from '../Slices/userSlice.js'
import courseReducer from '../Slices/courseSlice.js'
import instructorCourseReducer from '../Slices/instructorCourseSlice'
import workingCourseReducer from '../Slices/workingCourseSlice'
export const store = configureStore({
  reducer: {
   pages: pageReducer,
   user: userReducer,
   courses: courseReducer,
   instructorCourses: instructorCourseReducer,
   createCourse:workingCourseReducer
  },
})