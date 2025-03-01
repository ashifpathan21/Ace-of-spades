import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";
import '../index.css'
import Modals from "../components/Modals.jsx";
import CourseProgress from "../components/CourseProgress.jsx";
import Tilt from 'react-parallax-tilt';
import EditProfile from "../components/EditProfile";
import { useSelector, useDispatch } from 'react-redux';

const MyProfile = () => {
   
  const { user } = useSelector((state) => state.user);
   


  //user ke andar ki bat he 
    const [progress, setProgress] = useState(90) ;
    const [editModal , setEditModal] = useState(false);


  return (
    <div className='relative'>
      <Navbar />
      <div className={`${editModal ? 'block' : 'hidden'} h-full w-screen overflow-hidden absolute top-0 z-10 backdrop-blur-lg`}>
        <div onClick={() => setEditModal(false)} className='absolute right-10 top-3 text-2xl rounded-lg'>
          <i className="ri-close-large-fill"></i>
        </div>
        <div className='w-full h-20'>
        <h2 className='w-full p-2 text-center mb-2 text-3xl font-semibold'>
          <span><i className="ri-pencil-fill"></i></span> Edit Profile
        </h2>
        </div>
 
          
          <div className=' p-2 md:p-5 lg:p-7 max-w-[400px] md:max-w-[650px] lg:max-w-[900px] mx-auto w-full '>
           <EditProfile setEditModal={setEditModal} />
           </div>
          
        

       
      </div>




      <div className='relative pt-20'>
        <div className=''>
          <div className='max-w-[500px] items-center md:max-w-[600px] lg:max-w-[850px] mx-auto justify-between p-4 flex'>
            <div className={`w-30 md:w-35 h-30 md:h-35 lg:h-40 lg:w-40 p-0.5 rounded-lg bgpic`}>
              <img className='rounded-lg object-cover h-full w-full' src={user.img} alt="" />
            </div>
            <div className='flex flex-col space-y-2 text-right justify-center p-3 mr-5'>
              <h2 className='text-lg font-semibold'>{user.firstName + " " + user.lastName}</h2>
              <p>{`@${user.userName}`}</p>
              <p>{`${user.bio}`}</p>
              <a className='text-slate-400 hover:text-white' href={user.linkedinUrl} target="_blank" >Linkedin</a>
              <div className='flex gap-3 flex-col md:flex-row lg:flex-row'>
                <Tilt glareEnable={true} glareMaxOpacity={0.6} glareColor="lightblue" glarePosition="all" glareBorderRadius="40px">
                  <button className='bg-[#4bffe4] rounded-xl w-full px-3 p-1 md:p-2 lg:p-3 text-gray-600 lg:font-semibold md:font-semibold hover:bg-[#a2f5e9]'>
                    <i className="ri-user-add-fill"></i> Friend Request
                  </button>
                </Tilt>
                <Tilt glareEnable={true} glareMaxOpacity={0.6} glareColor="lightblue" glarePosition="all" glareBorderRadius="40px">
                  <button onClick={() => setEditModal(true)} className='bg-[#4bffe4] rounded-xl w-full px-3 p-1 md:p-2 lg:p-3 text-gray-600 lg:font-semibold md:font-semibold hover:bg-[#a2f5e9]'>
                    <i className="ri-pencil-fill"></i> Edit Profile
                  </button>
                </Tilt>
              </div>
            </div>
          </div>
        </div>
        <div className='flex mt-5 p-4 justify-around items-center'>
          <div className='flex items-center flex-col p-2 gap-2'>
            <i className="ri-user-follow-fill text-lg"></i>
            <h2 className='text-2xl font-semibold'>{user.friends.length}</h2>
            <p>Friends</p>
          </div>
          <div className='flex items-center p-2 flex-col gap-2'>
            <i className='ri-database-fill text-lg'></i>
            <h2 className='text-2xl font-semibold'>{user.courses.length}</h2>
            <p>Courses</p>
          </div>
          <div className='flex items-center p-2 flex-col gap-2'>
            <i className="ri-verified-badge-fill text-lg"></i>
            <h2 className='text-2xl font-semibold'>{user.questions.length}</h2>
            <p>Questions</p>
          </div>
        </div>
        <h2 className='w-full p-2 text-center mb-2 text-xl font-semibold'>Course Progress</h2>
        <div className='w-full py-2 mb-10 flex justify-center items-center'>
          <div className='w-[80%] flex flex-col gap-4 mx-auto'>
         {  user.courses.map((name ,index) => {
          return <CourseProgress key={index} name={name} />
         }) 
           }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
