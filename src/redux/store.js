import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../Slices/pagesSlice.js";
import userReducer from "../Slices/userSlice.js";
import quizReducer from "../Slices/quizSlice.js";
import courseReducer from "../Slices/courseSlice.js";
import leaderboardReducer from "../Slices/leaderboardSlice.js";
import instructorCourseReducer from "../Slices/instructorCourseSlice";
import detailsReducer from "../Slices/detailsSlice";
import workingCourseReducer from "../Slices/workingCourseSlice";
export const store = configureStore({
  reducer: {
    pages: pageReducer,
    user: userReducer,
    courses: courseReducer,
    quizzes: quizReducer,
    details: detailsReducer,
    leaderboard: leaderboardReducer,
    instructorCourses: instructorCourseReducer,
    createCourse: workingCourseReducer,
  },
});
