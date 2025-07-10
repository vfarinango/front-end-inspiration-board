import {useState} from 'react';
import './Card.css';

// The Card component represents a single sticky note with content and interactions.
// Need to add description as a Prop to Card
const Card = ({id, message, initialLikeCount, onDeleteCard, onLikeCard}) => {
    
    // State to manage the like count, initialized with the prop value.
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const handleLike = () => {
        setLikeCount(prevCount => prevCount + 1);
        if (onLikeCard) {
            onLikeCard(id);
        }
    };

    const handleDeleteClick = () => {
        if (onDeleteCard) {
            onDeleteCard(id);
        }
    };

    return (
        <div className="card-container">
            <p className="card-description">{message}</p>
            <div className="card-actions">
                <span className="like-display">💕 {likeCount}</span>
                <button onClick={handleLike} className="card-button like-button">
                    +1
                </button>

                <button onClick={handleDeleteClick} className="card-button delete-button">
                    Delete
                </button>
            </div>

            
        </div>
    );
};

export default Card;