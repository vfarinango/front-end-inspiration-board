import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'
import BoardList from './components/BoardList';
import CardList from './components/CardList';
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
    initialLikeCount: card.likes_count || card.likesCount || 0,
    boardId: card.board_id || card.boardId
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
     return response.data.map(convertCardFromApi);  
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

const deleteBoardApi = (boardId) => {
  return axios.delete(`${kBaseUrl}/boards/${boardId}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error deleting board:", error);
    });
};



function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);

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
        return getAllBoards();
      });
  };

  const createCard = (cardData) => {
    if(!selectedBoard) return;
    return createCardApi(selectedBoard.id, cardData)
      .then(() => {
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

  const deleteBoard = () => {
  if (!selectedBoard) return;

  deleteBoardApi(selectedBoard.id)
    .then(() => {
      setBoards(prevBoards => prevBoards.filter(board => board.id !== selectedBoard.id));
      setSelectedBoard(null);
      setCards([]); // clear cards section too
    });
};

  useEffect(() => {
    getAllBoards();
  }, []);


  return (
  <div className='page__container'>
    <header className='App-header'>
      <h1 className='main-app-title'>Inspiration Board</h1>
    </header>

    <main className='content__container'>
      <section className='boards__container'>

        {/* Column 1: Board List */}
        <div className='boards-section'>
          <h2 className="hand-drawn-header">Boards</h2>
          <BoardList
            boards={boards}
            onBoardSelect={selectBoard}
            selectedBoard={selectedBoard}
          />
        </div>

        {/* Column 2: Selected Board Info */}
        <div className='selected-board-section'>
          <h2 className="hand-drawn-header">Selected Board</h2>
          <div className='selected-board-display'>
            {selectedBoard ? `${selectedBoard.title} - ${selectedBoard.owner}` : 'Select a board to view cards.'}
          </div>
        </div>

        {/* Column 3: New Board Form */}
        <div className='new-board-form-container'>
          <h2 className='hand-drawn-header'>Create New Board</h2>
          <NewBoardForm addBoardCallback={createBoard} />
        </div>

        {/* Full-width Row: New Card Form */}
        <div className='new-card-form-container'>
          <h2 className='hand-drawn-header'>Create New Card</h2>
          <NewCardForm addCardCallback={createCard} />
        </div>

        {/* Full-width Row: Cards */}
        {selectedBoard && (
          <div className='cards-section-wrapper'>
            <h2 className='hand-drawn-header'>Cards for {selectedBoard.title}</h2>
            <CardList
              cards={cards}
              onLikeCard={likeCard}
              onDeleteCard={deleteCard}
            />
          </div>
        )}

      </section>
    </main>
  </div>
  );

};

export default App;
