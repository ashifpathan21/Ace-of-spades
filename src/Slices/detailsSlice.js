import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colleges: [],
  suggestions: {},
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setColleges(state, action) {
      state.colleges = action.payload;
    },
    setSuggestions(state, action) {
      state.suggestions = action.payload;
    },
  },
});

export const { setSuggestions, setColleges } = detailsSlice.actions;
export default detailsSlice.reducer;
