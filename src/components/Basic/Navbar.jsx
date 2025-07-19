import React, { useEffect, useState, useContext } from "react";
import Modals from "./Modals.jsx";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDarkMode,
  setIsLoggedIn,
  toggleProfileModal,
  setProfileModal,
  toggleShowMenu,
} from "../../Slices/pagesSlice";

import { SocketContext } from "../../context/SocketContext";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const { isDarkMode, isLoggedIn, showMenu, profileModal } = useSelector(
    (state) => state.pages
  );
  const { user } = useSelector((state) => state.user);

  const [instructor, setInstructor] = useState(false);

  useEffect(() => {
    dispatch(setProfileModal(false));
    showMenu && dispatch(toggleShowMenu());
  }, []);

  const toggleMode = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    if (socket && user?._id) {
      socket.emit("join", { userId: user._id });
      // //(user) ;
    }
  }, [socket, user?._id]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (user?.accountType === "Instructor") {
      setInstructor(true);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <div
        className={`transition bg-transparent ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } backdrop-blur-sm z-10  w-screen fixed top-0 duration-500`}
      >
        <div className="lg:max-w-[1080px] md:max-w-[900px] max-w-[600px] w-full mx-auto flex justify-between px-3 h-20">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex transition p-5 duration-200 items-center justify-center"
          >
            <h2 className="md:text-2xl text-lg lg:text-2xl font-semibold lg:font-bold font-serif">
              𝐀Φ<span className="text-amber-500 text-2xl">$</span>-Shiksha
            </h2>
          </div>

          <div className="flex justify-between items-center relative px-4 w-[50%] md:w-[65%] lg:w-[65%]">
            <div
              onClick={toggleMode}
              className="cursor-pointer transition duration-100"
            >
              {isDarkMode ? (
                <i className="ri-moon-clear-fill"></i>
              ) : (
                <i className="ri-sun-line"></i>
              )}
            </div>

            <div className="hidden md:flex ml-10 font-semibold gap-4  lg:flex p-2  w-full ">
              <button 
              className='underline block p-1 hover:text-slate-300 transition-all duration-150 cursor-pointer'
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </button>
              <button 
              className='underline block p-1 hover:text-slate-300 transition-all duration-150 cursor-pointer'
                onClick={() => {
                  navigate("/leaderboard");
                }}
              >
                Leaderboard
              </button>
              <button 
              className='underline block p-1 hover:text-slate-300 transition-all duration-150 cursor-pointer'
                onClick={() => {
                  navigate("/quiz");
                }}
              >
                Quiz
              </button>
              <button 
              className='underline block p-1 hover:text-slate-300 transition-all duration-150 cursor-pointer'
                onClick={() => {
                  navigate("/chats");
                }}
              >
                Chats
              </button>
              <button 
              className='underline block p-1 hover:text-slate-300 transition-all duration-150 cursor-pointer'
                onClick={() => {
                  navigate("/find-friends");
                }}
              >
                Find Friends
              </button>


            </div>

            <div>
              {isLoggedIn ? (
                <div className="flex items-center w-[50%] md:p-2 lg:p-2 -mr-5 md:mr-10 lg:mr-10 md:gap-5 lg:gap-5 gap-2">
                  <div>
                    <div
                      onClick={() => {
                        if (showMenu) dispatch(toggleShowMenu());
                        dispatch(toggleProfileModal());
                      }}
                      className=" transition-all duration-1000 h-[40px] w-[40px] rounded-full"
                    >
                      <img
                        className="rounded-full aspect-square overflow-hidden  object-cover"
                        src={user?.image}
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <div
                    className="text-2xl p-2"
                    onClick={() => {
                      if (profileModal) dispatch(toggleProfileModal());
                      dispatch(toggleShowMenu());
                    }}
                  >
                    <i className="ri-menu-line"></i>
                  </div>
                </div>
              ) : (
                <div className="flex items-center p-0 md:p-2 lg:p-2 md:gap-2 lg:gap-2 -mr-5 md:mr-10 lg:mr-10 gap-1">
                  <button
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className="backdrop-blur-lg transition-all duration-500 p-2 font-semibold rounded-2xl"
                  >
                    SignUp
                  </button>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="backdrop-blur-lg transition-all duration-500 p-2 font-semibold rounded-2xl"
                  >
                    LogIn
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn ? (
        <Modals
          instructor={instructor}
          setIsLoggedIn={setIsLoggedIn}
          showMenu={showMenu}
          isDarkMode={isDarkMode}
          profileModal={profileModal}
          setProfileModal={setProfileModal}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
