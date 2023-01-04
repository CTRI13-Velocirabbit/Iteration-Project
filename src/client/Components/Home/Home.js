import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { v4 as uuid } from 'uuid';
import styles from './home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import HomeFilter from './HomeFilter';
import CreateCard from '../CreateCard/CreateCard';
import CreateFilter from './CreateFilter';

const Home = () => {
  const [arrCards, setArrCards] = useState([]);
  const [createCardIsOpen, setCreateCardIsOpen] = useState(false);
  const [createFilterIsOpen, setCreateFilterIsOpen] = useState(false);

  const navigate = useNavigate();

  // Filter placeholders
  const filters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const initialFilterStates = filters.map(ele => false);
  // const filters = ['a', 'b', 'c']
  // const [filterState, setFilterState] = useState({a: false, b: false, c: false})
  
  // const [filterStates, setFilterStates] = useState(initialFilterStates);

  useEffect(() => {
    // we cannot use async/await in useEffect without wrapping in outer function
    const response = axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:8080/api/cards',
    }).then((res) => {
      setArrCards(res.data);
    });
  }, []);

  return (
    <>
      <HomeFilter filters={filters} openCreateFilter={setCreateFilterIsOpen} />
      <div id={styles.createNewCard}>
        <button className={styles.mainButton} onClick={() => navigate('/flashcard')}> 
          Start Studying
        </button>
        <div className={styles.secondSet}>
          <button className={styles.addButton} onClick={() => setCreateCardIsOpen(!createCardIsOpen)}> 
            Create New Card
          </button>
        </div>
      </div>
        <CreateCard isOpen={createCardIsOpen} setIsOpen={setCreateCardIsOpen} tags={filters}/>
        <CreateFilter isOpen={createFilterIsOpen} setIsOpen={setCreateFilterIsOpen} />
      <div id={styles.cardsContainer}>
        {arrCards.map((card) => (
          <Card data={card} key={uuid()} />
        ))}
      </div>
    </>
  );
};

export default Home;
