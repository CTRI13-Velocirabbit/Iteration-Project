import React from 'react';
import styles from './home.module.css';
import FilterButton from './FilterButton.js';
import FilterPlus from './FilterPlusButton';

export default function HomeFilter({ filters, filterStates, openCreateFilter }) {

    const buttons = [];
    filters.forEach(
       (e, index) => {
            buttons.push(
                <FilterButton key={`Filter${index}`} index={index} />
            )
        }
    )
    buttons.push(<FilterPlus key={'Filter plus'} openCreateFilter={openCreateFilter}/>)

    return (
        <div className={styles.filterDisplay}>
            <h2 className={styles.filterTitle}>Filters</h2>
            <div className={styles.filterDisplaySub}>
                {buttons}
            </div>
        </div>
    )
}