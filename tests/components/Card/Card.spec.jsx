import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../../src/components/Card/Card';

describe('Card Component', () => {
  let wrapper;
  const setup = (propOverrides) => {
    const props = {
      board: false,
      playCard: jest.fn(),
      card: {
        image: 'fakeImg',
        value: 'fakeValue'
      },
      ...propOverrides
    };

    return shallow(<Card {...props} />);
  };

  describe('rendering', () => {
    it('should always render a div', () => {
      wrapper = setup();
      const divs = wrapper.find('div');

      expect(divs.length)
        .toBeGreaterThan(0);
    });

    it('should always render an img inside div', () => {
      wrapper = setup({
        card: {
          image: 'fakeUrl',
          value: 'fakeValue'
        }
      });
      const img = wrapper.find('img');

      expect(img)
        .toHaveLength(1);
      expect(img.props().src)
        .toEqual('fakeUrl');
      expect(img.props().alt)
        .toEqual('fakeValue');
    });
  });

  describe('interactions', () => {
    describe('when user clicks on div', () => {
      it('should call playCard function if board is not defined or false', () => {
        const mockPlayCardFunc = jest.fn();
        wrapper = setup({
          board: false,
          playCard: mockPlayCardFunc,
          card: {
            image: 'fakeUrl',
            value: 'fakeValue'
          }
        });
        const div = wrapper.find('div');
        div.simulate('click');

        expect(mockPlayCardFunc)
          .toHaveBeenCalledTimes(1);
        expect(mockPlayCardFunc)
          .toHaveBeenCalledWith({
            image: 'fakeUrl',
            value: 'fakeValue'
          });
      });
    });

    it('should not call playCard function if board is defined', () => {
      const mockPlayCardFunc = jest.fn();
      wrapper = setup({
        board: true,
        playCard: mockPlayCardFunc,
        card: {
          image: 'fakeUrl',
          value: 'fakeValue'
        }
      });
      const div = wrapper.find('div');
      div.simulate('click');

      expect(mockPlayCardFunc)
        .not.toHaveBeenCalled();
    });
  });
});
