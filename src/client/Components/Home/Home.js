import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { v4 as uuid } from 'uuid';
import styles from './home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import HomeFilter from './HomeFilter';
import CreateCard from '../CreateCard/CreateCard';
import CreateTag from './CreateTag';
import useCards from '../Context/useCards';

const Home = () => {
  const [arrCards, setArrCards] = useState([]);
  const [arrTags, setArrTags] = useState([]);
  const [createCardIsOpen, setCreateCardIsOpen] = useState(false);
  const [createFilterIsOpen, setCreateFilterIsOpen] = useState(false);
  const initialFilterStates = arrTags.map((ele) => false);
  const [filterStates, setFilterStates] = useState(initialFilterStates);
  const { cards, setCards } = useCards();
  const navigate = useNavigate();

  console.log(useCards());
  // const [filterStates, setFilterStates] = useState(initialFilterStates);

  useEffect(() => {
    // we cannot use async/await in useEffect without wrapping in outer function
    const response = axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:8080/api/cards',
    }).then((res) => {
      //console.log('L33 Home:', res.data);
      setArrCards(res.data.allCards);
      setArrTags(res.data.allTags);
    });
  }, []);

  useEffect(
    () => {
      setCards(arrCards);
      console.log(cards);
    });

  return (
    <>
      <HomeFilter
        filters={arrTags}
        openCreateFilter={setCreateFilterIsOpen}
        filterStates={filterStates}
        setFilterStates={setFilterStates}
      />
      <div id={styles.createNewCard}>
        <button
          className={styles.mainButton}
          onClick={() => navigate('/flashcard')}
        >
          Start Studying
        </button>
        <div className={styles.secondSet}>
          <button
            className={styles.addButton}
            onClick={() => setCreateCardIsOpen(!createCardIsOpen)}
          >
            Create New Card
          </button>
        </div>
      </div>
      <CreateCard
        isOpen={createCardIsOpen}
        setIsOpen={setCreateCardIsOpen}
        tags={arrTags}
        cards={[...arrCards]}
        setCards={setArrCards}
      />
      <CreateTag
        isOpen={createFilterIsOpen}
        setIsOpen={setCreateFilterIsOpen}
        tags={[...arrTags]}
        setTags={setArrTags}
      />
      <div>
        <h3>Index Cards</h3>
        <div id={styles.cardsContainer}>
          {arrCards.map((card) => (
            <Card data={card} key={uuid()} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
