import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import NewBoardForm from './components/NewBoardForm'
import NewCardForm from './components/NewCardForm'

const URL = 'TBD';

function App() {
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState('Loading...');


  const addBoard = (boardData) => {
    axios
      .post(`${URL}/boards`, boardData)
      .then((response) => {
        const newBoard = response.data;
        setBoards([...boards, newBoard]);
      })
      .catch((error) => console.log(error));
  };

  const addCard = (cardData) => {
    axios
      .post(`${URL}/cards`, cardData)
      .then((response) => {
        const newCard = response.data;
        setCards([...cards, newCard]);
      })
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const newBoards = response.data.map((board) => {
          return {
            board_id: board.id,
            title: board.title,
            owner: board.owner
          };
        });
        setStatus('Loaded');
        setBoards(newBoards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const newCards = response.data.map((card) => {
          return {
            card_id: card.id,
            message: card.title,
            likes_count: card.likes_count,
            // board_id: ?
          };
        });
        setStatus('Loaded');
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>INSPIRATION BOARD</h1>
      </header>
      <main>
        <div>
          <NewBoardForm>
            <NewBoardForm addBoardCallback={addBoard} />
          </NewBoardForm>
        </div>
        <div>
          <NewCardForm>
            <NewCardForm addCardCallback={addCard} />
          </NewCardForm>
        </div>
      </main>
    </div>
  );
};

export default App
