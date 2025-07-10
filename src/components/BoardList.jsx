import Board from './Board';

const BoardList = ({ boards, onBoardSelect, selectedBoard }) => {
    return (
        <ol className="board-list-ol">
        {boards.map((board) => (
            <Board
            key={board.id}
            board={board}
            onBoardSelect={onBoardSelect}
            isSelected={selectedBoard && board.id === selectedBoard.id}
            />
        ))}
        </ol>
    );
};

export default BoardList;