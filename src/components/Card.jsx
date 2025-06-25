import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './Card.css';

// The Card component represents a single sticky note with content and interactions.
// Need to add description as a Prop to Card
const Card = ({id, initialLikeCount, onDeleteCard}) => {
    
    // State to manage the like count, initialized with the prop value.
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const DESCRIPTION = ["Effort won't betray you 💖."]

    const handleLike = () => {
        setLikeCount(prevCount => prevCount + 1);
    };

    const handleDeleteClick = () => {
        if (onDeleteCard) {
            onDeleteCard(id);
        }
    };

    return (
        <div className="card-container">
            <p className="card-description">{DESCRIPTION}</p>
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

Card.propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    initialLikeCount: PropTypes.number.isRequired,
    onDeleteCard: PropTypes.func.isRequired,
};

export default Card;