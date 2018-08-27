import * as actionTypes from './actionTypes';
import axios from '../../axios-decks';

export const onStartMatchInit = () => ({
  type: actionTypes.START_MATCH,
  loading: true
});

export const onStartMatchSuccess = () => ({
  type: actionTypes.START_MATCH_SUCCESS,
  loading: false,
  currentPlayer: 0,
  nextPlayer: 1
});

export const onStartMatch = () => (dispatch) => {
  dispatch(onStartMatchInit());
  dispatch(onStartMatchSuccess());
};

export const onStartMatchFailed = () => ({
  type: actionTypes.START_MATCH_FAILED,
  loading: false
});

export const onDiscardRoundStart = () => ({
  type: actionTypes.DISCARD_ROUND_START,
  loading: true
});

export const onDiscardRoundSuccess = (cards, players, gameEnded) => ({
  type: actionTypes.DISCARD_ROUND_SUCCESS,
  discarded: cards,
  loading: false,
  players,
  gameEnded
});

export const onDiscardRoundFailed = error => ({
  type: actionTypes.DISCARD_ROUND_FAILED,
  error,
  loading: false
});

export const onDiscardRound = (cards, deck, players) => (dispatch) => {
  dispatch(onDiscardRoundStart());
  return axios.get(`deck/${deck}/pile/playing/draw/?count=${cards.length}`)
    .then(() => {
      const serializedHand = cards.map(card => card.code)
        .join(',');
      return axios.get(`deck/${deck}/pile/discard/add/?cards=${serializedHand}`)
        .then(() => {
          const gameEnded = Object.values(players)
            .splice(0, 1)[0].cards.length === 0;
          dispatch(onDiscardRoundSuccess(cards, players, gameEnded));
        })
        .catch((error) => {
          dispatch(onDiscardRoundFailed(error));
        });
    })
    .catch((error) => {
      dispatch(onDiscardRoundFailed(error));
    });
};

export const onPlayCardStart = () => ({
  type: actionTypes.PLAY_CARD_START,
  loading: true
});

export const onPlayCardFailed = error => ({
  type: actionTypes.PLAY_CARD_FAILED,
  error,
  loading: false
});

export const onPlayCardSuccess = (card, player, players, roundEnded) => ({
  type: actionTypes.PLAY_CARD_SUCCESS,
  card,
  player,
  players,
  roundEnded,
  loading: false
});

export const onPlayCard = (card, player, deck, players) => (dispatch) => {
  const playersArray = Object.values(players);
  const newPlayers = {
    currentPlayer: (player.key + 1 > playersArray.length - 1) ? null : player.key + 1,
    nextPlayer: (player.key + 2 > playersArray.length - 1) ? null : player.key + 2
  };
  const roundEnded = newPlayers.currentPlayer === null && newPlayers.nextPlayer === null;
  dispatch(onPlayCardStart());
  axios.get(`deck/${deck}/pile/${player.name}/draw/?cards=${card.code}`)
    .then(() => {
      axios.get(`deck/${deck}/pile/playing/add/?cards=${card.code}`)
        .then(() => {
          const playerCard = { ...card };
          playerCard.player = {
            key: player.key,
            name: player.name
          };
          dispatch(onPlayCardSuccess(playerCard, player, newPlayers, roundEnded));
        })
        .catch((error) => {
          dispatch(onPlayCardFailed(error));
        });
    })
    .catch((error) => {
      dispatch(onPlayCardFailed(error));
    });
};

export const newMatch = () => ({
  type: actionTypes.NEW_MATCH,
  currentPlayer: null,
  nextPlayer: null,
  cardsOnBoard: [],
  discarded: [],
  roundEnded: false,
  gameEnded: false,
  loading: false,
  error: null
});
