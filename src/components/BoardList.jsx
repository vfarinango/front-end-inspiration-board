import Board from './Board';


const BoardList = ({ boards, onBoardSelect, selectedBoard}) => {
    return (
        <div className="board-list-main-container">
            <div className="boards-section">
                <h2 className="hand-drawn-header">Boards</h2>
                <ol className="board-list-ol">
                    {boards.map(board => (
                        <Board
                            key={board.id}
                            board={board}
                            onBoardSelect={onBoardSelect}
                            isSelected={selectedBoard && board.id === selectedBoard.id}
                        />
                    ))}
                </ol>
            </div>

            
            <div className="selected-board-section">
                <h2 className="hand-drawn-header">Selected Board</h2>
                <p className="selected-board-display">
                    {selectedBoard ? `${selectedBoard.title} - ${selectedBoard.owner}` : 'Select a Board from the Board List!'}
                </p>
            </div>

            
            {selectedBoard && (
                <div className="boards-section cards-section-wrapper"> 
                    <h2 className="hand-drawn-header">Cards for {selectedBoard.title}</h2>
                    
                </div>
            )}
        </div>
    );
};

export default BoardList;