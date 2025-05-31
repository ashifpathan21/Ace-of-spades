import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import Logo from "../../assets/lgo.png";
import '../../index.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, setIsLoggedIn, toggleProfileModal, setProfileModal, toggleShowMenu } from '../../Slices/pagesSlice.js';
import { updateUser } from '../../Slices/userSlice.js';
import toast from 'react-hot-toast'
import { sendOtp , signUp , login } from "../../services/operations/authApi.js";
import {debounce} from 'lodash';

const Details = (props) => {
  const { mode } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode, isLoggedIn, showMenu, profileModal } = useSelector((state) => state.pages);

  // State variables for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State variables for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State variables for signup form
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUserName, setSignupUserName] = useState("");
  

  //for username search 
  const [userLoading ,setUserLoading] = useState(false)
  const [userNameStatus, setUserNameStatus] = useState('initial'); // 'initial', 'checking', 'available', 'taken'
  const [userNameError, setUserNameError] = useState('');

  // State variable for loading state
  const [loading, setLoading] = useState(false);

  // State variable for OTP verification
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]); // for storing input refs


  //checking username availability
  const checkUserNameAvailability = async (userName) => {
    if (userName.length < 3) {
      setUserNameStatus('initial');
      setUserNameError('Username must be at least 3 characters');
      return;
    }

    setUserNameStatus('checking');
    setUserNameError('');
    setUserLoading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/username`, { userName: userName });
      setUserLoading(false)
      if (response.data.success) {
        setUserNameStatus('available');
        setUserNameError('');
      } else {
        setUserNameStatus('taken');
        setUserNameError(response.data.message || 'Username is already taken');
      }
    } catch (error) {
      setUserLoading(false)
      setUserNameStatus('initial');
      setUserNameError('Error checking username availability');
      // console.error("Error checking username:", error);
    }
  };

  const debouncedCheckUserName = React.useMemo(() => debounce(checkUserNameAvailability, 500), []);

  useEffect(() => {
    if (signupUserName.length > 5) {
      debouncedCheckUserName(signupUserName);
    } else {
      setUserNameStatus('initial');
      setUserNameError('Username must be at least 5 characters');
    }
  }, [signupUserName, debouncedCheckUserName]);

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
  try {
    dispatch(login({ email: loginEmail, password: loginPassword  } , setLoading, navigate));
  } catch (error) {
    // console.error("Login failed:", error);
  }
  };

  // Function to send OTP for signup
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
        dispatch(sendOtp(signupEmail , setLoading , setOtpSent))   
    } catch (error) {
      resetSignupForm();
    }
  };

  // Function to handle user signup
  const handleSignup = async (e) => {
    const otp = otpValues.join('')
    e.preventDefault();

    if (userNameStatus !== 'available') {
      toast.error('Please wait for username availability to be confirmed.');
      return;
    }
    const OTP = otpValues.join('');
    const signupData = {
      firstName: signupFirstName,
        lastName: signupLastName,
        email: signupEmail,
        password: signupPassword,
        userName: signupUserName,
        otp: otp,
        setLoading,
       navigate
    };

    try {
      dispatch(signUp(signupData, navigate));
    } catch (error) {
      // //(error);
    }
  };

  // Function to handle OTP input change
  const handleOtpChange = (e, index) => {
    const newValue = e.target.value;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = newValue;
    setOtpValues(newOtpValues);

    // Move focus to the next input field if a value is entered
    if (newValue && index < otpValues.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div>
      {otpSent ? (
        loading ? (
          <div className='flex gap-3 flex-col h-screen w-full justify-center items-center'>
            <span className='loader'></span>
            <p>Creating Account</p>
          </div>
        ) : (
          <div className='h-screen w-full relative flex flex-col gap-20 justify-center items-center p-2 md:p-4 lg:p-8'>
            <h2 className='text-lg md:text-xl lg:text-xl'>
              OTP sent to <span className='text-blue-400'>{signupEmail.replace(/(.{3}).+(.{2}@.+)/, "$1*******$2")}</span> is valid for 5 Min
            </h2>
            <div className='max-w-[500px] md:max-w-[700px] lg:max-w-[900px] mx-auto'>
              <form onSubmit={handleSignup} className='gap-30 flex justify-center flex-col '>
                <div className='gap-3 flex  '>
                  {otpValues.map((value, index) => (
                    <div
                      key={index}
                      className='p-2 bg-white border text-black border-slate-800 w-12 h-12 rounded-lg flex justify-center items-center'
                    >
                      <input
                        type="text"
                        maxLength="1"
                        className='p-2 w-12 h-12 text-center text-xl'
                        value={value}
                        required
                        ref={el => (inputRefs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e, index)}
                      />
                    </div>
                  ))}
                </div>
                <button className='  bg-green-600 rounded-lg px-6  p-2'> Submit</button>
              </form>
            </div>
          </div>
        )
      ) : (
        <div className='min-h-screen w-full flex relative flex-col items-center p-4 text-white'>
          <div className='p-4' >
            <div
              onClick={() => {
                navigate('/')
              }}
              className='absolute text-black bg-white rounded-lg  left-4 px-2 -mt-3 text-3xl'> <i className="ri-home-9-fill"></i></div>
          </div>
          <div className='grid grid-cols-2 px-3 py-2 w-full max-w-[500px] mb-5 mt-3 bg-white text-black rounded-lg items-center'>
            <button
              onClick={() => { navigate('/login') }}
              className={`font-bold rounded-md transition-all duration-1000 p-2 ${mode === 'login' ? "bg-slate-400" : 'bg-white'}`}
            >
              LogIn
            </button>
            <button
              onClick={() => { navigate('/signup') }}
              className={`font-bold rounded-md transition-all duration-1000 p-2 ${mode === 'login' ? 'bg-white' : "bg-slate-400"}`}
            >
              SignUp
            </button>
          </div>

          {loading ? (
            <div className='flex gap-3 flex-col h-screen w-full justify-center items-center'>
              <span className='loader'></span>
              <p>{mode + 'inggg......'}</p>
            </div>
          ) : (
            mode === 'login' ? (
              <div className='flex justify-center items-center'>
                <form onSubmit={handleLogin} className='w-full max-w-[650px] gap-3 flex flex-col p-5'>
                  <label htmlFor="email">Email</label>
                  <input
                    className='w-full text-black px-2 py-1 bg-white border border-black rounded-md text-center'
                    placeholder='Enter Email'
                    type="email"
                    id='email'
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <div className='relative w-full'>
                    <input
                      maxLength="8"
                      className='w-full px-2 py-1 text-black bg-white border border-black rounded-md text-center'
                      placeholder='Enter Password'
                      type={showPassword ? "text" : "password"}
                      id='password'
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <span className='absolute right-2 top-2 text-black cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                    </span>
                  </div>
                  <div className='w-full mt-6 text-center'>
                    <button className={`transition-all duration-1000 p-2 font-semibold rounded-lg w-50 ${mode ? "bg-white hover:bg-amber-100 text-black" : "bg-black hover:bg-gray-800 text-white"}`}>
                      LogIn
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className='flex justify-center items-center'>
                <form onSubmit={handleSendOtp} className='w-full max-w-[650px] gap-3 flex flex-col p-5'>
                  <label htmlFor="name">First Name</label>
                  <input
                    className='w-full text-black px-2 py-1  bg-white border border-black rounded-md text-center'
                    placeholder='Enter First Name'
                    type="text"
                    id='name'
                    required
                    value={signupFirstName}
                    onChange={(e) => setSignupFirstName(e.target.value)}
                  />
                  <label htmlFor="last">Last Name</label>
                  <input
                    className='w-full text-black px-2 py-1  bg-white border border-black rounded-md text-center'
                    placeholder='Enter Last Name'
                    type="text"
                    id='last'
                    value={signupLastName}
                    onChange={(e) => setSignupLastName(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    className='w-full text-black py-1 bg-white border border-black rounded-md text-center'
                    placeholder='Enter Email'
                    type="email"
                    id='email'
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <div className='relative w-full'>
                    <input maxLength="8"
                      className='w-full text-black px-2 py-1  bg-white border border-black rounded-md text-center'
                      placeholder='Enter Password'
                      type={showPassword ? "text" : "password"}
                      id='password'
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />
                    <span className='absolute right-2 top-2 text-black cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                    </span>
                  </div>

                  <label htmlFor="username">Username</label>
                  <div className='flex items-center'>
                  
                    <input
                      className='w-full text-black px-2 py-1  bg-white border border-black rounded-md text-center'
                      placeholder='Enter Username'
                      type="text"
                      id='username'
                      required
                      value={signupUserName}
                      onChange={(e) => setSignupUserName(e.target.value)}
                    />
                  </div>
                   {userNameStatus === 'checking' && <p className='text-sm'>Checking username availability...</p>}
                  {userNameStatus === 'taken' && <p className="text-red-500 text-sm">{userNameError}</p>}
                  {userNameStatus === 'available' && <p className="text-green-500 text-sm">Username is available!</p>}
                  {userNameError && userNameStatus !== 'taken' && <p className="text-red-500 text-sm">{userNameError}</p>}
                  <div className='w-full mt-6 text-center'>
                    <button
                      disabled={userNameStatus !== 'available'}
                      className={`transition-all duration-1000 p-2 font-semibold rounded-lg w-50 ${mode ? "bg-white hover:bg-amber-100 text-black" : "bg-black hover:bg-gray-800 text-white"} ${userNameStatus !== 'available' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      SignUp
                    </button>
                  </div>
                </form>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Details;
