import React from "react";
import ThisCoursePie from "./ThisCoursePie";

const ThisCourseDetails = (props) => {
  const { course, totalStudents } = props;
  let total = 0;
  course.courseContent.map((course) => {
    total += course?.subSection?.length;
  });

  const data = [
    {
      id: "Student Enrolled",
      value:
        (course.studentsEnrolled?.length / totalStudents) * (100).toFixed(2),
    },
    { id: "Course Progress", value: 40 },
    { id: "Average Rating", value: 3.7 },
  ];

  return (
    <div className=" max-w-[500px] p-4 md:max-w-[700px] flex-col lg:flex-row md:flex-row lg:max-w-[1000px] gap-3 flex basis-1/2  mx-auto    ">
      <div className="w-full h-full  flex justify-center items-center ">
        <ThisCoursePie data={data} />
      </div>
      <div className=" w-[70%] h-full pb-2 my-auto  rounded-lg ">
        <div className=" p-3  px-5 rounded-lg justify-center  shadow shadow-cyan-300 hover:shadow-md border-b  transition-all duration-500 hover:scale-105  flex flex-col gap-4 w-full   ">
          <h2 className=" font-semibold text-xl  ">{course?.courseName}</h2>
          <p>Total Sections {course?.courseContent?.length}</p>
          <p>Total SubSections {total}</p>
          <p>Student Enrolled {course.studentsEnrolled.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ThisCourseDetails;
