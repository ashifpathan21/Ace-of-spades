import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLeaderboard: [],
  collegeLeaderboard: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setGlobalLeaderboard: (state, action) => {
      state.globalLeaderboard = action.payload;
    },
    setCollegeLeaderboard: (state, action) => {
      state.collegeLeaderboard = action.payload;
    },
  },
});

export const {
  setGlobalLeaderboard,
  setCollegeLeaderboard,
  clearLeaderboards,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
