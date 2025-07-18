import React, { useState, useEffect } from "react";
import "../index.css";
import Category from "../components/Basic/Category.jsx";
import CourseProgress from "../components/Profile/CourseProgress.jsx";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import Course from "../components/Basic/Course";
import { useSelector, useDispatch } from "react-redux";
import { getSuggestions } from "../services/operations/detailsApi.js";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { courses, categories } = useSelector((state) => state.courses);
  const suggestions = useSelector((state) => state.details.suggestions);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [courseSuggestions, setCourseSuggestions] = useState(
    suggestions?.courseSuggestions || []
  );

  useEffect(() => {
    if (token) {
      const get = async () => {
        const res = await dispatch(getSuggestions(token));
        setCourseSuggestions(res?.courseSuggestions);
      };
      get();
    }
  }, [token]);

  return (
    <div>
      <div className="p-4">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="absolute  left-4 p-2 text-3xl"
        >
          {" "}
          <i className="ri-home-9-fill"></i>
        </div>

        <h2 className="w-full p-2 text-center mb-2 text-3xl font-semibold ">
          Courses
        </h2>

        <Category
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[1000px] mx-auto gap-3 w-full ">
          {activeCategory === "All"
            ? courses.map((course, index) => {
                return <Course key={index} course={course} />;
              })
            : courses
                .filter((course) => course?.category?._id === activeCategory)
                .map((course, index) => {
                  return <Course key={index} course={course} />;
                })}
        </div>

        {courseSuggestions?.length > 0 && (
          <div className="h-full w-full flex flex-col gap-4 ">
            <h2 className="w-full p-2 text-center mb-2 text-xl font-semibold">
              Suggested Course
            </h2>

            <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[1000px] mx-auto gap-3 w-full ">
              {courseSuggestions?.map((course, index) => {
                return <Course key={index} course={course} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
