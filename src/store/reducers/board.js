import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentPlayer: null,
    nextPlayer: null,
    cardsOnBoard: [],
    discarded: [],
    roundEnded: false,
    gameEnded: false,
    loading: false,
    error: null
};

const deck = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.START_MATCH:
                return {
                    ...state,
                    loading: true
                };
        case actionTypes.START_MATCH_SUCCESS:
            return {
                ...state,
                loading: false,
                currentPlayer: action.currentPlayer,
                nextPlayer: action.nextPlayer
            };
        case actionTypes.START_MATCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.DISCARD_ROUND_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.DISCARD_ROUND_SUCCESS:
            return {
                ...state,
                loading: false,
                cardsOnBoard: [],
                discarded: [...state.discarded, action.cards],
                nextPlayer: action.gameEnded ? null : 1,
                currentPlayer: action.gameEnded ? null : 0,
                gameEnded: action.gameEnded
            };
        case actionTypes.DISCARD_ROUND_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.PLAY_CARD_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PLAY_CARD_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.PLAY_CARD_SUCCESS:
            return {
                ...state,
                loading: false,
                cardsOnBoard: [...state.cardsOnBoard, action.card],
                currentPlayer: action.players.currentPlayer,
                nextPlayer: action.players.nextPlayer,
                roundEnded: action.roundEnded
            };
        case actionTypes.NEW_MATCH:
            return {
                ...state,
                currentPlayer: action.currentPlayer,
                nextPlayer: action.nextPlayer,
                cardsOnBoard: action.cardsOnBoard,
                discarded: action.discarded,
                roundEnded: action.roundEnded,
                gameEnded: action.gameEnded,
                loading: action.loading,
                error: action.error
            }
        default:
            return state

    }

}

export default deck;