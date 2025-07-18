import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../Slices/userSlice.js";
import toast from "react-hot-toast";
import { setIsLoggedIn } from "../Slices/pagesSlice.js";
import {
  acceptRequest,
  rejectRequest,
} from "../services/operations/friendApi.js";
import { useSelector, useDispatch } from "react-redux";

const FriendRequest = (props) => {
  const navigate = useNavigate();
  const { friend, setLoading } = props;
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/profile/getUserDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response && response.status === 200) {
          const payload = response.data.data;
          dispatch(updateUser(payload));
          dispatch(setIsLoggedIn(true));
          setLoading(false);
        }
      })
      .catch((err) => {
        //(err) ;
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [addd, reject]);

  async function addd() {
    try {
      setLoading(true);
      const responce = await dispatch(
        acceptRequest({ requesterId: friend._id }, token)
      );

      toast.success(responce.data.message);
    } catch (error) {
      //(error)
    }
  }

  async function reject() {
    try {
      setLoading(true);
      const responce = await dispatch(
        rejectRequest({ requesterId: friend._id }, token)
      );

      toast.success(responce.data.message);
    } catch (error) {}
  }

  return (
    <div className=" flex px-2 w-full  shadow py-2 items-center gap-3 shadow-emerald-300">
      <div>
        <img
          src={friend?.image}
          alt=""
          className="aspect-square  border object-cover h-12 w-12  rounded-full  "
        />
      </div>
      <div
        onClick={() => {
          navigate(`/user/${friend?.userName}`, { state: { user: friend } });
        }}
        className="p-1 flex flex-col gap-1 "
      >
        <h4 className="font-semibold text-md capitalize   ">
          {friend?.firstName + " " + friend?.lastName}{" "}
        </h4>
        <p>@{friend?.userName}</p>
      </div>

      <div className="flex ml-auto p-1 items-center gap-3 ">
        <button
          onClick={reject}
          className="rounded-full shadow hover:bg-red-300 transition-all duration-300 shadow-red-400 p-2 h-8 flex justify-center items-center font-bold text-xl  w-8  "
        >
          <i className="ri-close-line"></i>
        </button>

        <button
          onClick={addd}
          className="rounded-full shadow hover:bg-green-300  transition-all duration-300 shadow-green-400 p-2 h-8 flex justify-center items-center font-bold text-xl  w-8  "
        >
          <i className="ri-check-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
