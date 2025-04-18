import axios from 'axios' 
import {apiConnector} from '../apiConnector.js'
import {settingsEndpoints } from '../apis.js'
import toast from 'react-hot-toast'
import { updateUser , setToken } from '../../Slices/userSlice'
import {setIsLoggedIn} from '../../Slices/pagesSlice'

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API ,
    ADD_COURSE
  } =  settingsEndpoints 

  export function updateProfile({
    firstName,
    lastName,
    userName,
    image,
    additionalDetails: {
      gender,
      contactNumber,
      dateOfBirth,
      collegeName,
      linkedinUrl,
      about,
    }
  } , token , setLoading ){
    return async (dispatch) => {
        setLoading(true) ;

        try{
          const responce = await apiConnector('PUT' , UPDATE_PROFILE_API , { firstName,
            lastName,
            userName,
            image,
            additionalDetails: {
              gender,
              contactNumber,
              dateOfBirth,
              collegeName,
              linkedinUrl,
              about,
            } } , {Authorization: `Bearer ${token}`})

            if(!responce.data.success){
                 toast.error('Something went Wrong ');
                 return
            }
        
            toast.success(responce.data.message)
            return responce.data.updatedUserDetails 
        } catch (error) {
          // console.log("UPDATE USER DETAILS API ERROR............", error);
          toast.error(error.message)
      }
      

    }
  }



  export function addCourse({ courseId }, token, setLoading) {
    return async (dispatch) => {
      setLoading(true);

      try {
        const response = await apiConnector('POST', ADD_COURSE, {
          courseId,
        }, { Authorization: `Bearer ${token}` });

        if (!response.data.success) {
          toast.error('Something went wrong');
          return;
        }

        toast.success(response.data.message);
        return response.data;
      } catch (error) {
        // console.log("ADD COURSE API ERROR............", error);
      } finally {
        setLoading(false);
      }
    };
  }