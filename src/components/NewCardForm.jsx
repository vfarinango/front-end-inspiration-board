import { useState } from "react";
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


export default NewCardForm;
