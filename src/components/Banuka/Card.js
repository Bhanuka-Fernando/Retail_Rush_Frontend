import React from 'react'
import './Card.css';
import { useNavigate } from 'react-router-dom';

export default function Card({ title, image, description,id }) {
  const navigate = useNavigate();

  const handleCardClick = () =>{
    navigate(`/Banuka/singleproduct/${id}`)
  }

  return (
    
    <div className="card" onClick={handleCardClick}>
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2>{title}</h2>
        <p>RS :{description}</p>
      </div>
    </div>
    
  )
}

