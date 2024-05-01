import React, { useEffect, useState } from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom"
import {BiMenuAltRight} from 'react-icons/bi'
import Login from '../Pages/Login/Login'
import {Avatar} from "@mui/material"
import cat from "../assets/image.png"

import "./Header.css"

const Header = () => {

    
    const navigate = useNavigate();
    
    const [opened, setopened] = useState(false)

    const handleAddProperty = () => {
        setopened(true)
    }

    const handlelogout = () => {
        localStorage.clear();
    }

  return (
    <section className='h-wrapper'>
        <div className='flexCenter innerWidth paddings h-container'>
            <Link to="/">
                {/* <img src={cat} alt='logo' width={100} /> */}
                <div>Logo</div>
            </Link>  

            <div className='flexCenter h-menu'>
                <NavLink className="button" to="/newtask">+ Add Task</NavLink>
                {/* <div onClick={handleAddProperty}>Add Property</div> */}
                {/* <AddProperty opened={opened} setopened={setopened} /> */}
                {/* <button className='button' onClick={()=>navigate('/login')}>Login</button> */}

                {!localStorage.getItem('authToken')?
                    (
                        <button className='button' onClick={()=>navigate('/login')}>Login</button>
                    )
                    :(
                        <div onClick={handlelogout}>
                            <Avatar src="/broken-image.jpg"/>
                        </div>
                        
                    )}
            </div>
        </div>
    </section>
  )
}

export default Header