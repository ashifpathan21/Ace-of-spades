import React, { useState, useEffect } from "react";
import "../../index.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar.jsx";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDarkMode,
  setIsLoggedIn,
  toggleProfileModal,
  setProfileModal,
  setShowMenu,
  toggleShowMenu,
} from "../../Slices/pagesSlice";

const Modals = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className={` ${
        props.showMenu || props.profileModal ? "h-60" : "h-0"
      }  transition-all mt-20 mb-10  md:mb-20 lg:mb-20 duration-1000 flex items-center justify-center  absolute top-0 w-full`}
    >
      <div
        className={`absolute p-2  z-10 right-10 md:right-30 lg:right-40 flex-col  justify-between ${
          props.profileModal
            ? "transition-all duration-1000 flex"
            : "transition-all duration-1000 h-0 hidden"
        } ${
          props.isDarkMode ? "bg-white text-black" : "bg-black text-white"
        } transition-all duration-1000 rounded-lg h-[100px] w-40 top-1`}
      >
        <button
          onClick={() => {
            navigate("/profile");
            dispatch(setProfileModal(false));
          }}
          className="flex justify-center items-center w-full h-[48%]"
        >
          My Profile
        </button>
        <button
          onClick={() => {
            navigate("/logout");
          }}
          className="flex justify-center items-center w-full h-[48%]"
        >
          Log Out
        </button>
      </div>

      <div
        className={`absolute p-3 gap-4    z-10   right-1 lg:right-5  flex-col  justify-between ${
          props.showMenu
            ? "transition-all duration-1000 flex "
            : "transition-all duration-1000 h-0  hidden"
        } ${
          props.isDarkMode ? "bg-white text-black" : "bg-black text-white"
        } transition-all duration-1000 rounded-lg  w-40 md:w-50 lg:w-60 top-0`}
      >
        <button
          onClick={() => {
            navigate("/courses");
          }}
        >
          Courses
        </button>
        {props?.instructor && (
          <button
            onClick={() => {
              navigate("/instructor/home");
              dispatch(setShowMenu(false));
            }}
          >
            Dashboard
          </button>
        )}
        {props?.instructor && (
          <button
            onClick={() => {
              navigate("/instructor/courses");
              dispatch(setShowMenu(false));
            }}
          >
            My Courses
          </button>
        )}
        <button
          onClick={() => {
            navigate("/find-friends");
            dispatch(setShowMenu(false));
          }}
        >
          Find Friends
        </button>
        <button
          onClick={() => {
            navigate("/chats");
            dispatch(setShowMenu(false));
          }}
        >
          ChatRoom
        </button>
        <button>Startup Support</button>

        <button
          onClick={() => {
            navigate("/about");
            dispatch(setShowMenu(false));
          }}
        >
          <a href=""> About Us</a>
        </button>

        <p className="text-sm  text-slate-700 px-3 mx-auto mt-5">
          Ace of Spades &copy;
        </p>
      </div>
    </div>
  );
};

export default Modals;
