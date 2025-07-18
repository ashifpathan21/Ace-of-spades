import React, { useState, useEffect } from "react";
import { setIsLoggedIn } from "../../Slices/pagesSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Slices/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");
    const payload = {};
    dispatch(updateUser(payload));
    dispatch(setIsLoggedIn(false));
    navigate("/");
  }, [dispatch, navigate]);

  return <div></div>;
};

export default Logout;
