import Board from './Board';

const BoardList = ({ boards, onBoardSelect, selectedBoard }) => {
    return (
        <div className="board-list-main-container">
            <div className="boards-section">
                <h2 className="hand-drawn-header">Boards</h2>
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
            </div>
        </div>
    );
};

export default BoardList;