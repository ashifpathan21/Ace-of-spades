import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    courses: JSON.parse(sessionStorage.getItem('instructor-courses') ) || [],//have to fetch the course from sessionStroge
  
}

const instructorCourseSlice = createSlice({
    name: 'instructorCourse',
    initialState,
    reducers: {
      addCourse: (state, action) => {
        state.courses.push(action.payload);
      },
      updateCourse: (state, action) => {
        const { index, course } = action.payload;
        state.courses[index] = course;
      },
      deleteCourse: (state, action) => {
        state.courses.splice(action.payload, 1);
      },
      setCourse:(state , action) => {
        state.courses = action.payload ;
       
       
      }

    },
  });
  
  export const { addCourse, updateCourse, deleteCourse  , setCourse} = instructorCourseSlice.actions;
  
  export default instructorCourseSlice.reducer;