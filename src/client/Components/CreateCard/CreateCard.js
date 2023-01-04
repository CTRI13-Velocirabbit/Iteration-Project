import styles from './CreateCard.module.css';
// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDom from 'react-dom';
import TagsDisplay from './TagsDisplay';

const CreateCard = ({isOpen, setIsOpen, tags}) => {
  const [front, setFront] = useState('');
  const [back, setback] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  function cb() {
    fetch('http://localhost:8080/api/cards', {
      method: 'POST',
      //TODO: user_id
      body: JSON.stringify({ front, user_id: 1, back, title }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => navigate('/library'));
  }
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div id={styles.overlay} onClick={() => setIsOpen(false)} />
      <div id={styles.cardInputs}>
        <input
          id={styles.cardTitle}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter Card Title Here'
        ></input>
        <input
          id={styles.cardFront}
          onChange={(e) => setFront(e.target.value)}
          placeholder='Enter Question Here'
        ></input>
        <input
          id={styles.cardBack}
          onChange={(e) => setback(e.target.value)}
          placeholder='Enter Answer Here'
        ></input>
        <TagsDisplay tags={tags}/>
        <button id={styles.addCardBtn} onClick={cb}>
          Add Card <span>&#43;</span>
        </button>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default CreateCard;
