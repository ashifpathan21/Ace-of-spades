import { configureStore } from '@reduxjs/toolkit'
import pageReducer from '../Slices/pagesSlice.js'
import userReducer from '../Slices/userSlice.js'
import courseReducer from '../Slices/courseSlice.js'
export const store = configureStore({
  reducer: {
   pages: pageReducer,
   user: userReducer,
   courses: courseReducer
  },
})