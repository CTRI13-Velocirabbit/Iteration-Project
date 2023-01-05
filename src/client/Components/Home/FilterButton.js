import React from 'react';
import styles from './home.module.css';

export default function FilterButton({ index, filterStates, setFilterStates, name }) {
  const changeState = () => {
    const newState = [...filterStates];
    newState[index] = !newState[index];
    setFilterStates(newState);
  };

  return (
    <button
      className={
        filterStates[index] ? styles.filterButtonActive : styles.filterButton
      }
      onClick={changeState}
    >{name}</button>
  );
}
