import React, { useState, useEffect } from "react";
import BoomCoursePie from "./BoomCoursePie";
import { getInstructorTopCourses } from "../../services/operations/instructorApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const Analitics = (props) => {
  const { setTotalStudents } = props;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    async function getTopCourse() {
      try {
        const responce = await dispatch(getInstructorTopCourses(token));
        setTopCourses(responce);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }

    getTopCourse();
  }, []);

  const [topCourses, setTopCourses] = useState([]);

  return (
    <div className=" max-w-[500px] p-4 md:max-w-[700px] flex-col lg:flex-row md:flex-row lg:max-w-[1000px] gap-2 flex basis-1/2  mx-auto    ">
      <div className="w-full h-full flex flex-col transition-all delay-500 duration-1000 items-center justify-start gap-3 p-3 ">
        <p className="w-full text-center text-xl font-semibold px-3 ">
          Top Courses{" "}
        </p>
        <div className="w-full flex justify-center items-center ">
          <BoomCoursePie
            setTotalStudents={setTotalStudents}
            topCourses={topCourses}
          />
        </div>
      </div>

      {/* right part for details  */}
      <div className="w-full flex flex-col gap-3 h-full p-4">
        {topCourses?.map((course, index) => {
          return (
            <div key={index} className="pb-2 rounded-lg ">
              {" "}
              <div
                className="w-full rounded-lg p-4  border border-gray-200 
                transition-all duration-300  shadow shadow-cyan-300 hover:shadow-md"
              >
                <h2 className="text-xl font-semibold">{course?.courseName}</h2>
                <p className="text-lg">
                  {course?.studentsEnrolled?.length} students
                </p>
              </div>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Analitics;
