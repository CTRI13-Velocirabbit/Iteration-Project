import React from 'react';
import styles from './home.module.css';

export default function FilterButton({index}) {
    return (
        <button className={styles.filterButton} >{`Filter ${index}`}</button>
    )
}