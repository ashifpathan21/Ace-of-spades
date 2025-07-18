import React, { useState, useEffect } from "react";
import Analitics from "./Analitics";
import InstructorsCourses from "./InstructorsCourses";
import ThisCourseDetails from "./ThisCourseDetails";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { courses } = useSelector((state) => state.instructorCourses);

  const [courseID, setCourseId] = useState("");
  const [showThisCourseDetails, setShowThisCourseDetails] = useState(false);
  const [course, setCourse] = useState({});

  useEffect(() => {
    if (courseID) {
      const selectedCourse = courses.find((course) => course._id === courseID);
      setCourse(selectedCourse || {});
    }
  }, [courseID, courses]);
  const [totalStudents, setTotalStudents] = useState("");

  return (
    <div className="pt-20 ">
      <h2 className="w-full text-xl md:text-2xl lg:text-2xl font-semibold text-center p-2 ">
        Dashboard
      </h2>

      <div>
        {showThisCourseDetails ? (
          <ThisCourseDetails totalStudents={totalStudents} course={course} />
        ) : (
          <Analitics setTotalStudents={setTotalStudents} />
        )}
      </div>

      <div>
        <InstructorsCourses
          setCourseId={setCourseId}
          showThisCourseDetails={showThisCourseDetails}
          setShowThisCourseDetails={setShowThisCourseDetails}
        />
      </div>
    </div>
  );
};

export default Dashboard;
