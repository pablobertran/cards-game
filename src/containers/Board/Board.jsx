import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardList from '../../components/CardList/CardList';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import * as actions from '../../store/actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-decks';
import classes from './Board.css';

class Board extends Component {
    state = {
      roundPoints: 10,
      cardValues: [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'JACK',
        'QUEEN',
        'KING',
        'ACE'
      ]
    };

    componentWillReceiveProps(newProps) {
      const { roundEnded } = this.props;
      if (newProps.currentPlayer === null
            && newProps.roundEnded
            && newProps.roundEnded !== roundEnded) {
        setTimeout(() => {
          this.setScores(this.calcRound(newProps.cardsOnBoard));
        }, 500);
      }
    }

    setScores(cards) {
      const { players } = this.props;
      const { roundPoints } = this.state;
      const newPlayers = { ...players };
      newPlayers[cards[0].player.name].score += roundPoints;
      this.discardBoard(newPlayers, cards);
    }

    discardBoard(players, cards) {
      const { onDiscardRound, deck } = this.props;
      onDiscardRound(cards, deck, players);
    }

    calcRound(cards) {
      const { cardValues } = this.state;
      return cards.sort((a, b) => cardValues.indexOf(b.value) - cardValues.indexOf(a.value));
    }

    render() {
      const { gameEnded, cardsOnBoard } = this.props;
      const scoreBoard = gameEnded ? <ScoreBoard /> : null;
      return (
        <Auxiliar>
          {scoreBoard}
          <div className={classes.Board}>
            <CardList playCard={null} cards={cardsOnBoard} board />
          </div>
        </Auxiliar>
      );
    }
}

Board.propTypes = {
  onDiscardRound: PropTypes.func.isRequired,
  deck: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  roundEnded: PropTypes.bool.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  cardsOnBoard: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  roundEnded: state.board.roundEnded,
  cardsOnBoard: state.board.cardsOnBoard,
  currentPlayer: state.board.currentPlayer,
  playersQty: (state.deck.players) ? Object.values(state.deck.players).length : null,
  players: state.deck.players,
  deck: state.deck.deckId,
  gameEnded: state.board.gameEnded
});

const mapDispatchToProps = dispatch => ({
  onDiscardRound: (cards, deck, players) => dispatch(actions.onDiscardRound(cards, deck, players))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Board, axios));
