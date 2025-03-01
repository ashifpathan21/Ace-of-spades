import { useState } from 'react'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import 'remixicon/fonts/remixicon.css'
import {Routes , Route , BrowserRouter} from 'react-router-dom'
import BackgroundEffect from "./components/BackgroundEffect.jsx";
import "./components/BackgroundEffect.css";
import MyProfile from "./pages/MyProfile.jsx";
import Courses from "./pages/Courses.jsx";
import FindFriends from './pages/FindFriends.jsx'
import Message from './pages/Message.jsx'
import Logout from './pages/Logout.jsx'
function App() {
  
  return (



    

   <div className='overflow-hidden'>


 
 <BackgroundEffect />

 <div className="content">

<BrowserRouter>
<Routes>
 <Route path='/' element={<Home/>}>  </Route>
 <Route path='/login' element={<Login/>}>  </Route>
 <Route path='/logout' element={<Logout/>}>  </Route>
 <Route path='/signup' element={<Signup/>}>  </Route>
 <Route path='/profile' element={<MyProfile/>}></Route>
 <Route path='/courses' element={<Courses/>}></Route>
 <Route path='/find-friends' element={<FindFriends/>}></Route>
 <Route path='/chats' element={<Message/>}></Route>
</Routes>
</BrowserRouter>

</div>
   </div>
  )
}

export default App
