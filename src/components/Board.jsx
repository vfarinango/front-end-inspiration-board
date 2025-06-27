import PropTypes from 'prop-types';

const Board = ({board, onBoardSelect, isSelected}) => {
    const handleClick = () => {
        if (onBoardSelect) {
            onBoardSelect(board.id)
        }
    };

    const boardClasses = `board-item ${isSelected ? 'board-item-selected' : ''}`;

    return (
        <li className={boardClasses} onClick={handleClick}>
            {board.name}
        </li>

    );

};


Board.propTypes = {
    board: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        
    }).isRequired,
    onBoardSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};

export default Board;