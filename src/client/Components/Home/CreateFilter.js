import React, {useState} from 'react';
import ReactDom from 'react-dom';
import styles from '../CreateCard/CreateCard.module.css';

export default function CreateFilter({isOpen, setIsOpen}) {
    const [tagName, setTagName] = useState('');
    if (!isOpen) return null
    return ReactDom.createPortal(
        <>
            <div id={styles.overlay} onClick={() => setIsOpen(false)} />
            <div id={styles.cardInputs}>
                <input
                id={styles.tagFront}
                onChange={(e) => setTagName(e.target.value)}
                placeholder='Enter Tag Name Here'
                ></input>
                <button id={styles.addCardBtn} onClick={'tbd'}>
                Add Tag
                </button>
            </div>
        </>,
    document.getElementById('portal'))
}
