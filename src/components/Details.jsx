import React  from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar.jsx'
import { useState } from 'react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import Logo from "../assets/lgo.png";
import '../index.css'
const Details = (props) => {
    const navigate = useNavigate()

const {mode } = props ;


const [showPassword, setShowPassword] = useState(false);

return (
    <div className='min-h-screen w-full flex flex-col items-center p-4 log text-white'>
        <div className='grid grid-cols-2 px-3 py-2 w-full max-w-[550px] mb-5 mt-3 bg-white text-black rounded-lg items-center'>
            <button onClick={() => {
                    navigate('/login')
            }} className={`font-bold rounded-md transition-all duration-1000 p-2 ${mode === 'login' ? "bg-slate-400" : 'bg-white'}`}>
                LogIn
            </button>
            <button onClick={() => {
                    navigate('/signup')
            }} className={`font-bold rounded-md transition-all duration-1000 p-2 ${mode === 'login' ? 'bg-white' : "bg-slate-400"}`}>
                 SignUp
            </button>
        </div>

        {mode === 'login' ? (
            <div className='flex justify-center items-center'>
                <form className='w-full max-w-[650px] gap-3 flex flex-col p-5'>
                    <label htmlFor="email">Email</label>
                    <input className='w-full text-black bg-white border border-black rounded-md text-center' placeholder='Enter Email' type="email" id='email' required />
                    <label htmlFor="password">Password</label>
                    <div className='relative w-full'>
                        <input className='w-full text-black bg-white border border-black rounded-md text-center' placeholder='Enter Password' type={showPassword ? "text" : "password"} id='password' />
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
                <form className='w-full max-w-[650px] gap-3 flex flex-col p-5'>
                    <label htmlFor="name">Name</label>
                    <input className='w-full text-black bg-white border border-black rounded-md text-center' placeholder='Enter Name' type="text" id='name' required />
                    <label htmlFor="email">Email</label>
                    <input className='w-full text-black bg-white border border-black rounded-md text-center' placeholder='Enter Email' type="email" id='email' required />
                    <label htmlFor="password">Password</label>
                    <div className='relative w-full'>
                        <input className='w-full text-black bg-white border border-black rounded-md text-center' placeholder='Enter Password' type={showPassword ? "text" : "password"} id='password' required />
                        <span className='absolute right-2 top-2 text-black cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                        </span>
                    </div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className='relative w-full'>
                        <input className='w-full text-black bg-white border border-black rounded-md text-center' placeholder='Confirm Password' type={showPassword ? "text" : "password"} id='confirmPassword' required />
                        <span className='absolute right-2 top-2 text-black cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                        </span>
                    </div>
                    <label htmlFor="phone">Phone No</label>
                    <div className='flex items-center'>
                        <span className='border-slate-900 border rounded-lg mr-2'>+91</span>
                        <input className='w-full text-black bg-white border border-black rounded-md text-center' placeholder='Enter Phone' type="tel" id='phone' required />
                    </div>
                    <label htmlFor="college">College</label>
                    <select className='w-full text-black bg-white border border-black rounded-md text-center' id='college' required>
                        <option value="jec jabalpur">JEC Jabalpur</option>
                        <option value="mits gwalior">MITS Gwalior</option>
                        <option value="ips indore">IPS Indore</option>
                        <option value="prestige bhopal">Prestige Bhopal</option>
                        <option value="sage indore">SAGE Indore</option>
                        <option value="none">None </option>
                    </select>
                    <div className='w-full mt-6 text-center'>
                        <button className={`transition-all duration-1000 p-2 font-semibold rounded-lg w-50 ${mode ? "bg-white hover:bg-amber-100 text-black" : "bg-black hover:bg-gray-800 text-white"}`}>
                            SignUp
                        </button>
                    </div>
                </form>
            </div>
        )}
    </div>
)
}

export default Details
