import React, { useState, useEffect } from "react";
import Navbar from "../components/Basic/Navbar.jsx";
import "../index.css";
import FriendRequest from "../components/FriendRequest";
import Modals from "../components/Basic/Modals.jsx";
import CourseProgress from "../components/Profile/CourseProgress.jsx";
import Tilt from "react-parallax-tilt";
import AddFriend from "../components/AddFriend.jsx";
import EditProfile from "../components/Profile/EditProfile.jsx";
import { getSuggestions } from "../services/operations/detailsApi.js";
import FriendRequestModal from "../components/FriendRequestModal.jsx";
import { useSelector, useDispatch } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  const suggestions = useSelector((state) => state.details.suggestions);
  const dispatch = useDispatch();

  const [friendSuggestions, setFriendSuggestions] = useState(
    suggestions?.friendSuggestions || []
  );

  const [points, setPoints] = useState("");
  const [friendRequestModal, setFriendRequestModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [questionAttempted, setQuestionAttempted] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const get = async () => {
        const res = await dispatch(getSuggestions(token));
        setFriendSuggestions(res?.friendSuggestions);
      };
      get();
    }
  }, [token]);

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      setCorrectQuestions(user?.correctQuestions);
      setPoints(user?.points);
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  const { firstName, lastName, userName, image, courses } = user || {};

  return editModal ? (
    <div className="min-h-screen h-full relative">
      <EditProfile setEditModal={setEditModal} />
    </div>
  ) : (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Friend Request Modal */}
      {friendRequestModal && (
        <FriendRequestModal
          user={user}
          loading={loading}
          setLoading={setLoading}
          setFriendRequestModal={setFriendRequestModal}
        />
      )}

      {/* Main Profile Content */}
      <div className="relative pt-20">
        <div className="max-w-[850px] mx-auto p-4 flex items-center justify-between">
          <div className="w-30 md:w-35 h-30 md:h-35 lg:h-40 lg:w-40 p-0.5 rounded-lg bgpic">
            <img
              className="rounded-lg object-cover h-full w-full"
              src={image}
              alt="Profile"
            />
          </div>
          <div className="flex flex-col text-right justify-center p-3 mr-5">
            <h2 className="text-lg font-semibold">{`${firstName} ${lastName}`}</h2>
            <p>@{userName}</p>
            <p className="capitalize">{user?.additionalDetails?.about}</p>
            {user?.additionalDetails?.linkedinUrl && (
              <a
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://${user.additionalDetails.linkedinUrl}`}
              >
                LinkedIn
              </a>
            )}
            <div className="flex gap-3 flex-col md:flex-row mt-2">
              <button
                onClick={() => setFriendRequestModal(true)}
                className="bg-[#4bffe4] relative rounded-xl px-3 py-2 text-gray-700 font-semibold hover:bg-[#a2f5e9]"
              >
                <i className="ri-user-add-fill"></i> Friend Request
                {user?.friendRequest?.length > 0 && (
                  <div className="absolute -top-1 right-0 h-5 w-5 flex justify-center items-center text-sm bg-red-500 text-white rounded-full animate-bounce">
                    {user.friendRequest.length}
                  </div>
                )}
              </button>
              <button
                onClick={() => setEditModal(true)}
                className="bg-[#4bffe4] rounded-xl px-3 py-2 text-gray-700 font-semibold hover:bg-[#a2f5e9]"
              >
                <i className="ri-pencil-fill"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
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
                  {user.friends?.length}
                </h2>
                <p>Friends</p>
              </div>
              <div className="flex items-center p-2 flex-col gap-2">
                <i className="ri-database-fill text-lg"></i>
                <h2 className="text-2xl font-semibold">{courses?.length}</h2>
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
                <h2 className="text-2xl font-semibold">{`${points}`}</h2>
                <p>Points</p>
              </div>
            </div>
          </div>
        </Tilt>

        {friendSuggestions?.length > 0 && (
          <div className="flex items-center  h-full p-4  w-full  flex-col gap-4">
            <h1 className="w-full p-2 text-center mb-2 text-xl flex justify-center font-semibold">
              Suggestions{" "}
            </h1>
            <div className="w-[80%] grid md:grid-cols-2  lg:grid-cols-2 grid-cols-1 ">
              {friendSuggestions?.map((friend, i) => (
                <AddFriend
                  key={i}
                  isAdded={false}
                  user={user}
                  friend={friend}
                />
              ))}
            </div>
          </div>
        )}

        {/* Course Progress */}
        <h2 className="w-full p-2 text-center mb-2 text-xl font-semibold">
          Course Progress
        </h2>
        <div className="w-full flex justify-center">
          <div className="w-[80%] flex flex-col gap-4 mx-auto mb-10">
            {courses?.map((course, index) => (
              <CourseProgress key={index} user={user} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
