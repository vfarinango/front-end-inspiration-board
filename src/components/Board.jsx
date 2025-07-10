import './Board.css';

const Board = ({ board, onBoardSelect, isSelected }) => {
  return (
    <li
      className={`board-item ${isSelected ? 'board-item-selected' : ''}`}
      onClick={() => onBoardSelect(board)}
    >
      {board.title}
    </li>
  );
};

export default Board;