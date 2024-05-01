import React, { useContext, useState } from 'react'
import "./Login.css"
import {Link, useNavigate} from 'react-router-dom';
// import {user} from "../../Context/userContext"
const Login = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username:"",
    password:"",
  })

  const handleSubmit = async(e) => {

    e.preventDefault();

    // console.log(credentials)

    const response = await fetch('http://localhost:8000/user/loginuser',{
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      })
    })

    const json = await response.json();
    if(!json.success){
      if(json.message){
        alert("Invalid Credentials")
      }else{
        alert("Server error, Please try after some time")
      }
    }

    if(json.success){
      localStorage.setItem("authToken", json.authToken)
      // setuserState(json.data)
      navigate('/');
    }

  }

  const onchange = (e) => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <div className='wrapper'>
        <div className='l-card flexColCenter innerWidth paddings'>
          <div className="img-container">
            <img src='./favicon.jpg' alt='' />
          </div>
          <h1>Task Manager</h1>
          <form onSubmit={handleSubmit}>
            <input type='text' name="username" placeholder='Username...' onChange={onchange}/>
            <input type='password' name='password' placeholder='password...' onChange={onchange}/>
            <button className='button' type='submit'>Sign In</button>
          </form>
          <div className="line"></div>
          <Link className='button1' to={"/signup"}>New User? Sign Up</Link>
        </div>
    </div>
  )
}

export default Login

