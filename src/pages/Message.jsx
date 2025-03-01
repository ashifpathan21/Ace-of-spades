import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";
import ChatFriend from "../components/ChatFriend.jsx";
import { useSelector, useDispatch } from 'react-redux';

const Message = () => {

  const {user } = useSelector((state) => state.user) ; 

    const [chat, setChat] = useState(false)
    const [message , setMessage] = useState('')
    const { friends } = user
  return (
    <div>
          <Navbar />

          <div className=' flex relative justify-between pt-20 max-w-[400px] md:max-w-[700px] mx-auto lg:max-w-[1000px] '  >
        
            {/* users  */}
            <div className='w-full   md:w-[48%] lg:w-[48%] flex flex-col '>
               
               <div className='flex w-full justify-evenly '>
               <h2 className=' text-center text-xl '>Friends</h2>
               <div className='flex gap-3 text-xl '>
               <i className="ri-user-add-fill"></i>
               <i className="ri-add-box-line"></i>
               </div>
              

               </div>
              

            <div className='mt-5 w-full md:w-[48%] lg:w-[48%] flex items-center justify-center  flex-col gap-3  '>
        {    friends.map(( friend,index) => {
            return <ChatFriend key={index} friend={friend}  setChat={setChat}/>
        })
           
          


}


            </div>
            
            </div>

           <div className={`${chat? 'hidden':'hidden'}  border border-slate-900 lg:mr-20 p-2 h-100 overflow-x-hidden overflow-y-scroll transition-all duration-500 relative rounded-lg md:${chat? ('flex') : ('hidden')} lg:${chat? ('flex') : ('hidden')}  flex-col w-[48%] `}>
                  <div className='px-5 '>

                  <div className='flex items-center p-3 absolute top-0  gap-4'>
                    <img src="https://media.licdn.com/dms/image/v2/D4E03AQEbD2_0jRmNAA/profile-displayphoto-shrink_100_100/B4EZVHdUisHcAU-/0/1740660625642?e=2147483647&v=beta&t=cXD01gbX28kyKCFPt9HVEIVB4K50zFDpbjcaIb6N8Ks" className='w-10 h-10 rounded-full ' />
                       <h2>Balram Meena</h2>

                  </div>
       


                       
                  <div className='absolute w-[90%] flex  bottom-0  rounded-lg bg-red-400'>
                          
                  <textarea id="message" onChange={(e) =>{
                    setMessage(e.target.value)
                  }} rows={`${message.length > 50 ? '3' : '1'}`} className="block p-2 bg-white resize-none  text-black rounded-lg  w-full" value={message} placeholder="message.."></textarea>

                          <button className='absolute right-1  rounded-lg bottom-0 text-xl text-center  p-2'>
                          <i className="ri-send-plane-fill"></i>
                          </button>
                    
                        
                     </div>
                  </div>
           </div>

         {/* for mobile */}


          </div>
        
    </div>
  )
}

export default Message
