import {useContext} from 'react';
import CardContext from './CardContext.js';

const useCards = () => {
    return useContext(CardContext);
}

export default useCards;