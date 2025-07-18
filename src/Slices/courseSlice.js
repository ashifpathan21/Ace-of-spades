import { createSlice } from "@reduxjs/toolkit";

//for both user and instructor the courses which is published ;

const initialState = {
  courses: [], //also course
  categories: JSON.parse(sessionStorage.getItem("categories")) || [], //have to set category from sessionStorage
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const { index, category } = action.payload;
      state.categories[index] = category;
    },
    deleteCategory: (state, action) => {
      state.categories.splice(action.payload, 1);
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {
  setCourses,
  addCategory,
  updateCategory,
  deleteCategory,
  setCategories,
} = courseSlice.actions;

export default courseSlice.reducer;
