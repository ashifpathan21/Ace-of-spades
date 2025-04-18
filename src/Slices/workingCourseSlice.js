import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    course:{},
}

const workingCourseSlice = createSlice({
    name: 'createCourse',
    initialState,
    reducers: {
      setCourse: (state, action) => {
       
        state.courses = action.payload; 
   
    }},
  });
  
  export const {setCourse} = workingCourseSlice.actions;
  
  export default workingCourseSlice.reducer;