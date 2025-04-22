import React , {useState , useEffect}from 'react'
import Tilt from 'react-parallax-tilt';
import { useNavigate } from "react-router-dom";
import {sendRequest} from '../services/operations/friendApi.js'
import {useDispatch} from 'react-redux'
import {toast } from 'react-hot-toast'
import '../index.css';
const AddFriend = (props) => {
    const {friend , user , isAdded }  = props ;
    const dispatch = useDispatch()
    const [sent , setSent] = useState(false)
    const token = localStorage.getItem('token')

    const navigate = useNavigate() ;

    useEffect(() => {
     
       if(friend?.friendRequest?.includes(user._id)){
        setSent(true)
       }
    } , [])

    const [loading , setLoading] = useState(false )

    async function send(){
           setLoading(true)
            try {
              const responce = await dispatch(sendRequest({friendId:friend._id} , token)) 
              if(responce){
                setSent(true)
                toast.success(responce.data.message)
              }
               
            } catch (error) {
              // console.log(error) ;
              toast.error('Something Went Wrong')
            }
         setLoading(false)
        
    }

  return (
    <div  className={`w-full px-4  items-center backdrop-blur-3xl shadow-cyan-300 shadow-sm hover:shadow-md transition-all duration-500 rounded-lg p-3 justify-around flex`} >
    <img onClick={() => {
      navigate(`/user/${friend?.userName}` , {state:{ user:friend}})
     }} 
    src={friend?.image}  
     className="object-cover aspect-square rounded-full  shadow-emerald-400 w-20"
     />
     <div onClick={() => {
      navigate(`/user/${friend?.userName}` , {state:{ user:friend}})
     }} className='flex flex-col md:flex-row gap-3  lg:flex-row items-center justify-around w-[90%]'>
     <div className="text-center flex flex-col gap-1 sm:text-left">
      <h2 className="text-lg  sm:text-xl capitalize lg:text-2xl">{friend?.firstName + " " + friend?.lastName}</h2>
      <p className="text-sm mt-1 sm:text-base">@{friend?.userName}</p>
    
     </div>

     {
      loading ? <span className='loader'></span> :
        !isAdded &&  <Tilt glareEnable={true} glareMaxOpacity={0.6} glareColor="lightblue" glarePosition="all" glareBorderRadius="40px" >
           <button onClick={() => {
            send()
           }} disabled={sent} className='bg-[#4bffe4] rounded-xl  px-3  inline  py-2  text-gray-600 lg:font-semibold md:font-semibold hover:bg-[#a2f5e9] '>{sent ? 'Request Sent' : <><i className="ri-user-add-fill"></i>Add Friend </>}</button>
       </Tilt>
       
       }
     </div>
  

    </div>
  )
}

export default AddFriend
