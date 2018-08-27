import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import Board from '../../../src/containers/Board/Board';
import * as actions from '../../../src/store/actions';

jest.mock('../../../src/store/actions');

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Board Container', () => {
  let wrapper;
  let store;
  const mockStoreData = {
    board: {
      roundEnded: false,
      cardsOnBoard: {},
      currentPlayer: { id: 1 },
      gameEnded: true
    },
    deck: {
      players: { player1: { name: 'player1' } },
      deckId: 11
    }
  };

  beforeEach(() => {
    store = mockStore(mockStoreData);
    store.dispatch = jest.fn();
    const context = { store };
    wrapper = shallow(<Board />, { context });
  });

  it('should render the container', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should maps state and dispatch to props', () => {
    expect(wrapper.props()).toEqual(expect.objectContaining({
      roundEnded: false,
      cardsOnBoard: {},
      currentPlayer: { id: 1 },
      playersQty: 1,
      players: { player1: { name: 'player1' } },
      deck: 11,
      gameEnded: true
    }));
  });

  it('should call onDiscardRound action when onDiscardRound function is called', () => {
    wrapper.props().onDiscardRound([], 123, { player1: { name: 'player1' } });
    expect(store.dispatch).toHaveBeenCalled();
    expect(actions.onDiscardRound).toHaveBeenCalledWith([], 123, { player1: { name: 'player1' } });
  });
});
