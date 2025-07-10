const Board = ({ board, onBoardSelect, isSelected }) => {
  return (
    <li className={`board-item ${isSelected ? "selected" : ""}`}>
      <button onClick={() => onBoardSelect(board)}>
        {board.title} — {board.owner}
      </button>
    </li>
  );
};

export default Board;