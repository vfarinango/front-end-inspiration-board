import { useState } from 'react';
import './Card.css';

const Card = ({ id, message, initialLikeCount, onDeleteCard, onLikeCard }) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = () => {
    setLikeCount(prev => prev + 1);
    onLikeCard?.(id);
  };

  const handleDeleteClick = () => {
    onDeleteCard?.(id);
  };

  return (
    <div className="card-container">
      <p className="card-description">{message}</p>
      <div className="card-actions">
        <span className="like-display">💕 {likeCount}</span>
        <button onClick={handleLike} className="card-button like-button">+1</button>
        <button onClick={handleDeleteClick} className="card-button delete-button">Delete</button>
      </div>
    </div>
  );
};

export default Card;