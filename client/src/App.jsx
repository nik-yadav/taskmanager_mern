import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home.jsx"
import Login from './Pages/Login/Login.jsx'
import SignUp from './Pages/Register/SignUp.jsx'
import Header from './Components/Header.jsx'
import NewTask from './Pages/NewTask/NewTask.jsx'
import UpdateTask from './Pages/UpdateTask.jsx'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/newtask' element={<NewTask />}/>
        <Route path='/updatetask' element={<UpdateTask />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </Router>
  )
}

export default App