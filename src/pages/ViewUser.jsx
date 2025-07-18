import React, { useState, useEffect } from "react";
import Navbar from "../components/Basic/Navbar";
import { useLocation } from "react-router-dom";
import CourseProgress from "../components/Profile/CourseProgress";
import "../index.css";
import {useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";

const ViewUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.user)
  const { user } = location.state;
  const [correctQuestions, setCorrectQuestions] = useState("");
  const [points, setPoints] = useState("");
  let completedQuestions = 0;
  let questionAttempt = 0;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //(user)
    if(user._id === currentUser._id){
      navigate('/profile')
    }
    if (user) {
      setLoading(true);
      setCorrectQuestions(user?.correctQuestions);
      setPoints(user?.points);
    }
    setLoading(false);
    // completedQuestions+= user.courseProgress?.map((sec) => sec?.map((subsec) => subsec?.questions?.length)) ;
  }, [user]);

  if (loading) {
    return (
      <div>
        <span className="loader"></span>
      </div>
    ); // Or a more sophisticated loading indicator
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {
        <button
          className="absolute top-15 z-100 p-2 font-bold text-2xl  shaodow rounded-lg shadow-cyan-800 "
          onClick={() => navigate(-1)}
        >
          <i className="ri-arrow-left-line"></i>
        </button>
      }

      {/* Main Profile Content */}
      <div className="relative pt-25">
        <div className="">
          <div className="max-w-[500px] items-center md:max-w-[600px] lg:max-w-[850px] mx-auto justify-between p-4 flex">
            <div
              className={`w-30 md:w-35 h-30 md:h-35 lg:h-40 lg:w-40 p-0.5 rounded-lg bgpic`}
            >
              <img
                className="rounded-lg object-cover h-full w-full"
                src={user?.image}
                alt="Profile"
              />
            </div>
            <div className="flex flex-col space-y-2 text-right justify-center p-3 mr-5">
              <h2 className="text-lg font-semibold">
                {user?.firstName + " " + user?.lastName}
              </h2>
              <p>{`@${user?.userName}`}</p>
              <p className="capitalize ">{user?.additionalDetails?.about}</p>
              {user?.additionalDetails?.linkedinUrl && (
                <a
                  className="text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://${user?.additionalDetails?.linkedinUrl}`}
                >
                  Linkedin
                </a>
              )}
            </div>
          </div>
        </div>

        {}

        <Tilt
          className="max-w-[500px] mx-auto md:max-w-[650px] lg:max-w-[800px] my-5 "
          glareEnable={true}
          glareMaxOpacity={0.8}
          glareColor="lightblue"
          glarePosition="all"
          glareBorderRadius="40px"
        >
          <div className="flex flex-col md:flex-row lg:flex-row mt-5 px-8  gap-3 p-4 justify-around items-center">
            <div className="flex justify-around items-center gap-2 w-full ">
              <div className="flex items-center flex-col p-2 gap-2">
                <i className="ri-user-follow-fill text-lg"></i>
                <h2 className="text-2xl font-semibold">
                  {user?.friends?.length}
                </h2>
                <p>Friends</p>
              </div>
              <div className="flex items-center p-2 flex-col gap-2">
                <i className="ri-database-fill text-lg"></i>
                <h2 className="text-2xl font-semibold">
                  {user?.courses?.length}
                </h2>
                <p>Courses</p>
              </div>
            </div>

            <div className="flex justify-around items-center gap-2 w-full ">
              <div className="flex items-center p-2 flex-col gap-2">
                <i className="ri-verified-badge-fill text-lg"></i>
                <h2 className="text-2xl font-semibold">{correctQuestions}</h2>
                <p>Questions</p>
              </div>
              <div className="flex items-center p-2 flex-col gap-2">
                <i className="ri-focus-2-line"></i>
                <h2 className="text-2xl font-semibold">{points}</h2>
                <p>Points</p>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default ViewUser;
