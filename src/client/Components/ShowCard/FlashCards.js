import axios from 'axios';
import React, { useState } from 'react';
import styles from './flashCard.module.css';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { json, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useCards from '../Context/useCards';

const FlashCard = () => {
  const { id } = useParams();
  const [cardData, setCardData] = useState({});
  const [nextCard, setnextCard] = useState({});
  const [showFront, setShowFront] = useState(true);
  const navigate = useNavigate();

  const { cards, setCards } = useCards();
  const shuffledCards = [...cards].sort((a,b) => 0.5 - Math.random());
  const numCards = shuffledCards.length;
  const [currentCard, setCurrentCard] = useState(shuffledCards.pop());
  const [deck, setDeck] = useState(shuffledCards);
  const [completedCards, setCompletedCards] = useState([]);
  const [studyComplete, setStudyComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const getNextCard = (isCorrect) => {
    const newCompletedCards = [...completedCards];
    const newCurrentCard = {...currentCard};
    const newDeck = [...deck];
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
      newCurrentCard.correct_count++;
    } else newCurrentCard.incorrect_count++;
    newCompletedCards.push(newCurrentCard);
    setCompletedCards(newCompletedCards);
    (newDeck.length) ? setCurrentCard(newDeck.pop()) : setStudyComplete(true);
    setDeck(newDeck);
  }

  const backHome = () => {
    navigate('/library');
  }

  return (
    studyComplete ?
    <div>
      <h3>{`Congrats! You have completed the current study session! ${correctCount} / ${numCards} correct.`}</h3>
      <button onClick={() => backHome()}>Home</button>
    </div> :
    <>
      <div className='container d-flex justify-content-center text-center'>
        <div className='col'>
          <div id='card-title-wrapper' className={`${styles.containerbox}`}>
            <h1 className={`${styles.title}`}>
              {currentCard.title ?? ' No Title'}
            </h1>
          </div>

          <div
            id='card-frontCard'
            onClick={() => setShowFront(!showFront)}
            className={`${styles.containerbox2}`}
          >
            <p className={`${styles.paragraph}`}>
              {showFront ? `front: ${currentCard.card_front}` : `back: ${currentCard.card_back}`}
            </p>
          </div>

          <div className={styles.spaceBetween}>
            <button
              onClick={() => getNextCard(true)}
              className={`${styles.addCardBtn}`}
            >
              Correct!
            </button>
            <button
              onClick={() => getNextCard(false)}
              className={`${styles.addCardBtn}`}
            >
              Incorrect!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlashCard;

 // useEffect(() => {
  //   // we cannot use async/await in useEffect without wrapping in outer function
  //   const response = axios({
  //     method: 'get',
  //     withCredentials: true,
  //     url: `http://localhost:8080/api/cards/${id}`,
  //   }).then((res) => {
  //     // console.log('L24 FlashCards:', res.data, 'L24 FlashCards:');
  //     setCardData(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   // we cannot use async/await in useEffect without wrapping in outer function
  //   const response = axios({
  //     method: 'get',
  //     withCredentials: true,
  //     url: `http://localhost:8080/api/cards/nextCard/${id}`,
  //   }).then((res) => {
  //     console.log(res.data);
  //     console.log('checking for res.data', res.data);
  //     setnextCard(res.data);
  //   });
  // }, []);

  // const deleteCard = () => {
  //   const response = axios({
  //     method: 'delete',
  //     withCredentials: true,
  //     url: `http://localhost:8080/api/cards/${id}`,
  //   }).then((res) => {
  //     window.location.href = `/library`;
  //   });
  // };