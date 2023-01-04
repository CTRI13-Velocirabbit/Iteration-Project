import React from 'react';
import styles from './CreateCard.module.css';

export default function TagsDisplay({tags}){

    const tagsList = [];

    tags.forEach(tag => {
        tagsList.push(<button className={styles.tag}>tag.title</button>)
    });

    return (
        <div id={styles.tagsDisplay}>
            {tagsList}
        </div>
    )
}