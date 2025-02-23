import { useState } from 'react'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import 'remixicon/fonts/remixicon.css'
import {Routes , Route , BrowserRouter} from 'react-router-dom'

function App() {
  
  return (
   <div className='overflow-hidden'>

<BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}>  </Route>
  <Route path='/login' element={<Login/>}>  </Route>
  <Route path='/signup' element={<Signup/>}>  </Route>
</Routes>
</BrowserRouter>

   </div>
  )
}

export default App
