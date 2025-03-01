import React, { useState, useEffect } from 'react';
import {toggleLogin , setIsLoggedIn} from '../Slices/pagesSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate} from "react-router-dom";
const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsLoggedIn(false))
        navigate('/');
    }, [dispatch, navigate]);
    
  return (
    <div>
      
    </div>
  )
}

export default Logout
