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

export default Board;