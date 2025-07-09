import { useState } from "react";
import "./NewBoardForm.css";

const NEW_BOARD = {
  board_id: "",
  title: "",
  owner: "",
};

const NewBoardForm = ({ addBoardCallback }) => {
  const [boardData, setBoardData] = useState(NEW_BOARD);
  const [showForm, setShowForm] = useState(true);

  const submitBoardData = (e) => {
    e.preventDefault();
    addBoardCallback(boardData);
    setBoardData(NEW_BOARD);
  };

  const handleChange = (e) => {
    setBoardData({ ...boardData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <form onSubmit={submitBoardData} className='newBoardForm'>
      <section>
        <h2>CREATE A NEW Board</h2>

        {showForm && (
          <div className='newBoardFields'>
            <label htmlFor='Title'>Title</label>
            <input
              id='title'
              name='title'
              value={boardData.title}
              onChange={handleChange}
            />

            <label htmlFor='OwnerName'>Owner's Name</label>
            <input
              id='owner'
              name='owner'
              value={boardData.owner}
              onChange={handleChange}
            />

            <p>
              Preview: {boardData.title} - {boardData.owner}
            </p>
            <button 
              className='button newBoardSubmit' 
              type='submit'>
              Submit
            </button>
          </div>
        )}
        <button 
          type='button' 
          className='toggleHideForm' 
          onClick={toggleForm}>
          {showForm ? "Hide New Board Form" : "Show New Board Form"}
        </button>
      </section>
    </form>
  );
};

export default NewBoardForm;
