import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isDarkMode: true,
  showModal: false,
  showMenu: false,
  profileModal: false,
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    toggleLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    toggleShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    setShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    toggleShowMenu: (state) => {
      state.showMenu = !state.showMenu;
    },
    setProfileModal: (state, action) => {
      state.profileModal = action.payload;
    },
    toggleProfileModal: (state) => {
      state.profileModal = !state.profileModal;
    },
  },
});

export const {
  setIsLoggedIn,
  toggleLogin,
  setIsDarkMode,
  toggleDarkMode,
  setShowModal,
  toggleShowModal,
  setShowMenu,
  toggleShowMenu,
  setProfileModal,
  toggleProfileModal,
} = pagesSlice.actions;

export default pagesSlice.reducer;
