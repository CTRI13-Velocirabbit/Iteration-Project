import React, { useState } from 'react';
import ReactDom from 'react-dom';
import styles from '../CreateCard/CreateCard.module.css';

export default function CreateTag({ isOpen, setIsOpen, tags }) {
  const [tagName, setTagName] = useState('');

  const saveTag = () => {
    fetch('http://localhost:8080/api/tags', {
      method: 'POST',
      body: JSON.stringify({ user_id: 6, tag_name: tagName }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div id={styles.overlay} onClick={() => setIsOpen(false)} />
      <div id={styles.cardInputs}>
        <input
          id={styles.tagFront}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Enter Tag Name Here"
        ></input>
        <button id={styles.addCardBtn} onClick={saveTag}>
          Add Tag
        </button>
      </div>
    </>,
    document.getElementById('portal')
  );
}
