import React from 'react';
import styles from './CreateCard.module.css';

export default function TagsDisplay({tags}){

    const tagsList = [];

    tags.forEach((tag, index) => {
        tagsList.push(<button className={styles.tag} key={`tag${index}`}>tag.title</button>)
    });

    return (
        <div id={styles.tagsDisplay}>
            {tagsList}
        </div>
    )
}