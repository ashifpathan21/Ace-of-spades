import axios from 'axios' 
import {apiConnector} from '../apiConnector.js'
import {endpoints , profileEndpoints } from '../apis.js'
import toast from 'react-hot-toast'
import { updateUser , setToken } from '../../Slices/userSlice'
import {setIsLoggedIn} from '../../Slices/pagesSlice'

 const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    CHECK_USERNAME
  } = endpoints

const {
    GET_USER_DETAILS_API ,
    GET_USER_ENROLLED_COURSES_API
} = profileEndpoints



export function sendOtp (email , setLoading , setOtpSent ){
        return async (dispatch) => {
            // console.log('sendiing otp ')
                setLoading(true) ;
              try{

                const responce = await apiConnector('POST' , SENDOTP_API , {email  ,checkUserPresent:true }) ;

                if(!responce.data.success){
                    toast.error('Something went wrong , Please try again')
                    setLoading(false)
                    return // console.log(responce.data.message)
                }
                 // console.log(responce) ;
                 toast.success(responce.data.message);
                 setLoading(false);
                 setOtpSent(true) ;

              }catch(error){
              // console.log("SENDOTP API ERROR............", error)
             toast.error("Could Not Send OTP")
               }
             
        }
     
}



//signup 
export function signUp( 
      {  firstName,
        lastName,
        email,
        password,
        userName,
        otp,
        setLoading
    }
        ,
       navigate
){
    return async (dispatch) => {
    
    setLoading(true);
    try{
        const responce = await apiConnector('POST' , SIGNUP_API , {
            firstName,
            lastName,
            email,
            password,
            userName,
            otp
        })
         
        if(!responce.data.success){
            toast.error('Invalid OTP') ;
            return // console.log(responce.data.message)
        }

        // console.log(responce)

        let payload = responce.data.user ;
        dispatch(updateUser(payload)) ;
         payload = responce.data.token ;
        localStorage.setItem('token' , responce.data.token) ;
        dispatch(setToken(payload)) ;
        dispatch(setIsLoggedIn(true)) ;
        toast.success(responce.data.message)
        setLoading(false) ;
        navigate('/')
        return responce.data.user ;


    }catch(error){
        setLoading(false);
        toast.error(error.message)
        navigate('/signup');
        // console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not verify OTP")
    }


}
    
}


//getting user details
export function getUserDetails(token) {
    return async (dispatch) => {
        try {
          
            const response = await apiConnector('GET', GET_USER_DETAILS_API , null , { Authorization: `Bearer ${token}`} );
         
            if (!response.data.success) {
              
                return // console.log(response.message);
            }

            const payload = response.data.data;
            dispatch(updateUser(payload));
            return payload;

        } catch (error) {
            // console.log("GET USER DETAILS API ERROR............", error);
         
        }
    }
}


export function login({ email, password}, setLoading , navigate) {
    return async (dispatch) => {
        setLoading(true);
        try {
            const response = await apiConnector('POST', LOGIN_API, { email, password });

            if (!response.data.success) {
                toast.error('Invalid Credentials');
                setLoading(false);
                return // console.log(response.data.message);
            }

            

            let payload = response.data.user;
            dispatch(updateUser(payload));
            payload = response.data.token;
            localStorage.setItem('token', response.data.token);
            dispatch(setToken(payload));
            dispatch(setIsLoggedIn(true));
            toast.success(response.data.message);
            setLoading(false);
            navigate('/');
            return response.data.user;

        } catch (error) {
            setLoading(false);
        
            navigate('/login');
            // console.log("LOGIN API ERROR............", error);
            toast.error(error.response.data.message);
        }
    }
}