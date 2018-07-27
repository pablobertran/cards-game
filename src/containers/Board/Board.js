import React, { Component } from 'react';
import classes from './Board.css';
import CardList from '../../components/CardList/CardList';
import * as actions from '../../store/actions/';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-decks';

class Board extends Component {

    render() {
        return (
            <div className={classes.Board}>
                <CardList playCard={null} cards={this.props.cardsOnBoard} board={true}></CardList>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cardsOnBoard: state.board.cardsOnBoard,
        nextPlayer: state.board.nextPlayer,
        currentPlayer: state.board.currentPlayer,
        players: state.deck.players
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Board, axios));