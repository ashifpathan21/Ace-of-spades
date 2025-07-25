import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../Slices/userSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../index.css";
import { setIsLoggedIn } from "../../Slices/pagesSlice.js";
import { getAllCourses } from "../../services/operations/coursesApi";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    async function getCourses() {
      try {
        const courses = await dispatch(getAllCourses());
      } catch (error) {
        toast.error("Something went wrong");
      }
    }

    getCourses();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/profile/getUserDetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response && response.status === 200) {
        const payload = response.data.data;
        dispatch(updateUser(payload));
        dispatch(setIsLoggedIn(true));
        setIsLoading(false);
      }
    })
    .catch((err) => {
      // //(err) ;
      localStorage.removeItem("token");
      navigate("/login");
    });

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
