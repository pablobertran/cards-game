import * as actionTypes from './actionTypes';
import axios from '../../axios-decks';

export const onStartMatchInit = () => {
    return {
        type: actionTypes.START_MATCH,
        loading: true
    }
}

export const onStartMatch = (players) => {
    return dispatch => {
        dispatch(onStartMatchInit());
        dispatch(onStartMatchSuccess(players));
    }
}

export const onStartMatchSuccess = (players) => {
    return {
        type: actionTypes.START_MATCH_SUCCESS,
        loading: false,
        currentPlayer: players.current,
        nextPlayer: players.next
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
        axios.get('deck/' + deck + '/pile/playing/draw/?count=' + players )
            .then( res => {
                const serializedHand = cards.map((card) => card.code).join(',');
                axios.get('deck/' + deck + '/pile/discard/add/?cards=' + serializedHand )
                    .then(response => {
                        dispatch(onDiscardRoundSuccess(cards, players));
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

export const onDiscardRoundSuccess = (cards, players) => {
    return {
        type: actionTypes.DISCARD_ROUND_SUCCESS,
        discarded: cards,
        loading: false,
        players: players
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
        const newPlayers = {
            currentPlayer: (player.id + 1 > players.length) ? 0 : player.id + 1,
            nextPlayer: (player.id + 2 > players.length) ? 0 : player.id + 2
        }
        dispatch( onPlayCardStart() );
        axios.get( 'deck/' + deck + '/pile/' + player.name + '/draw/?cards=' + card.code )
            .then( res => {
                axios.get( 'deck/' + deck + '/pile/playing/add/?cards=' + card.code )
                    .then( response => {
                        dispatch( onPlayCardSuccess(card, player, players) );
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

export const onPlayCardSuccess = (card, player, players) => {
    return {
        type: actionTypes.PLAY_CARD_SUCCESS,
        card: card,
        player: player,
        players: players,
        loading: false
    }
}