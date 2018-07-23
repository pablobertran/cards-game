import * as actionTypes from '../actions/actionTypes';

const initialState = {
    deckId: null,
    shuffled: false,
    remaining: 0,
    loading: false,
    gameSettings: null
};

const deck = (state = initialState, action) => {
    switch( action.type ){
        case actionTypes.NEW_DECK:
            return {
                ...state,
                deckId: action.deckId,
                shuffled: action.shuffled,
                remaining: action.remaining
            };
            break;
        case actionTypes.NEW_DECK_INIT:
            return {
                ...state,
                loading: false
            };
            break;
        case actionTypes.NEW_DECK_START:
            return {
                ...state,
                loading: true
            };
            break;
        case actionTypes.NEW_DECK_SUCCESS:
            return {
                ...state,
                deckId: action.deckId,
                shuffled: action.shuffled,
                remaining: action.remaining,
                gameSettings: action.gameSettings
            };
            break;
        default:
            return state;
    }
}

export default deck;