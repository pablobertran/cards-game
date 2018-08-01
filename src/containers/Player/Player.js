import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import Hand from '../Hand/Hand';
import classes from './Player.css';
import * as actions from '../../store/actions/';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-decks';


class Player extends Component {

    playCardHandler = (card) =>{
        this.props.onPlayCard(card, this.props.player, this.props.deck, this.props.players);
        this.props.onCardPlayed(card, this.props.player, this.props.deck);
    }

    render() {
        let player = (
            <Aux>
                <h4>No game in course.</h4>
                <Button disabled={false} btnType="Error" clicked={this.props.showSettings}>Start Game</Button>
            </Aux>
        );
        if (this.props.gameStarted) {
            player = (
                <Aux>
                    <div className={classes.Score}>Score: <span>{this.props.player.score}</span></div>
                    <Hand disabled={this.props.currentPlayer !== this.props.player.key} cards={this.props.player.cards} playCard={this.playCardHandler}></Hand>
                </Aux>
            );
        }
        return (
            <div className={classes.Player}>
                {player}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        deck: state.deck.deckId,
        players: state.deck.players,
        currentPlayer: state.board.currentPlayer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPlayCard: (card, player, deck, players) => dispatch( actions.onPlayCard(card, player, deck, players) ),
        onCardPlayed: (card, player, deck) => dispatch( actions.onCardPlayed(card, player, deck) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Player, axios));