import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],

};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizzes(state, value) {
      state.quizzes = value.payload;
    },
  },
});

export const { setQuizzes } = quizSlice.actions;

export default quizSlice.reducer;
