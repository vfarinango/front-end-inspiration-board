import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import BoardList from './components/BoardList';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';


const kBaseUrl = 'https://back-end-inspiration-board-97fl.onrender.com';




const convertBoardFromApi = (apiBoard) => {
  return {
    id: apiBoard.board_id,
    title: apiBoard.title,
    owner: apiBoard.owner
  };
};


const convertCardFromApi = (card) => {
  return {
    id: card.card_id,
    message: card.message,
    likes_count: card.likes_count || card.likesCount || 0,
    board_id: card.board_id || card.boardId
  };
};


const getAllBoardsApi = () => {
  return axios.get(`${kBaseUrl}/boards`)
   .then( response => {
      return response.data.map(convertBoardFromApi);
   })
   .catch( error => {
     console.log(error);
   });
};

const getCardsApi = (boardId) => {
  return axios.get(`${kBaseUrl}/boards/${boardId}/cards`)
   .then( response => {
     return response.data.map()(convertCardFromApi);
   })
   .catch( error => {
    console.log(error);
   });
};

const createBoardApi = (boardData) => {
  return axios.post(`${kBaseUrl}/boards`, boardData)
   .then( response => {
      return convertBoardFromApi(response.data);
   })
   .catch( error => {
    console.log(error);
   });
};


const createCardApi = (boardId, cardData) => {
  return axios.post(`${kBaseUrl}/boards/${boardId}/cards`, cardData)
   .then( response => {
      return convertCardFromApi(response.data);
   })
   .catch( error => {
     console.log(error)
   });
};


const likeCardApi = (cardId) => {
  return axios.patch(`${kBaseUrl}/cards/${cardId}/like`)
  .then(response => {
      return convertCardFromApi(response.data);
  })
  .catch( error => {
    console.log(error);
  });
};

const deleteCardApi = (cardId) => {
  return axios.delete(`${kBaseUrl}/cards/${cardId}`)
    .then(response => {
      return response.data;
    })
    .catch( error => {
      console.log(error);
    });
};




function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);
  // const [isBoardFormVisible, setIsBoardFormVisible] = useState(false);
  // const [isCardFormVisible, setIsCardFormVisible] = useState(false);

  const getAllBoards = () => {
    return getAllBoardsApi()
      .then(boards => setBoards(boards));
  };

  const getCards = (boardId) => {
    return getCardsApi(boardId)
      .then(cards => {
        setCards(cards)}
      );
  };

  const createBoard = (boardData) => {
    return createBoardApi(boardData)
      .then(() => {
        setIsBoardFormVisible(false);
        return getAllBoards();
      });
  };

  const createCard = (cardData) => {
    if(!selectedBoard) return;
    return createCardApi(selectedBoard.id, cardData)
      .then(() => {
        setIsCardFormVisible(false);
        return getCards(selectedBoard.id);
      });
  };

  const selectBoard = (board) => {
    setSelectedBoard(board);
    getCards(board.id);
  };

  const likeCard = (cardId) => {
    return likeCardApi(cardId) 
      .then(updatedCard => {
        setCards(prevCards =>
          prevCards.map(card => 
            card.id === cardId ? updatedCard : card)
        );
      });
  };

  const deleteCard = (cardId) => {
    return deleteCardApi(cardId)
      .then(() => {
        setCards(prevCards => prevCards.filter(card => card.id !== cardId));
      });
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className="main-app-title">Inspiration Board</h1>
      </header>
      <main>
        <div className='board-list-main-container'>
        <div className='board-content-wrapper'>
          {/* Left Side - Boards */}
          <div className='boards-section'>
            <div className='hand-drawn-header'>Boards</div>
            
            <BoardList
              boards={boards}
              onBoardSelect={selectBoard}
              selectedBoard={selectedBoard}
            />
          </div>

          {/* Selected Board Section */}
          <div className='selected-board-section'>
            <div className='hand-drawn-header'>Selected Board</div>
            {selectedBoard ? (
              <div className='selected-board-display'>
                {selectedBoard.title} - Add 1...
              </div>
            ) : (
              <div className='selected-board-display'>
              </div>
            )}
          </div>

          <div>
            <NewBoardForm addBoardCallback={createBoard} />
          </div>

          <div>
            <NewCardForm addCardCallback={createCard} />
          </div>


          {/* --- Qiaoqiao Code Insert Here ----
          
          <div className="forms-section">
            <NewBoardForm
              onBoardCreate={createBoard}
              isVisible={isBoardFormVisible}
              onToggleForm={() => setIsBoardFormVisible(!isBoardFormVisible)}
            />

            <NewCardForm
              onCardCreate={createCard}
              selectedBoard={selectedBoard}
              isVisible={isCardFormVisible}
              onToggleForm={() => setIsCardFormVisible(!isCardFormVisible)}
            />
          </div> 
          */}
          

        </div>


        {/* Cards Section */}
        {selectedBoard && (
          <div className='cards-section-wrapper'>
            <div className='hand-drawn-header'>Cards for {selectedBoard.title}</div>
            <CardsList
              cards={cards}
              onCardLike={likeCard}
              onCardDelete={deleteCard}
            />
            </div>
          )}
          </div> 
      </main>
    </div>
  );
};

export default App;
