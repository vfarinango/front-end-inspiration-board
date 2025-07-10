import Card from './Card';
import './CardList.css';

const CardList = ({cards, onDeleteCard}) => {
    const getCardListJSX = (cards) => {
        return cards.map((card) => {
            return (
                <Card
                    id={card.id}
                    description={card.description}
                    initialLikeCount={card.initialLikeCount}
                    onDeleteCard={onDeleteCard}
                ></Card>
            );
        });
    };
    return <ul className="cards-list">{getCardListJSX(cards)}</ul>
};


export default CardList;