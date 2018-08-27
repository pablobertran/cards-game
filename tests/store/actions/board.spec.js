import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../../src/store/actions/board';
import * as actionTypes from '../../../src/store/actions/actionTypes';
import axiosConfig from '../../../src/axios-decks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Board Actions', () => {
  beforeEach(() => {
    moxios.install(axiosConfig);
  });

  afterEach(() => {
    moxios.uninstall(axiosConfig);
  });

  it('should handle discard round', async (done) => {
    moxios.stubRequest(/deck\/11\/pile\/playing\/draw.*/, {
      status: 200,
      response: {}
    });

    moxios.stubRequest(/deck\/11\/pile\/discard\/add\/.*/, {
      status: 200,
      response: {}
    });

    const expectedActions = [
      {
        type: actionTypes.DISCARD_ROUND_START,
        loading: true
      },
      {
        type: actionTypes.DISCARD_ROUND_SUCCESS,
        discarded: [{
          code: 202,
          id: 1
        }],
        loading: false,
        players: {
          player1: {
            name: 'player1',
            cards: []
          }
        },
        gameEnded: true
      }
    ];

    const store = mockStore({});

    await store.dispatch(actions.onDiscardRound([{
      id: 1,
      code: 202
    }], 11, {
      player1: {
        name: 'player1',
        cards: []
      }
    }));

    expect(store.getActions())
      .toEqual(expectedActions);
    done();
  });

  it('should handle discard round failed', () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: actionTypes.DISCARD_ROUND_FAILED,
        error: 'error',
        loading: false
      }
    ];
    store.dispatch(actions.onDiscardRoundFailed('error'));

    expect(store.getActions())
      .toEqual(expectedActions);
  });
});
