import PropTypes from 'prop-types';
import Card from '.Card';
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

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDeleteCard: PropTypes.func.isRequired
};

export default CardList;