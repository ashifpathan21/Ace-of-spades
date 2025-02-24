import { useState } from 'react'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import 'remixicon/fonts/remixicon.css'
import {Routes , Route , BrowserRouter} from 'react-router-dom'
import BackgroundEffect from "./components/BackgroundEffect.jsx";
import "./components/BackgroundEffect.css";
function App() {
  
  return (



    

   <div className='overflow-hidden'>


 
 <BackgroundEffect />

 <div className="content">

<BrowserRouter>
<Routes>
 <Route path='/' element={<Home/>}>  </Route>
 <Route path='/login' element={<Login/>}>  </Route>
 <Route path='/signup' element={<Signup/>}>  </Route>
</Routes>
</BrowserRouter>

</div>
   </div>
  )
}

export default App
