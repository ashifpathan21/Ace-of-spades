import React, { useState, useEffect } from 'react';
import Navbar from "../components/Basic/Navbar.jsx";
import '../index.css'
import Modals from "../components/Basic/Modals.jsx";
import CourseProgress from "../components/Profile/CourseProgress.jsx";
import Tilt from 'react-parallax-tilt';
import EditProfile from "../components/Profile/EditProfile";
import { useSelector, useDispatch } from 'react-redux';

const MyProfile = () => {

    const { user } = useSelector((state) => state.user);
 
    const [progress, setProgress] = useState(90);
    const [editModal, setEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [correctQuestions , setCorrectQuestions] = useState('')
    const [questionAttempted , setQuestionAttempted] = useState('')
    let completedQuestions = 0 ;
    let questionAttempt =  0 ;


    useEffect(() => {
        if (user) {

            user?.courseProgress?.forEach((subSection) => {
                subSection?.completedVideos?.forEach((subs) => {
                    completedQuestions += subs.correctQuestions?.length || 0;
                });
            });
            user?.courseProgress?.forEach((subSection) => 
                subSection?.completedVideos?.forEach((subs) => {
                    if (subs.subSection?.questions) {
                        questionAttempt += subs.subSection.questions.length;
                    }
                })
            );
            setCorrectQuestions(completedQuestions) ;
            setQuestionAttempted(questionAttempt) ;
            setIsLoading(false);
        }
      // completedQuestions+= user.courseProgress?.map((sec) => sec?.map((subsec) => subsec?.questions?.length)) ;
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>; // Or a more sophisticated loading indicator
    }

    const { firstName, lastName, userName, image , courses} = user || {}; // Destructure user properties

    return (
        editModal ?  <div className='min-h-screen h-full relative'>
<EditProfile setEditModal={setEditModal} />
        </div>  :
        <div className='relative min-h-screen'>
            <Navbar />
            {/* Edit Profile Modal */}
            <div className={`${editModal ? 'block' : 'hidden'} h-screen w-screen overflow-y-auto absolute top-0 z-10 backdrop-blur-lg`}>
               
                <div className='w-full h-20'>
                    <h2 className='w-full p-2 text-center mb-2 text-3xl font-semibold'>
                        <span><i className="ri-pencil-fill"></i></span> Edit Profile
                    </h2>
                </div>
                

               
               
            </div>

            {/* Main Profile Content */}
            <div className='relative pt-20'>
                <div className=''>
                    <div className='max-w-[500px] items-center md:max-w-[600px] lg:max-w-[850px] mx-auto justify-between p-4 flex'>
                        <div className={`w-30 md:w-35 h-30 md:h-35 lg:h-40 lg:w-40 p-0.5 rounded-lg bgpic`}>
                            <img className='rounded-lg object-cover h-full w-full' src={image} alt="Profile" />
                        </div>
                        <div className='flex flex-col space-y-2 text-right justify-center p-3 mr-5'>
                            <h2 className='text-lg font-semibold'>{firstName + " " + lastName}</h2>
                            <p>{`@${userName}`}</p>
                            <p className='capitalize '>{user?.additionalDetails?.about}</p>
                           {user?.additionalDetails?.linkedinUrl &&  <a className='text-blue-300' target="_blank"  rel="noopener noreferrer" href={`https://${user?.additionalDetails?.linkedinUrl}`}>Linkedin</a>}
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
                <Tilt className='max-w-[500px] mx-auto md:max-w-[650px] lg:max-w-[800px] my-5 ' glareEnable={true} glareMaxOpacity={0.8} glareColor="lightblue" glarePosition="all" glareBorderRadius="40px">
                <div className='flex flex-col md:flex-row lg:flex-row mt-5 px-8  gap-3 p-4 justify-around items-center'>
                   
                    <div className='flex justify-around items-center gap-2 w-full '>
                    <div className='flex items-center flex-col p-2 gap-2'>
                        <i className="ri-user-follow-fill text-lg"></i>
                        <h2 className='text-2xl font-semibold'>{user.friends?.length}</h2>
                        <p>Friends</p>
                    </div>
                    <div className='flex items-center p-2 flex-col gap-2'>
                        <i className='ri-database-fill text-lg'></i>
                        <h2 className='text-2xl font-semibold'>{courses?.length}</h2>
                        <p>Courses</p>
                    </div>
                    </div>

                   <div className='flex justify-around items-center gap-2 w-full '>
                   <div className='flex items-center p-2 flex-col gap-2'>
                        <i className="ri-verified-badge-fill text-lg"></i>
                        <h2 className='text-2xl font-semibold'>{
                      correctQuestions}</h2>
                        <p>Questions</p>
                    </div>
                    <div className='flex items-center p-2 flex-col gap-2'>
                    <i className="ri-focus-2-line"></i>
                        <h2 className='text-2xl font-semibold'>{
                      questionAttempted}</h2>
                        <p>Attempted</p>
                    </div>
                   </div>
                  
                </div>
                </Tilt>

                <h2 className='w-full p-2 text-center mb-2 text-xl font-semibold'>Course Progress</h2>
                <div className='w-full py-2 mb-10 flex justify-center items-center'>
                    <div className='w-[80%] flex flex-col gap-4 mx-auto'>
                        {courses?.map((course, index) => (
                            <CourseProgress key={index} user={user} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
