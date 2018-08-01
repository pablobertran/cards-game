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
    newPlayers[player.name].cards = players[player.name].cards.filter( value => {
        return value.code !== card.code;
    });
    return newPlayers;
};

const deck = (state = initialState, action) => {
    switch( action.type ){
        case actionTypes.NEW_DECK:
            return { ...state, deckId: action.deckId, shuffled: action.shuffled, remaining: action.remaining};
        case actionTypes.NEW_DECK_INIT:
            return {...state, loading: false};
        case actionTypes.NEW_DECK_START:
            return {...state, loading: true};
        case actionTypes.NEW_DECK_SUCCESS:
            return {...state, deckId: action.deckId, shuffled: action.shuffled, remaining: action.remaining, gameSettings: action.gameSettings};
        case actionTypes.PLAYER_DRAW_CARD_SUCCESS:
            return {...state};
        case actionTypes.PLAYER_DRAW_CARD_START:
            return {...state, loading: true};
        case actionTypes.CREATE_PLAYERS_START:
            return {...state, loading: true};
        case actionTypes.CREATE_PLAYERS_FAILED:
            return {...state, loading: false};
        case actionTypes.CREATE_PLAYERS_SUCCESS:
            let newPlayers = {...state.players};
            newPlayers[action.player.name] = action.player;
            return {...state, loading: false, players: newPlayers};
        case actionTypes.START_GAME_SUCCESS:
            return {...state, gameStarted: true};
        case actionTypes.PLAYED_CARD_START:
            return {...state, loading: true};
        case actionTypes.PLAYED_CARD_SUCCESS:
            return {...state, loading: false, players: updatePlayers(action.player, state.players, action.card) };
        case actionTypes.PLAYED_CARD_FAILED:
            return {...state, loading: false, error: action.error};
        case actionTypes.ANOTHER_MATCH_SUCCESS:
            return { ...state, deckId: action.deckId, shuffled: action.shuffled, remaining: action.remaining, loading: action.loading, gameSettings: action.gameSettings, gameStarted: action.gameStarted, players: action.players};
        default:
            return state;
    }
}

export default deck;