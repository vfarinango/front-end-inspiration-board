import Card from './Card';
import './CardList.css';

const CardList = ({cards, onDeleteCard, onLikeCard}) => {
    const getCardListJSX = (cards) => {
        return cards.map((card) => (
            <li key={card.id}>
            <Card
                id={card.id}
                message={card.message}
                initialLikeCount={card.initialLikeCount || 0}
                onDeleteCard={onDeleteCard}
                onLikeCard={onLikeCard}
            />
            </li>        
        ));
    };
    return <ul className="cards-list">{getCardListJSX(cards)}</ul>
};


export default CardList;