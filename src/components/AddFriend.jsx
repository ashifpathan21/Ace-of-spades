import React from 'react'
import Tilt from 'react-parallax-tilt';

const AddFriend = (props) => {
    const {search }  = props
  return (
    <div className={`w-full px-4  justify-between ${search? 'flex' : 'hidden'} `} >
    <img 
     src='https://media.licdn.com/dms/image/v2/D4E03AQGxd5auujKUdw/profile-displayphoto-shrink_400_400/B4EZN35FAFH0Ak-/0/1732883272981?e=1746057600&v=beta&t=eFukPyg7e_7oC5CZjyz9igSrciVFJoz4vHUzwDT2uJc'  
      width={90} 
     className="object-cover rounded-full border-4 border-gray-300 sm:w-24 lg:w-28"
     />
   <div className="text-center flex flex-col gap-1 sm:text-left">
      <h2 className="text-lg  sm:text-xl lg:text-2xl">Anurag Meena</h2>
      <p className="text-sm mt-1 sm:text-base">@anuragmeena2431</p>
      <Tilt glareEnable={true} glareMaxOpacity={0.6} glareColor="lightblue" glarePosition="all" glareBorderRadius="40px" >
           <button className='bg-[#4bffe4] rounded-xl w-full px-3   py-2  text-gray-600 lg:font-semibold md:font-semibold hover:bg-[#a2f5e9] '><i className="ri-user-add-fill"></i>Add Friend</button>
       </Tilt>
     </div>
    </div>
  )
}

export default AddFriend
