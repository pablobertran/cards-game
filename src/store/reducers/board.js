import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentPlayer: null,
    nextPlayer: null,
    cardsOnBoard: [],
    discarded: [],
    loading: false,
    error: null
};

const deck = (state = initialState, action) => {
    switch(actionTypes){
        case actionTypes.START_MATCH:
                return {
                    ...state,
                    loading: true
                };
            break;
        case actionTypes.START_MATCH_SUCCESS:
            return {
                ...state,
                loading: false,
                currentPlayer: action.currentPlayer,
                nextPlayer: action.nextPlayer
            };
            break;
        case actionTypes.START_MATCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
            break;
        case actionTypes.DISCARD_ROUND_START:
            return {
                ...state,
                loading: true
            };
            break;
        case actionTypes.DISCARD_ROUND_SUCCESS:
            return {
                ...state,
                loading: false,
                cardsOnBoard: [],
                discarded: [...state.discarded, action.cards],
                nextPlayer: action.players.nextPlayer,
                currentPlayer: action.players.nextPlayer
            };
            break;
        case actionTypes.DISCARD_ROUND_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
            break;
        case actionTypes.PLAY_CARD_START:
            return {
                ...state,
                loading: true
            };
            break;
        case actionTypes.PLAY_CARD_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
            break;
        case actionTypes.PLAY_CARD_SUCCESS:
            return {
                ...state,
                loading: false,
                cardsOnBoard: [...state.cardsOnBoard, action.card],
                currentPlayer: action.players.currentPlayer,
                nextPlayer: action.players.nextPlayer
            };
            break;
        default:
            return state

    }

}

export default deck;