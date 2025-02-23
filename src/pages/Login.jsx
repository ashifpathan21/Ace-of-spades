import React , {useState} from 'react'
import Details from '../components/Details.jsx'

const Login = () => {
const[ mode , setMode] = useState('login')

  return (
    <div>
        <Details mode={mode} setMode={setMode}/>
      
    </div>
  )
}

export default Login
