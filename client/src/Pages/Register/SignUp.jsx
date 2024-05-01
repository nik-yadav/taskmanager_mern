import React, { useState } from 'react'
import "./Register.css"
import {Link, useNavigate} from 'react-router-dom';
const SignUp = () => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username:"",
    password:"",
    email:"",
  })

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(credentials)

    const response = await fetch('http://localhost:8000/user/createuser',{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        email: credentials.email   
      })
    })

    const response1 = await response.json();
    if(!response1.success){
      if(response1.message){
        alert(response1.message)
      }else{
        alert("Server Error")
      }
    }

    if(response1.success){
      alert("User Created")
      navigate('/login')
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
            <input type='email' name="email" placeholder='Email...' onChange={onchange}/>
            <input type='password' name='password' placeholder='Password...' onChange={onchange}/>
            <button className='button' type='submit'>Sign Up</button>
          </form>
          <div className='line'></div>
          <Link className='button1' to={"/login"}>Sign In</Link>
        </div>
    </div>
  )
}

export default SignUp