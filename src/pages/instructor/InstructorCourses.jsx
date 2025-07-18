import React, { useState, useEffect } from "react";
import Navbar from "../../components/Basic/Navbar";
import CourseCard from "../../components/instructor/CourseCard";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInstructorCourses } from "../../services/operations/instructorApi";
const InstructorCourses = () => {
  const { courses } = useSelector((state) => state.instructorCourses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getCourses() {
      try {
        setLoading(true);
        const payload = await dispatch(getInstructorCourses(token));
      } catch (error) {
        // //(error)
      }
      setLoading(false);
    }

    getCourses();
  }, []);

  return (
    <div className=" pt-20  min-h-screen">
      <Navbar />

      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center ">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="max-w-[500px] md:max-w-[750px] lg:max-w-[1000px]  mx-auto p-4">
          <div className=" flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Courses</h2>

            <div className="flex gap-5 items-center">
              <button
                onClick={() => {
                  navigate("/instructor/courses/create");
                }}
                className=" hover:bg-cyan-200 shadow-cyan-300 shadow font-bold py-2 px-4 rounded"
              >
                Create
              </button>
              <button
                onClick={() => {
                  navigate("/instructor/home");
                }}
                className=" hover:bg-cyan-200 shadow-cyan-300 shadow font-bold py-2 px-4 rounded"
              >
                Dashboard
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Published Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {courses
                .filter((course) => course.status === "Published")
                .map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
            </div>

            <h3 className="text-xl font-semibold mt-4 mb-2">Draft Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {courses
                .filter((course) => course.status === "Draft")
                .map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
