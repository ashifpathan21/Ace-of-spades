import React from 'react'

const ChatFriend = (props) => {
  return (
    <div  onClick={()=>{
      props.setChat(true)
  }} className='w-full flex justify-center p-1'>
  <div className='flex items-center cursor-pointer py-2 justify-center gap-4'>
    <img src={props.friend.img} className='w-10 h-10 rounded-full ' />
        <div className='flex px-2 flex-col'>
          <h2 className='text-left'>{props.friend.name}</h2>

          {/* last Message  */}
          <p className='text-sm text-slate-700 text-left'>Kya haal hai </p>

        </div>
</div>
    </div>
  
  )
}

export default ChatFriend
