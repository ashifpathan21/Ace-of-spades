import React from "react";
import Tilt from "react-parallax-tilt";
import "./../../index.css";
import { useNavigate } from "react-router-dom";
const Course = (props) => {
  const navigate = useNavigate();
  const { course } = props;
  return (
    <div>
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.9}
        glareColor="lightblue"
        glarePosition="all"
        glareBorderRadius="20px"
        className="p-2 flex border-gr rounded-lg  flex-col gap-2"
      >
        <img
          src={props.course?.thumbnail}
          className="object-cover h-60 w-full aspect-video drop-shadow-2xl rounded-lg "
        />
        <div>
          <h2 className="font-semibold text-lg p-2">
            {props.course?.courseName}
          </h2>
        </div>
        <button
          onClick={() => {
            navigate(`/courses/${props.course?._id}`);
          }}
          className="bg-blue-600 hover:bg-blue-400 text-xl font-semibold rounded-md  w-full p-2 transition-all duration-1000"
        >
          Explore Now
        </button>
      </Tilt>
    </div>
  );
};

export default Course;
