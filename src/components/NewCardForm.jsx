import { useState } from "react";
import PropTypes from "prop-types";
import "./NewCardForm.css";

const NEW_CARD = {
  message: "",
};

const NewCardForm = ({ addCardCallback }) => {
  const [cardData, setCardData] = useState(NEW_CARD);

  const submitCardData = (e) => {
    e.preventDefault();

    addCardCallback(cardData);
    setCardData(NEW_CARD);
  };

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={submitCardData} className='newCardForm'>
      <section>
        <h2>CREATE A NEW CARD</h2>
        <div className='newCardFields'>
          <label htmlFor='Message'>Message</label>
          <input
          id='message'
          name='message'
          value={cardData.message}
          onChange={handleChange}
          />

          <p>Preview: {cardData.message}</p>

          <button className='button newCardSubmit' type='submit'>
            Submit
          </button>
        </div>
      </section>
    </form>
  );
};

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
};

export default NewCardForm;
