import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CourseStage from "../../components/Course/CourseStage";
import UpdateCourseForm from "../../components/Course/UpdateCourseForm";
import { useSelector, useDispatch } from "react-redux";

const InstructorCourseUpdate = () => {
  const location = useLocation();
  const { courseId } = location.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStage, setActiveStage] = useState(1);

  function back() {
    if (activeStage == 1) {
      navigate("/instructor/courses");
    } else {
      setActiveStage(activeStage - 1);
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          back();
        }}
        className="absolute top-1  p-3 "
      >
        <i className=" text-2xl font-semibold  ri-arrow-left-line"></i>
      </button>
      <h2 className="text-2xl font-semibold w-full text-center p-3">
        Update Course <i className="ri-pencil-fill"></i>
      </h2>
      <div className="flex items-center  justify-center mt-4">
        <CourseStage
          stage={1}
          activeStage={activeStage}
          completed={activeStage >= 2 ? true : false}
        />
        <div className="w-10 h-1 bg-gray-300"></div>
        <CourseStage
          stage={2}
          activeStage={activeStage}
          completed={activeStage >= 3 ? true : false}
        />
        <div className="w-10 h-1 bg-gray-300"></div>
        <CourseStage
          stage={3}
          activeStage={activeStage}
          completed={activeStage === 4 ? true : false}
        />
      </div>
      <UpdateCourseForm
        courseId={courseId}
        activeStage={activeStage}
        setActiveStage={setActiveStage}
      />
    </div>
  );
};

export default InstructorCourseUpdate;
