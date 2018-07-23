import * as actionTypes from './actionTypes';
import axios from '../../axios-decks';

export const getNewDeckSuccess = ( deck, gameSettings ) => {
    return {
        type: actionTypes.NEW_DECK_SUCCESS,
        deckId: deck.id,
        shuffled: deck.shuffled,
        remaining: deck.remaining,
        gameSettings: gameSettings
    }
}

export const getNewDeckFailed = ( error ) => {
    return {
        type: actionTypes.NEW_DECK_FAILED,
        error: error
    }
}

export const getNewDeck = (gameSettings) => {
    return dispatch => {
        dispatch( getNewDeckStart() );
        axios.get( 'deck/new/shuffle/?deck_count=1' )
            .then( response => {
                console.log(response.data);
                dispatch(getNewDeckSuccess( response.data, gameSettings ))
                //this.props.history.push( '/' );
            } )
            .catch( error => {
                dispatch(getNewDeckFailed( error ))
            } );
    }

};

export const getNewDeckInit = () => {
    return {
        type: actionTypes.NEW_DECK_INIT
    }
}

export const getNewDeckStart = () => {
    return {
        type: actionTypes.NEW_DECK_START
    }
}