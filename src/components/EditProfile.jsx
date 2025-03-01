import React , {useState , useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateUser  } from "../Slices/userSlice.js";
import {useNavigate} from 'react-router-dom'
import '../index.css';


const EditProfile = (props) => {
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.user);
    
    
    const inputFile = useRef(null)

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
            
                setimg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const dispatch = useDispatch() ; 

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [userName, setUserName] = useState(user.userName)
    const [bio, setBio] = useState(user.bio)
    const [mobileNo, setMobileNo] = useState(user.mobileNo)
    const [img, setimg] = useState(user.img) 
    const [linkedinUrl, setLinkedinUrl] = useState(user.linkedinUrl) 
    const [email, setemail] = useState(user.email) 
    const [loading, setLoading] = useState(false)

    const [gender, setGender] = useState(user.details.gender);
    const [dob, setDob] = useState(user.details.dob);
    const [college, setCollege] = useState(user.details.college);

    const payload = {
        firstName,
        lastName,
        userName,
        bio,
        mobileNo,
        img,
        linkedinUrl,
        details:{
            gender,
            dob,
            college
        }
    }

    async function update(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
          

        dispatch(updateUser(payload));
        
        props.setEditModal(false)
     
            setLoading(false);
     
    }
    
return (
    <div className='px-4 flex flex-col w-full '>
        {
            loading ?
             (     
                <div className='w-full mb-3 flex justify-center items-center '>

<span className='loader'></span>
                </div>
               
            
            ) :
                 
                 
                 (

                    <form  onSubmit={(e) => {
                        update(e) ;
    
                     }}>
                     <div className='w-full mb-3 flex justify-center items-center '>
                         
                         <div className='rounded-full relative text-center bg-amber-100 h-30 w-30'>
                                <img src={img} className='rounded-full h-29 w-29'  />

                                <i onClick={onButtonClick} className="absolute text-lg bg-white rounded-full p-1 px-2 bottom-1 right-1 ri-pencil-line"></i>
                                <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onFileChange}/>
                         </div>
    
                     </div>
    
    
                <div className='flex items-center gap-3 justify-between w-full '>
                         
                        <div className='w-[49%] flex flex-col p-1'>  
                                <label htmlFor="firstname">First Name</label>
                        <input id='firstname' type="text"  className='bg-white text-gray-900 rounded-lg w-full p-2' onChange={(e)=>{
                                setFirstName(e.target.value)
                        }}   value={firstName}/></div>
                        
                        <div className='w-[49%] flex flex-col p-2'>  
                                <label htmlFor="firstname">Last Name</label>
                        <input id='firstname' type="text"  className='bg-white text-gray-900  rounded-lg w-full p-2' onChange={(e)=>{
                                setLastName(e.target.value)
                        }} value={lastName} /></div>
                </div>
                 
    
                <div className='flex items-center gap-3 justify-between w-full '>
                         
                         <div className='w-[49%] flex flex-col p-1'>  
                                 <label htmlFor="mobileNo">Mobile No:</label>
                         <input type="tel" className='bg-white text-gray-900  rounded-lg w-full pl-4 p-2'   value={mobileNo} onChange={(e)=>{
                                 setMobileNo(e.target.value)
                         }} id='mobileNo' /></div>
                         
                         <div className='w-[49%] flex flex-col p-2'>  
                                 <label htmlFor="bio">Role</label>
                         <input id='bio' type="text"  className='bg-white text-gray-900  rounded-lg w-full p-2' onChange={(e)=>{
                                 setBio(e.target.value)
                         }} value={bio} /></div>
                 </div>
    
    
    
    
    
                 <div className="flex  flex-col p-2 w-full "> 
                         <label htmlFor="username">   Username</label>
                    <div className='relative'>
                        <p className='absolute px-2 text-xl h-full flex justify-center items-center'>  <i className="ri-at-line"></i></p>
                 
                    <input className='bg-white text-gray-900  rounded-lg w-full pl-8 p-2'  type="text" value={userName} onChange={(e)=>{
                                setUserName(e.target.value)
                        }} id='username'  />
                
                    </div>
                    </div>
                
    
                 <div className="flex flex-col p-2 w-full "> 
                        <label htmlFor="linkedin">LinkedIn URL</label>
                 <input className='bg-white text-gray-900  rounded-lg w-full p-2'  type="text" value={linkedinUrl} onChange={(e)=>{
                                setLinkedinUrl(e.target.value)
                        }} id='linkedin'  />
                    </div>
    
    
            <div className='flex items-center gap-3 justify-between w-full '>
                <div className='w-[49%] flex flex-col p-1'>  
                    <label htmlFor="gender">Gender</label>
                    <select id='gender' className='bg-white text-gray-900 rounded-lg w-full p-2' onChange={(e) => {
                        setGender(e.target.value)
                    }} value={gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div className='w-[49%] flex flex-col p-2'>  
                    <label htmlFor="dob">Date of Birth</label>
                    <input id='dob' type="date" className='bg-white text-gray-900 rounded-lg w-full p-2' onChange={(e) => {
                        setDob(e.target.value)
                    }} value={dob} />
                </div>
            </div>



            <div className='flex flex-col p-2 w-full'>
                <label htmlFor="college">College</label>
                <select id='college' className='bg-white text-gray-900 rounded-lg w-full p-2' onChange={(e) => {
                    setCollege(e.target.value)
                }} value={college}>
                    <option value="JEC JABALPUR">JEC JABALPUR</option>
                    <option value="MITS GWALIOR">MITS GWALIOR</option>
                    <option value="IPS INDORE">IPS INDORE</option>
                    <option value="SAGE INDORE">SAGE INDORE</option>
                    <option value="PRESTIGE INDORE">PRESTIGE INDORE</option>
                    <option value="NONE">NONE</option>
                </select>
            </div>
                
    
                 <div className="flex flex-col p-2 w-full "> 
                         <label htmlFor="email">   Email</label>
                 <input className='bg-white text-gray-900  rounded-lg w-full p-2'  type="text" value={email} id='email' readOnly />
                    </div>
    
    
                  <div className='w-full flex justify-center mt-4'>
                  <button className='p-4 mt-3 bg-green-500 rounded-lg font-semibold   '>
                     Save Changes
                  </button>
                  </div>
                
                 
             
                 
                    </form>
    

                 )
        }         
      
              
         
     
    </div>
)
}

export default EditProfile
