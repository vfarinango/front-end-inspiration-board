import {useState, useEffect} from 'react';
import Board from './Board';


const BoardList = () => {
    // State to store the list of available boards
    const [boards, setBoards] = useState([]);

    // State to store the ID of the currently selected board
    const [selectedBoardId, setSelectedBoardId] = useState(null);

    // State to store the full object of the currently selected board
    const [selectedBoard, setSelectedBoard] = useState(null);


    // useEffect to simulate fetching boards from an API when the component mounts
    useEffect(() => {
        // Mock API call to fetch boards
        const fetchBoards = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve([
                        { id: 'board1', name: 'Pick-me-up Quotes', owner: 'Ada L.' },
                        { id: 'board2', name: 'Messages to Code', owner: 'Dev Team' },
                        { id: 'board3', name: 'Im so tired', owner: 'Anonymous' },
                        { id: 'board4', name: 'Weekend Plans', owner: 'Project Group' },
                    ]);
                }, 500); 
            });
        };

        fetchBoards().then(data => {
            setBoards(data);
            
            if (data.length > 0) {
                setSelectedBoardId(data[0].id);
                setSelectedBoard(data[0]);
            }
        });
    }, []); 


    // Handles the selection of a board.
    // Updates the selectedBoardId state and the selectedBoard object.
    const handleBoardSelect = (boardId) => {
        setSelectedBoardId(boardId);
        const boardToSelect = boards.find(board => board.id === boardId);
        setSelectedBoard(boardToSelect);
    };

    return (
        <div className="board-list-main-container">
            <div className="boards-section">
                <h2 className="hand-drawn-header">Boards</h2>
                <ol className="board-list-ol">
                    {boards.map(board => (
                        <Board
                            key={board.id}
                            board={board}
                            onBoardSelect={handleBoardSelect}
                            isSelected={board.id === selectedBoardId}
                        />
                    ))}
                </ol>
            </div>

            
            <div className="selected-board-section">
                <h2 className="hand-drawn-header">Selected Board</h2>
                <p className="selected-board-display">
                    {selectedBoard ? `${selectedBoard.name} - ${selectedBoard.owner}` : 'Select a Board from the Board List!'}
                </p>
            </div>

            
            {selectedBoard && (
                <div className="boards-section cards-section-wrapper"> 
                    <h2 className="hand-drawn-header">Cards for {selectedBoard.name}</h2>
                    
                </div>
            )}
        </div>
    );
};

export default BoardList;