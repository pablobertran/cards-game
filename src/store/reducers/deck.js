import * as actionTypes from '../actions/actionTypes';

const initialState = {
    deckId: null,
    shuffled: false,
    remaining: 0,
    loading: false,
    gameSettings: null,
    gameStarted: false,
    players: null
};

const updatePlayers = (player, players, card) => {
    let newPlayers = Object.assign({}, players);
    newPlayers[player.name].cards = players[player.name].cards.filter( (value, key) => {
        return value.code != card.code;
    });
    return newPlayers;
};

const deck = (state = initialState, action) => {
    switch( action.type ){
        case actionTypes.NEW_DECK:
            return { ...state, deckId: action.deckId, shuffled: action.shuffled, remaining: action.remaining};
            break;
        case actionTypes.NEW_DECK_INIT:
            return {...state, loading: false};
            break;
        case actionTypes.NEW_DECK_START:
            return {...state, loading: true};
            break;
        case actionTypes.NEW_DECK_SUCCESS:
            return {...state, deckId: action.deckId, shuffled: action.shuffled, remaining: action.remaining, gameSettings: action.gameSettings};
            break;
        case actionTypes.PLAYER_DRAW_CARD_SUCCESS:
            return {...state}
            break;
        case actionTypes.PLAYER_DRAW_CARD_START:
            return {...state, loading: true};
            break;
        case actionTypes.CREATE_PLAYERS_START:
            return {...state, loading: true};
            break;
        case actionTypes.CREATE_PLAYERS_FAILED:
            return {...state, loading: false};
            break;
        case actionTypes.CREATE_PLAYERS_SUCCESS:
            let newPlayers = {...state.players};
            newPlayers[action.player.name] = action.player;
            return {...state, loading: false, players: newPlayers};
            break;
        case actionTypes.START_GAME_SUCCESS:
            return {...state, gameStarted: true};
            break;
        case actionTypes.PLAYED_CARD_START:
            return {...state, loading: true};
            break;
        case actionTypes.PLAYED_CARD_SUCCESS:
            return {...state, loading: false, players: updatePlayers(action.player, state.players, action.card) };
            break;
        case actionTypes.PLAYED_CARD_FAILED:
            return {...state, loading: false, error: action.error};
            break;
        default:
            return state;
    }
}

export default deck;