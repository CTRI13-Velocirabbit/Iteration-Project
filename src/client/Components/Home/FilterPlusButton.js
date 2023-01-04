import React from 'react';
import styles from './home.module.css';

export default function FilterPlus({openCreateFilter}) {
    return (
        <button className={styles.filterButton} onClick={() => openCreateFilter(true)}>+</button>
    )
}