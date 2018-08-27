import deckReducer from '../../../src/store/reducers/deck';
import * as actionTypes from '../../../src/store/actions/actionTypes';

it('should return the initial state', () => {
  expect(deckReducer())
    .toEqual({
      deckId: null,
      shuffled: false,
      remaining: 0,
      loading: false,
      gameSettings: null,
      gameStarted: false,
      players: null
    });
});

describe('Create New Deck', () => {
  it('should create new deck', () => {
    const stateBefore = {
      ...deckReducer()
    };
    const action = {
      type: actionTypes.NEW_DECK,
      deckId: 1,
      shuffled: 'fakeShuffled',
      remaining: 2
    };
    const stateAfter = {
      ...deckReducer(),
      deckId: 1,
      shuffled: 'fakeShuffled',
      remaining: 2
    };

    expect(deckReducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('New Deck Init', () => {
  it('should set loading to false', () => {
    const stateBefore = {
      ...deckReducer(),
      loading: true
    };
    const action = {
      type: actionTypes.NEW_DECK_INIT
    };
    const stateAfter = {
      ...deckReducer(),
      loading: false
    };

    expect(deckReducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('New Deck Start', () => {
  it('should set loading to true', () => {
    const stateBefore = {
      ...deckReducer(),
      loading: false
    };
    const action = {
      type: actionTypes.NEW_DECK_START
    };
    const stateAfter = {
      ...deckReducer(),
      loading: true
    };

    expect(deckReducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('New Deck Success', () => {
  it('should set new deck', () => {
    const stateBefore = {
      ...deckReducer(),
      loading: false
    };
    const action = {
      type: actionTypes.NEW_DECK_SUCCESS,
      deckId: 11,
      shuffled: true,
      remaining: 1,
      gameSettings: 'fakeGameSettings'
    };
    const stateAfter = {
      ...deckReducer(),
      deckId: 11,
      shuffled: true,
      remaining: 1,
      gameSettings: 'fakeGameSettings'
    };

    expect(deckReducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('Create Players Success', () => {
  it('should add player to players state', () => {
    const stateBefore = {
      ...deckReducer()
    };
    const action = {
      type: actionTypes.CREATE_PLAYERS_SUCCESS,
      player: {
        name: 'fakeName'
      }
    };
    const stateAfter = {
      ...deckReducer(),
      players: {
        fakeName: { name: 'fakeName' }
      }
    };

    expect(deckReducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});

describe('Played Card Success', () => {
  it('should filter action card from player', () => {
    const stateBefore = {
      ...deckReducer(),
      players: {
        fakeName: {
          cards: [{ code: 123 }]
        }
      }
    };
    const action = {
      type: actionTypes.PLAYED_CARD_SUCCESS,
      player: {
        name: 'fakeName'
      },
      card: {
        code: 123
      }
    };
    const stateAfter = {
      ...deckReducer(),
      players: {
        fakeName: {
          cards: []
        }
      }
    };

    expect(deckReducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
