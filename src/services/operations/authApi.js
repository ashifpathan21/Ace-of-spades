import axios from "axios";
import { apiConnector } from "../apiConnector.js";
import { endpoints, profileEndpoints } from "../apis.js";
import toast from "react-hot-toast";
import { updateUser, setToken } from "../../Slices/userSlice";
import { setIsLoggedIn } from "../../Slices/pagesSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  CHECK_USERNAME,
} = endpoints;

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } =
  profileEndpoints;

export function sendOtp(email, setLoading, setOtpSent) {
  return async (dispatch) => {
    // //('sendiing otp ')
    setLoading(true);
    try {
      const responce = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      if (!responce.data.success) {
        toast.error("Something went wrong , Please try again");
        setLoading(false);
        return; // //(responce.data.message)
      }
      // //(responce) ;
      toast.success(responce.data.message);
      setLoading(false);
      setOtpSent(true);
    } catch (error) {
      // //("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP");
    }
  };
}

//signup
export function signUp(
  {
    firstName,
    lastName,
    email,
    password,
    userName,
    collegeName,
    otp,
    setLoading,
  },
  navigate
) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const responce = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        userName,
        collegeName ,
        otp,
      });

      if (!responce.data.success) {
        toast.error("Invalid OTP");
        return; // //(responce.data.message)
      }

      // //(responce)

      let payload = responce.data.user;
      dispatch(updateUser(payload));
      payload = responce.data.token;
      localStorage.setItem("token", responce.data.token);
      dispatch(setToken(payload));
      dispatch(setIsLoggedIn(true));
      toast.success(responce.data.message);
      setLoading(false);
      navigate("/");
      return responce.data.user;
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      navigate("/signup");
      // //("SENDOTP API ERROR............", error)
      toast.error("Could Not verify OTP");
    }
  };
}

//getting user details
export function getUserDetails(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        return; // //(response.message);
      }

      const payload = response.data.data;
      dispatch(updateUser(payload));
      return payload;
    } catch (error) {
      // //("GET USER DETAILS API ERROR............", error);
    }
  };
}

export function login({ email, password }, setLoading, navigate) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        toast.error("Invalid Credentials");
        setLoading(false);
        return; // //(response.data.message);
      }

      let payload = response.data.user;
      dispatch(updateUser(payload));
      payload = response.data.token;
      localStorage.setItem("token", response.data.token);
      dispatch(setToken(payload));
      dispatch(setIsLoggedIn(true));
      toast.success(response.data.message);
      setLoading(false);
      navigate("/");
      return response.data.user;
    } catch (error) {
      setLoading(false);

      navigate("/login");
      // //("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }
  };
}

export function getPasswordResetToken(email, setEmailSent, setLoading) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      // console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    setLoading(false);
  };
}

export function resetPassword(password, confirmPassword, token, setLoading) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      // console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    setLoading(false);
  };
}

export function fetchSuggestions(token) {
  return async () => {
    try {
      const response = await apiConnector(
        "GET",
        endpoints.GET_SUGGESTIONS,
        null,
        { Authorization: `Bearer ${token}` }
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch suggestions");
    }
  };
}
