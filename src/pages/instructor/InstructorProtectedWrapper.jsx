import React, { useState , useEffect , useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../Slices/userSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {setCourse} from '../../Slices/instructorCourseSlice'
import {setIsLoggedIn} from '../../Slices/pagesSlice.js'
import {getInstructorCourses} from '../../services/operations/instructorApi'


const InstructorProtectedWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const { courses } = useSelector((state)=> state.instructorCourses)
    const dispatch = useDispatch() ;
 

    // if the token not present then navigate to the login page 
    useEffect(()=>{
        if (!token) {
             navigate('/login')
               }  
    } , [token, navigate])



    //getting instructor course |||| pending=-- (we have to take it from sessionstroge if it is not present then only fetching and set to session storage)
    useEffect(()=>{
    async function getCourses() {
    try {
    setIsLoading(true) ;
    const payload = await dispatch(getInstructorCourses(token)) 
   await  setCourse(payload)
    } catch (error) {
    // console.log(error)
    }     
    }

    getCourses()

    }, [])

 

    // checking that the user is instructor or not 
    const [isLoading , setIsLoading] = useState(true) ;
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/profile/getUserDetails` , {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response => {
        if (response && response.status === 200 && response.data.data.accountType === 'Instructor') {
            const payload = response.data.data;
            dispatch(updateUser(payload));
            dispatch(setIsLoggedIn(true))
            setIsLoading(false);
        }else{
            navigate('/')
            setIsLoading(false);
        }
    }).catch(err => {
        // console.log(err) ;
        navigate('/')
    })  





    if(isLoading){
        return (
            <div className='h-screen w-screen flex justify-center items-center'>.....Loading</div>
        )
    }


    return (
       <>
       {children}
       </>
    )
}

export default InstructorProtectedWrapper
