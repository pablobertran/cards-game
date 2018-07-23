import * as actionTypes from './actionTypes';
import axios from '../../axios-decks';

export const giveCardInit = () => {
    return {
        type: actionTypes.GIVE_CARD_INIT
    }
};

export const giveCardStart = () => {
    return {
        type: actionTypes.GIVE_CARD_START
    }
};

export const giveCard = (cardData) => {
    return dispatch => {
        dispatch( giveCardStart() );
    };
    return {
        type: actionTypes.GIVE_CARD
    }
};