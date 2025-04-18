import React, { useState, useEffect , useContext , useRef} from 'react';
import '../index.css'
import gsap from 'gsap'; 
import { useGSAP } from '@gsap/react';
import Navbar from "../components/Basic/Navbar.jsx";
import Hero from '../assets/hero.gif'
import bg from '../assets/startup-bg.gif'
import Start from '../assets/start.jpg'
import startup from '../assets/startup.gif'
import HeroSection from "../components/Basic/HeroSection.jsx";
import StartWith from '../components/Basic/Startwith0.jsx' 
import Courses from '../components/Basic/Courses.jsx' 
import Startup from '../components/Basic/Startup.jsx' 
import ImageSlider from '../components/Basic/ImageSlider.jsx' 
import WhyUs from '../components/Basic/WhyUs.jsx' 
import Footer from '../components/Basic/Footer.jsx'
import SliderData from './SliderData.js' 
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, setIsLoggedIn , toggleProfileModal, setProfileModal ,  toggleShowMenu } from '../Slices/pagesSlice';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { updateUser } from '../Slices/userSlice.js';
import { getUserDetails } from '../services/operations/authApi.js'; // Import the new service
import { getAllCategories } from '../services/operations/coursesApi';
import { setCategories } from "../Slices/courseSlice"
import {support} from '../services/operations/aiApi'



const Home = () => {

//testing
    // useEffect(() => {
    //     async function gett() {
    //       try {
    //         const res = await axios.post(
    //           "https://ace-of-spades-backend.onrender.com/api/v1/auth/support",
    //           {
    //             input: "hy gemini",
    //           },
    //           {
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //             // withCredentials: false or remove this line
    //           }
    //         );
    //         // console.log("✅ Got response:", res.data);
    //       } catch (err) {
    //         // console.error("❌ Axios Error:", err);
    //       }
    //     }
    //     gett();
    //   }, []);
      
    




    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isDarkMode, isLoggedIn, showMenu, profileModal } = useSelector((state) => state.pages);
    const { user } = useSelector((state) => state.user);

   
    const [messages , setMessages] = useState( sessionStorage.getItem('messages') ||[])
   
    
  //getting category for update form we have to take it from the sessionStorage for optimising --- pending //completed
  useEffect(  () => {
    async function getCategory() {

      const category = await dispatch(getAllCategories(navigate));

      if(category){
        sessionStorage.setItem('categories' , JSON.stringify(category)) ;
        dispatch(setCategories(category))
      }
    }
  
    if(!sessionStorage.getItem('categories'))
      getCategory()
    }, []);
  



    


    //fetching user details to set login if token is present ;
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!token) {
                dispatch(setIsLoggedIn(false));
                return;
            }
            try {
                const payload = await dispatch(getUserDetails(token));
                if (payload) {
                    dispatch(updateUser(payload));
                    dispatch(setIsLoggedIn(true));
                } else {
                    dispatch(setIsLoggedIn(false));
                }
            } catch (error) {
                // console.error("Failed to fetch user details:", error);
                dispatch(setIsLoggedIn(false));
            }
        };
        fetchUserDetails();
    }, [token, dispatch]);

const [loading , setLoading] = useState(false )

const [help , setHelp ] = useState(false ) ;
const [input , setInput ] = useState('')

const getSupport = async () => {
    if (!input.trim()) return;  // खाली इनपुट को रोकें
    setLoading(true);

    try {
        // यूज़र का मैसेज सेट करें
        setMessages((prev) => {
            const updatedMessages = [...prev, { sender: "user", text: input }];
            sessionStorage.setItem("messages", JSON.stringify(updatedMessages));
            return updatedMessages;
        });

        // AI का रिस्पॉन्स लाएं
        const response = await dispatch(support(input));
        
        if (response) {
            setMessages((prev) => {
                const updatedMessages = [...prev, { sender: "ai", text: response }];
                sessionStorage.setItem("messages", JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        } else {
            setMessages((prev) => {
                const updatedMessages = [...prev, { sender: "ai", text: "No response from AI." }];
                sessionStorage.setItem("messages", JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        }
    } catch (error) {
        // console.error("Error fetching AI response:", error);
        setMessages((prev) => {
            const updatedMessages = [...prev, { sender: "ai", text: "Something went wrong" }];
            sessionStorage.setItem("messages", JSON.stringify(updatedMessages));
            return updatedMessages;
        });
    }
 
    setInput('')
    setLoading(false);
};
useEffect(() => {
    if (messageBoxRef.current) {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
}, [messages]);

const messageBoxRef = useRef(null);
    return (
        <div  className='w-screen relative transition-all duration-700 scroll-smooth overflow-x-hidden'>
            <Navbar />
            <HeroSection />

            <StartWith isDarkMode={isDarkMode} />
            <Courses />
            <Startup isDarkMode={isDarkMode} />


         { help ?   //ai chat 
            <div  className='fixed text-black  h-[80%] w-70 border transition-all  duration-500 shadow-md   bottom-0 mb-3  right-5 flex gap-3 flex-col p-2  justify-start  items-center   rounded-lg '>
                <div className='bg-white w-full flex '>
                    <button className='p-2 font-bold' onClick={() => {
                        setHelp(false)
                    }}><i className="ri-close-large-fill"></i></button>
                <h1 className="text-2xl bg-white w-full text-center p-2  font-bold ">Chat Support</h1>
                </div>
 
      <div ref={messageBoxRef} className="border px-4 py-2 message-box rounded h-full mb-22 overflow-y-auto w-full  ">
        { loading ? 
        <div className='h-full w-full flex items-center justify-center'>
  <span className='loader'></span>
        </div>
        : Array.isArray(messages)  &&   messages?.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded w-fit max-w-xs ${
              msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

<div className='absolute rounded-lg p-2  w-full bottom-0  '>
    <form onSubmit={(e) => {
        e.preventDefault()
        getSupport()}} >
    <textarea 
  className="resize-none  bottom-0 left-0 right-0 h-20 w-full bg-white border-t border-gray-300 p-2 focus:outline-none" 
  name="input" 
  placeholder='Enter Your Query '
  id="input"
  required
  value={input} 
  onChange={(e) => {
    setInput(e.target.value) ;
  }}

>
  
</textarea>

<button  className='absolute right-2 p-2'>
<i className="   font-bold   ri-send-plane-fill"></i>
</button>

    </form>

</div>
 

                </div>


:
            //  {/* ai logo  */}

            <div onClick={() => {
                setHelp(true)
            }} className={`fixed  ${help ? 'h-0' :'h-35'} ease-in transition-all duration-500 w-20 aspect-square  bottom-15 right-5 flex gap-3 flex-col justify-center  items-center  ` }>
                <div className='h-4 w-4 aspect-square rounded-full  bg-blue-300 bgpic '>

                </div>
                <div className='h-6 w-6 aspect-square rounded-full  bg-blue-300 bgpic '>

                </div>
              <img  className='h-[60%] hover:scale-105 bgpic w-[60%] aspect-square rounded-full transition-all duration-100  ' src='data:image/jpeg;base64,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' alt="" />

              <p className='bgpic bg-white text-black rounded-lg p-1 '>May I Help You !</p>
            </div>}

            <div className="text-2xl mb-5 font-bold flex justify-center uppercase" id='info'>our team</div>
            <ImageSlider images={SliderData} />

            <WhyUs />

            <Footer />
        </div>
    );
};

export default Home;

