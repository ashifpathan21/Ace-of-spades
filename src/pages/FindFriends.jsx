import React, { useState, useEffect } from "react";
import "../index.css";
import gsap from "gsap";
import { debounce } from "lodash";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import Navbar from "../components/Basic/Navbar.jsx";
import Hero from "../assets/hero.gif";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import AddFriend from "../components/AddFriend.jsx";
import { useDispatch, useSelector } from "react-redux";
import { findFriend } from "../services/operations/friendApi.js";
import { getSuggestions } from "../services/operations/detailsApi.js";

const FindFriends = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  const token = localStorage.getItem("token");
  const [alreadyFriend, setAlreadyFriend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const suggestions = useSelector((state) => state.details.suggestions);

  const [friendSuggestions, setFriendSuggestions] = useState(
    suggestions?.friendSuggestions || []
  );

  useEffect(() => {
    if (token) {
      const get = async () => {
        const res = await dispatch(getSuggestions(token));
        setFriendSuggestions(res?.friendSuggestions);
      };
      get();
    }
  }, [token]);

  const findFriends = async (userName) => {
    setLoading(true);
    try {
      const Friend = await dispatch(findFriend({ userName }, token));

      // Remove current user from the list
      const exceptUser = Friend.filter((friend) => friend._id !== user._id);

      // Filter out users who are already friends
      const filteredUsers = exceptUser.filter(
        (u) =>
          !user.friends.some((f) => f.user._id.toString() === u._id.toString())
      );

      // Get users who are already friends
      const Friends = Friend.filter((u) =>
        user.friends.some((f) => f.user._id.toString() === u._id.toString())
      );

      // Update state
      setAlreadyFriend(Friends);
      setFriends(filteredUsers);
    } catch (error) {
      // //console.error("Error finding friends:", error);
    }
    setLoading(false);
  };

  const debouncedCheckUserName = React.useMemo(
    () => debounce(findFriends, 500),
    []
  );

  useEffect(() => {
    if (userName.length > 2) {
      debouncedCheckUserName(userName);
    }
  }, [userName, debouncedCheckUserName]);

  return (
    <div>
      <div className="px-4 flex ">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="absolute  left-4 p-2 text-3xl"
        >
          {" "}
          <i className="ri-home-9-fill"></i>
        </div>

        <h2 className="w-full p-2 text-center text-3xl font-semibold ">
          Find friends
        </h2>
      </div>

      <div className="px-3 ">
        <div className="max-w-[450px] md:max-w-[700px] lg:max-w-[1000px] flex flex-col  justify-between h-full mt-5 mx-auto">
          <div className="flex flex-col w-full  ">
            <div className="p-3 mb-5  gap-2 flex ">
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="   enter @username"
                className="bg-white p-2 h-10 text-black w-full rounded-lg"
              />
              <button
                onClick={() => {
                  setSearch(true);
                }}
                className="bg-green-400 p-2 rounded-lg "
              >
                <i className="font-semibold ri-search-line"></i>
              </button>
            </div>
          </div>

          <div className="max-w-[450px] md:max-w-[700px] lg:max-w-[900px]   flex flex-col p-2 gap-4">
            {loading ? (
              <div className="w-full gap-3 mb-10 flex justify-center items-center">
                <span className="loader"></span>
              </div>
            ) : friends?.length > 0 || alreadyFriend?.length > 0 ? (
              <>
                {alreadyFriend.map((friend, i) => (
                  <AddFriend
                    key={i}
                    isAdded={true}
                    user={user}
                    friend={friend}
                  />
                ))}{" "}
                {friends.map((friend, i) => (
                  <AddFriend
                    key={i}
                    isAdded={false}
                    user={user}
                    friend={friend}
                  />
                ))}
              </>
            ) : (
              <div className="w-full h-90 flex justify-center items-center">
                {friendSuggestions?.length > 0 ? (
                  <div className="flex h-full p-4  w-full  flex-col gap-4">
                    <h1 className="w-full p-2 text-center mb-2 text-xl font-semibold">
                      Suggestions{" "}
                    </h1>
                    {friendSuggestions?.map((friend, i) => (
                      <AddFriend
                        key={i}
                        isAdded={false}
                        user={user}
                        friend={friend}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-lg">No User Found !</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
