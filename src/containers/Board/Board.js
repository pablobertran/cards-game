import React, { Component } from 'react';
import classes from './Board.css';
import CardList from '../../components/CardList/CardList';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import * as actions from '../../store/actions/';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-decks';

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
    }

    discardBoard(players, cards){
        this.props.onDiscardRound(cards, this.props.deck, players);
    }

    setScores(cards){
        const newPlayers = { ...this.props.players };
        newPlayers[cards[0].player.name].score = newPlayers[cards[0].player.name].score + this.state.roundPoints;
        this.discardBoard(newPlayers, cards);
    }

    calcRound(cards){
        return cards.sort( (a,b) => {
            return this.state.cardValues.indexOf(b.value) - this.state.cardValues.indexOf(a.value);
        });
    }

    componentWillReceiveProps(newProps){
        if(newProps.gameEnded && newProps.gameEnded !== this.props.gameEnded){

        } else if(newProps.currentPlayer === null
            && newProps.roundEnded
            && newProps.roundEnded !== this.props.roundEnded){
            setTimeout( () => {
                this.setScores( this.calcRound(newProps.cardsOnBoard) );
            }, 500);
        }
    }

    render() {
        const scoreBoard = this.props.gameEnded ? <ScoreBoard></ScoreBoard> : null;
        return (
            <Auxiliar>
                { scoreBoard }
                <div className={classes.Board}>
                    <CardList playCard={null} cards={this.props.cardsOnBoard} board={true}></CardList>
                </div>
            </Auxiliar>
        );
    }
}

const mapStateToProps = state => {
    return {
        roundEnded: state.board.roundEnded,
        cardsOnBoard: state.board.cardsOnBoard,
        currentPlayer: state.board.currentPlayer,
        playersQty: (state.deck.players) ? Object.values(state.deck.players).length : null,
        players: state.deck.players,
        deck: state.deck.deckId,
        gameEnded: state.board.gameEnded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDiscardRound: (cards, deck, players) => dispatch( actions.onDiscardRound(cards, deck, players) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Board, axios));