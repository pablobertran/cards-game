import * as actionTypes from './actionTypes';
import axios from '../../axios-decks';

export const onStartMatchInit = () => {
    return {
        type: actionTypes.START_MATCH,
        loading: true
    }
}

export const onStartMatch = () => {
    return dispatch => {
        dispatch(onStartMatchInit());
        dispatch(onStartMatchSuccess());
    }
}

export const onStartMatchSuccess = () => {
    return {
        type: actionTypes.START_MATCH_SUCCESS,
        loading: false,
        currentPlayer: 0,
        nextPlayer: 1
    };
}

export const onStartMatchFailed = (error) => {
    return {
        type: actionTypes.START_MATCH_FAILED,
        loading: false
    }
}

export const onDiscardRoundStart = () => {
    return {
        type: actionTypes.DISCARD_ROUND_START,
        loading: true
    }
}

export const onDiscardRound = (cards, deck, players) => {
    return dispatch => {
        dispatch(onDiscardRoundStart());
        axios.get('deck/' + deck + '/pile/playing/draw/?count=' + cards.length )
            .then( res => {
                const serializedHand = cards.map((card) => card.code).join(',');
                axios.get('deck/' + deck + '/pile/discard/add/?cards=' + serializedHand )
                    .then(response => {
                        const gameEnded = Object.values(players).splice(0,1)[0].cards.length === 0;
                        dispatch(onDiscardRoundSuccess(cards, players, gameEnded));
                    })
                    .catch(error => {
                        dispatch(onDiscardRoundFailed(error));
                    });
            })
            .catch( error => {
                dispatch(onDiscardRoundFailed(error));
            })
    }
}

export const onDiscardRoundSuccess = (cards, players, gameEnded) => {
    return {
        type: actionTypes.DISCARD_ROUND_SUCCESS,
        discarded: cards,
        loading: false,
        players: players,
        gameEnded: gameEnded
    }
}

export const onDiscardRoundFailed = (error) => {
    return {
        type: actionTypes.DISCARD_ROUND_FAILED,
        error: error,
        loading: false
    }
}

export const onPlayCardStart = () => {
    return {
        type: actionTypes.PLAY_CARD_START,
        loading: true
    }
}

export const onPlayCard = (card, player, deck, players) => {
    return dispatch => {
        const playersArray = Object.values(players);
        const newPlayers = {
            currentPlayer: (player.key + 1 > playersArray.length - 1) ? null : player.key + 1,
            nextPlayer: (player.key + 2 > playersArray.length - 1) ? null : player.key + 2
        };
        const roundEnded = newPlayers.currentPlayer === null && newPlayers.nextPlayer === null;
        dispatch( onPlayCardStart() );
        axios.get( 'deck/' + deck + '/pile/' + player.name + '/draw/?cards=' + card.code )
            .then( res => {
                axios.get( 'deck/' + deck + '/pile/playing/add/?cards=' + card.code )
                    .then( response => {
                        const playerCard = {...card};
                        playerCard.player = {key: player.key, name: player.name};
                        dispatch( onPlayCardSuccess(playerCard, player, newPlayers, roundEnded) );
                    })
                    .catch( error => {
                        dispatch( onPlayCardFailed(error) );
                    });
            })
            .catch( error => {
                dispatch( onPlayCardFailed(error) );
            })
    }
}

export const onPlayCardFailed = (error) => {
    return {
        type: actionTypes.PLAY_CARD_FAILED,
        error: error,
        loading: false
    }
}

export const onPlayCardSuccess = (card, player, players, roundEnded) => {
    return {
        type: actionTypes.PLAY_CARD_SUCCESS,
        card: card,
        player: player,
        players: players,
        roundEnded: roundEnded,
        loading: false
    }
}

export const newMatch = () => {
    return {
        type: actionTypes.NEW_MATCH,
        currentPlayer: null,
        nextPlayer: null,
        cardsOnBoard: [],
        discarded: [],
        roundEnded: false,
        gameEnded: false,
        loading: false,
        error: null
    }
}