import Card from './Card';
import './CardList.css';

const CardList = ({ cards, onDeleteCard, onLikeCard }) => {
  return (
    <ul className="cards-list">
      {cards.map((card) => (
        <li key={card.id}>
          <Card
            id={card.id}
            message={card.message}
            initialLikeCount={card.initialLikeCount || 0}
            onDeleteCard={onDeleteCard}
            onLikeCard={onLikeCard}
          />
        </li>
      ))}
    </ul>
  );
};

export default CardList;