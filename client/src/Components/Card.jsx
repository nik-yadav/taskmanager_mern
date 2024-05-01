import React from 'react'
import axios from 'axios'
import './Card.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Card = (props) => {
    
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/updatetask?id=${props.id}&title=${props.title}&assigned=${props.assignedTo}`)
    }

    const handleDelete = async() => {
        try {
            const url = "http://localhost:8000/data/deletedata";
            const response = await axios.post(url,{
                id: props.id
            });
            console.log(response.json);
            if(response.data.success){
                window.location.reload();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='flexColStart r-card'>
        <span className="secondaryText r-text">
            <span style={{ color: "orange" }}>Title: </span>
            <span> {props.title}</span>
        </span>
        <span className="secondaryText r-text">
            <span style={{ color: "orange" }}>Assigned To: </span>
            <span> {props.assignedTo} </span>
        </span>
        <span className="secondaryText r-text">
            <span style={{ color: "orange" }}>Assigned Date: </span>
            <span>{props.date}</span>
        </span>
        <span className="secondaryText r-text">
            <span style={{ color: "orange" }}>Priority: </span>
            <span>{props.priority}</span>
        </span>
        <span className="secondaryText r-text">
            <span style={{ color: "orange" }}>Description: </span>
            <span>{props.description}</span>
        </span>
        <div className='flexStart button-container'>
            <button className='button' onClick={handleEdit}>Edit</button>
            <button className='button' onClick={handleDelete} style={{background: "red"}}>Delete</button>
        </div>
    </div>
  )
}

export default Card