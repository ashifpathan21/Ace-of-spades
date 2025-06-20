import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../Slices/userSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../index.css';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { debounce } from 'lodash';
import { updateProfile } from '../../services/operations/profileApi.js'
import toast from 'react-hot-toast'
const EditProfile = (props) => {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { setEditModal } = props;

  // Refs
  const inputFile = useRef(null);

  // File upload handler
  const onButtonClick = () => {
    // Trigger file selection
    inputFile.current.click();
  };

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true)
      const data = new FormData();
      data.append('file' , file);
      data.append('upload_preset' , "aceofspades")
      data.append('cloud_name' , 'dslhfux94')
     const res =  await fetch('https://api.cloudinary.com/v1_1/dslhfux94/image/upload' , {
        method:'POST',
        body: data
      })
      const uploadImageURL = await res.json() ;
    setImg(uploadImageURL.url) ;
    setLoading(false)
    }
  };

  function back() {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUserName(user.userName);
    setBio(additionalDetails.about || "");
    setMobileNo(additionalDetails.contactNumber || "");
    setImg(user.image || "");
    setLinkedinUrl(additionalDetails.linkedinUrl || "");
    setEmail(user.email || "");
    setGender(additionalDetails.gender || "MALE");
    setDob(additionalDetails.dateOfBirth || "");
    setCollege(additionalDetails.collegeName || "");
    setEditModal(false);
  }

  // Local state
  const additionalDetails = user.additionalDetails || {};

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [userName, setUserName] = useState(user.userName);
  const [bio, setBio] = useState(additionalDetails.about || "");
  const [mobileNo, setMobileNo] = useState(additionalDetails.contactNumber || "");
  const [img, setImg] = useState(user.image || "");
  const [linkedinUrl, setLinkedinUrl] = useState(additionalDetails.linkedinUrl || "");
  const [email, setEmail] = useState(user.email || "");

  const [loading, setLoading] = useState(false);
  const [userNameStatus, setUserNameStatus] = useState('initial'); // 'initial', 'checking', 'available', 'taken'
  const [userNameError, setUserNameError] = useState('');
  const [userNameModified, setUserNameModified] = useState(false);


  const [gender, setGender] = useState(additionalDetails.gender || "MALE");
  const [dob, setDob] = useState(additionalDetails.dateOfBirth || "");
  const [college, setCollege] = useState(additionalDetails.collegeName || "");

  // Construct payload to update user profile
  const payload1 = {
    firstName,
    lastName,
    userName,
    image: img,
    additionalDetails: {
      gender,
      contactNumber: mobileNo,
      dateOfBirth: dob,
      collegeName: college,
      linkedinUrl,
      about: bio,
    },
  };






  const token = localStorage.getItem('token')
  const api = import.meta.env.VITE_BASE_URL;

  //checking username availability
  const checkUserNameAvailability = async (userName) => {
    if (userName.length < 3) {
      setUserNameStatus('initial');
      setUserNameError('Username must be at least 3 characters');
      return;
    }

    setUserNameStatus('checking');
    setUserNameError('');
    setLoading(true)

    try {
      const response = await axios.post(`${api}/auth/username`, { userName: userName });
      setLoading(false)
      if (response.data.success) {
        setUserNameStatus('available');
        setUserNameError('');
      } else {
        setUserNameStatus('taken');
        setUserNameError(response.data.message || 'Username is already taken');
      }
    } catch (error) {
      setLoading(false)
      setUserNameStatus('initial');
      setUserNameError('Error checking username availability');
      // //console.error("Error checking username:", error);
    }
  };


  const debouncedCheckUserName = React.useMemo(() => debounce(checkUserNameAvailability, 500), []);


  useEffect(() => {
    if (userName.length > 5 && userName !== user.userName) {
      setUserNameModified(true);
      debouncedCheckUserName(userName);
    } else if (userName === user.userName) {
      setUserNameModified(false);
      setUserNameStatus(''); // Treat default username as available
      setUserNameError('');
    } else {
      setUserNameModified(false);
      setUserNameStatus('initial');
      setUserNameError('Username must be at least 5 characters');
    }
  }, [userName, debouncedCheckUserName, user.userName]);





  // Handler to update profile when form is submitted
  async function update(e) {
    e.preventDefault();
    window.scrollTo(0, 0); 
    if (userNameModified && userNameStatus !== 'available') {
      toast.error('Please wait for username availability to be confirmed.');
      return;
    }

    // Update profile details
    try {
      const payload = await dispatch(updateProfile(payload1 , token ,setLoading)) 
       
       dispatch(updateUser(payload)) ;
       setLoading(false)
       navigate('/profile')
     
    } catch (error) {
      // //console.error('Profile update failed:', error);
    } finally {
      setLoading(false);
    }
  }
  //8319288358

  return (
    <div className='min-h-screen h-full'>
       <div onClick={() => back()} className=' min-h-full absolute z-10 right-10 top-3 text-2xl rounded-lg'>
                    <i className="ri-close-large-fill"></i>
                </div>
      {loading ? (
        <div className="px-4 flex flex-col items-center justify-center h-[90vh] w-full">
        <div className="w-full mb-3 h-full  flex justify-center items-center">
          <span className="loader"></span>
        </div>
        </div>
      ) : (
        <form onSubmit={update} className=' p-5 md:p-8 lg:p-10 max-w-[800px] mx-auto mb-10  w-full relative min-h-screen '>
          {/* Profile image */}
          <div className="w-full mb-3 flex justify-center  items-center">
            <div className="rounded-full relative flex justify-center items-center backdrop-blur-3xl shadow shadow-cyan-300 h-30 w-30">
              <img src={img} alt="Profile" className="rounded-full object-cover aspect-square h-29 w-29" />
              <i
                onClick={onButtonClick}
                className="absolute text-lg text-black bg-white rounded-full p-1 px-2 bottom-1 right-1 ri-pencil-line"
              ></i>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: 'none' }}
                onChange={onFileChange}
              />
            </div>
          </div>

          {/* Name fields */}
          <div className="flex items-center gap-3 justify-between w-full">
            <div className="w-[49%] flex flex-col p-1">
              <label htmlFor="firstname">First Name</label>
              <input
                id="firstname"
                type="text"
                className="bg-white text-gray-900 rounded-lg w-full p-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-[49%] flex flex-col p-2">
              <label htmlFor="lastname">Last Name</label>
              <input
                id="lastname"
                type="text"
                className="bg-white text-gray-900 rounded-lg w-full p-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Mobile No. and Role (bio) */}
          <div className="flex items-center gap-3 justify-between w-full">
            <div className="w-[49%] flex flex-col p-1">
              <label htmlFor="mobileNo">Mobile No:</label>
              <input
                type="tel"
                id="mobileNo"
                className="bg-white text-gray-900 rounded-lg w-full pl-4 p-2"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <div className="w-[49%] flex flex-col p-2">
              <label htmlFor="bio">Bio</label>
              <input
                id="bio"
                type="text"
                className="bg-white text-gray-900 rounded-lg w-full p-2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col p-2 w-full">
            <label htmlFor="username">Username</label>
            <div className="relative">
              <p className="absolute px-2 text-xl h-full flex justify-center items-center">
                <i className="ri-at-line"></i>
              </p>
              <input
                id="username"
                type="text"
                className="bg-white text-gray-900 rounded-lg w-full pl-8 p-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
             {userNameStatus === 'checking' && <p className='text-sm'>Checking username availability...</p>}
            {userNameStatus === 'taken' && <p className="text-red-500 text-sm">{userNameError}</p>}
            {userNameStatus === 'available' && <p className="text-green-500 text-sm">Username is available!</p>}
            {userNameError && userNameStatus !== 'taken' && <p className="text-red-500 text-sm">{userNameError}</p>}
          </div>

          {/* LinkedIn URL */}
          <div className="flex flex-col p-2 w-full">
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input
              id="linkedin"
              type="text"
              className="bg-white text-gray-900 rounded-lg w-full p-2"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </div>

          {/* Gender and Date of Birth */}
          <div className="flex items-center gap-3 justify-between w-full">
            <div className="w-[49%] flex flex-col p-1">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="bg-white text-gray-900 rounded-lg w-full p-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="w-[49%] flex flex-col p-2">
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                type="date"
                className="bg-white text-gray-900 rounded-lg w-full p-2"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>

          {/* College */}
          <div className="flex flex-col p-2 w-full">
            <label htmlFor="college">College</label>
            <select
              id="college"
              className="bg-white text-gray-900 rounded-lg w-full p-2"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            >
              <option value="JEC JABALPUR">JEC JABALPUR</option>
              <option value="MITS GWALIOR">MITS GWALIOR</option>
              <option value="IPS INDORE">IPS INDORE</option>
              <option value="SAGE INDORE">SAGE INDORE</option>
              <option value="PRESTIGE INDORE">PRESTIGE INDORE</option>
              <option value="NONE">NONE</option>
            </select>
          </div>

          {/* Email (readOnly) */} 
          <div className="flex flex-col p-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              className="bg-white text-gray-900 rounded-lg w-full p-2"
              value={email}
              readOnly
            />
          </div>

          {/* Submit button */}
          <div className="w-full flex justify-center mt-4">
            <button type="submit" 
            disabled={userNameModified && userNameStatus !== 'available'}
            className={`p-4 mt-3 mb-10 bg-green-500 rounded-lg font-semibold  ${userNameModified && userNameStatus !== 'available' ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Save Changes
            </button>
          </div>
        </form>
      )}
   </div>
  );
};

export default EditProfile;
