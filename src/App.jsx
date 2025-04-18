import { useState } from 'react'
import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Signup from './pages/Auth/Signup.jsx';
import 'remixicon/fonts/remixicon.css'
import {Routes , Route , BrowserRouter} from 'react-router-dom'
import BackgroundEffect from "./components/BackgroundEffect.jsx";
import "./components/BackgroundEffect.css";
import MyProfile from "./pages/MyProfile.jsx";
import Courses from "./pages/Courses.jsx";
import FindFriends from './pages/FindFriends.jsx'
import Message from './pages/Message.jsx'
import Logout from './pages/Auth/Logout.jsx'
import Task from './pages/Task'
import Enroll from "./pages/Enroll.jsx";
import UserProtectedWrapper from './pages/Auth/UserProtectedWrapper.jsx'
import InstructorHome from './pages/instructor/InstructorHome.jsx'
import InstructorCourses from './pages/instructor/InstructorCourses.jsx'
import InstructorProtectedWrapper from './pages/instructor/InstructorProtectedWrapper.jsx'
import InstructorCoursesCreate from './pages/instructor/InstructorCoursesCreate.jsx'
import InstructorCoursesUpdate from './pages/instructor/InstructorCoursesUpdate.jsx'
import AboutUs from './pages/AboutUs.jsx'
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

 <Route path='/profile' element={
   <UserProtectedWrapper>
  <MyProfile/>
  </UserProtectedWrapper>
  }></Route>
 <Route path='/courses' element={
    <UserProtectedWrapper>
     <Courses/>
    </UserProtectedWrapper>
 
  }></Route>
 <Route path='/courses/:id' element={
    <UserProtectedWrapper>
          <Enroll/>
  </UserProtectedWrapper>
  }></Route>
 <Route path='/courses/progress/:id' element={
    <UserProtectedWrapper>
          <Task/>
  </UserProtectedWrapper>
  }></Route>
 <Route path='/find-friends' element={
   <UserProtectedWrapper>
  <FindFriends/>
  </UserProtectedWrapper>
  }></Route>
 <Route path='/chats' element={
  <UserProtectedWrapper>
  <Message/>
  </UserProtectedWrapper>
}
  ></Route>


{/* about use route  */}
<Route path='/about' element={
  <AboutUs />
}
>
</Route>

  {/* instructors routes  */}

  <Route path='/instructor/home' element={
    <InstructorProtectedWrapper>
    <InstructorHome/>
    </InstructorProtectedWrapper>
    } / >
  <Route path='/instructor/courses' element={
     <InstructorProtectedWrapper>
    <InstructorCourses/>
    </InstructorProtectedWrapper>
    } / >
  <Route path='/instructor/courses/create' element={
     <InstructorProtectedWrapper>
    <InstructorCoursesCreate/>
    </InstructorProtectedWrapper>
    } / >
  <Route path='/instructor/courses/update' element={
     <InstructorProtectedWrapper>
    <InstructorCoursesUpdate/>
    </InstructorProtectedWrapper>
    } / >



    
</Routes>
</BrowserRouter>

</div>
   </div>
  )
}

export default App
