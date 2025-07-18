import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { updateUser, setToken } = userSlice.actions;

export default userSlice.reducer;
