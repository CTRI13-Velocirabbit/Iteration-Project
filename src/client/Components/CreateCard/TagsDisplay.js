import React, { useState, useEffect } from 'react';
import styles from './CreateCard.module.css';

export default function TagsDisplay({ tags }) {
  const initialTagStates = tags.map((tag) => false);
  const [tagStates, setTagStates] = useState(initialTagStates);

  const tagsList = [];
  tags.forEach((tag, index) => {
    tagsList.push(
      <button
        className={tagStates[index] ? styles.tagActive : styles.tag}
        key={`tag${index}`}
        onClick={() => changeState(index)}
      >
        {tags[index].tag_name}
      </button>
    );
  });

  const changeState = (index) => {
    const newState = [...tagStates];
    newState[index] = !newState[index];
    setTagStates(newState);
  };

  return <div id={styles.tagsDisplay}>{tagsList}</div>;
}
