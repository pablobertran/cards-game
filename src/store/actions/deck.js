import * as actionTypes from './actionTypes';
import axios from '../../axios-decks';
import * as boardActions from './board';

export const getNewDeckSuccess = (deck, gameSettings) => {
    return {
        type: actionTypes.NEW_DECK_SUCCESS,
        deckId: deck.deck_id,
        shuffled: deck.shuffled,
        remaining: deck.remaining,
        gameSettings: gameSettings
    }
};

export const startNewGame = (gameSettings) => {
    return dispatch => {
        dispatch(getNewDeck(gameSettings));
    }
};

export const getNewDeckFailed = (error) => {
    return {
        type: actionTypes.NEW_DECK_FAILED,
        error: error
    }
};

export const getNewDeck = (gameSettings) => {
    return dispatch => {
        dispatch(getNewDeckStart());
        axios.get('deck/new/shuffle/?deck_count=1')
            .then(response => {
                dispatch( getNewDeckSuccess(response.data, gameSettings));
                dispatch(createPlayers(response.data, setPlayersArray(gameSettings)));
            })
            .catch(error => {
                dispatch(getNewDeckFailed(error))
            });
    }

};

export const getNewDeckInit = () => {
    return {
        type: actionTypes.NEW_DECK_INIT,
        deckId: null,
        shuffled: false,
        remaining: 0,
        gameSettings: null,
        players: null
    }
};

export const getNewDeckStart = () => {
    return {
        type: actionTypes.NEW_DECK_START
    }
};

export const createPlayersStart = () => {
    return {
        type: actionTypes.CREATE_PLAYERS_START
    }
};

export const createPlayerSuccess = (player, deck) => {
    return {
        type: actionTypes.CREATE_PLAYERS_SUCCESS,
        deckId: deck.deck_id,
        shuffled: deck.shuffled,
        remaining: deck.remaining,
        player: player
    }
};

export const createPlayersFailed = (error) => {
    return {
        type: actionTypes.CREATE_PLAYERS_FAILED,
        error: error
    }
};

export const createPlayers = (deck, players) => {
    return dispatch => {
        dispatch(createPlayersStart());
        players.map( (player, index) => {
            drawAHand(deck.deck_id)
                .then(hand => {
                    const serializedHand = hand.data.cards.map((card) => card.code).join(',');
                    axios.get('deck/' + deck.deck_id + '/pile/' + player.name + '/add/?cards=' + serializedHand)
                        .then(res => {
                            dispatch( createPlayerSuccess({cards: hand.data.cards, name: player.name, human: player.human, score: 0, key: player.key}, deck) );
                            if(index + 1 === players.length)
                                dispatch( gameStartSuccess() ) && dispatch( boardActions.onStartMatch());
                        })
                        .catch(error => {
                            dispatch(createPlayersFailed(error));
                        });
                })
                .catch(error => {
                    dispatch(createPlayersFailed(error));
                });
            return player;
        });
    }
};

export const gameStartSuccess = () => {
    return {
        type: actionTypes.START_GAME_SUCCESS,
        loading: false
    }
};

export const onCardPlayed = (card,player) => {
    return dispatch => {
        dispatch( cardPlayedStart());
        dispatch( cardPlayedSuccess(player, card) );
    }
};

export const cardPlayedStart = () => {
    return {
        type: actionTypes.PLAYED_CARD_START,
        loading: true
    }
};

export const cardPlayedFailed = (error) => {
    return {
        type: actionTypes.PLAYED_CARD_FAILED,
        error: error
    }
};

export const cardPlayedSuccess = (player, card) => {
    return {
        type: actionTypes.PLAYED_CARD_SUCCESS,
        player: player,
        card: card,
        loading: false
    }
};

export const anotherMatchStart = () => {
    return {
        type: actionTypes.ANOTHER_MATCH_START,
        loading: true
    }
};

export const anotherMatch = (gameSettings) => {
    return dispatch => {
        dispatch( anotherMatchStart() );
        dispatch( boardActions.newMatch() );
        dispatch( anotherMatchSuccess() );
    }
};

export const anotherMatchSuccess = () => {
    return {
        type: actionTypes.ANOTHER_MATCH_SUCCESS,
        deckId: null,
        shuffled: false,
        remaining: 0,
        loading: false,
        gameSettings: null,
        gameStarted: false,
        players: null
    }
};

const drawAHand = (deckId) => {
    return axios.get('deck/' + deckId + '/draw/?count=10')
};

const setPlayersArray = (gameSettings) => {
    const players = [];
    const name = gameSettings.name.replace(/\s/g, '');
    players.push({key: 0, name: name, score: 0, cards: [], human: true});
    for (let i = 0; i < gameSettings.playersQty; i++) {
        players.push({key: i+1  ,name: 'Player' + i, score: 0, cards: [], human: false});
    }
    return players;
};