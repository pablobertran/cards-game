import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import {startNewGame} from "../../store/actions/deck";
import axios from '../../axios-decks';

class ScoreBoard extends Component {

    state = {
        show: true
    };

    sortPlayers = () => {
        const playersArray = Object.values(this.props.players);
        return playersArray.sort( (a,b) => {
            return b.score - a.score;
        });
    };

    closeModalHandle = () => {
        this.setState({
            show: false
        });
    };

    playAgainHandler = () => {
        this.props.onAnotherMatch( this.props.gameSettings );
        this.props.onStartNewGame( this.props.gameSettings );
        this.closeModalHandle();
    };

    endGameHandler = () => {
        this.props.onAnotherMatch( this.props.gameSettings );
        this.closeModalHandle();
    };

    getPlayersList = (players) => {
        return players.map( player => {
            return <li key={player.key}><strong>{player.name}</strong> - {player.score}</li>;
        });
    };

    render() {

        const sortedPlayers = this.sortPlayers();
        const scoreChart = this.getPlayersList(sortedPlayers);
        const higherScore = Math.max.apply(Math, sortedPlayers.map( o => o.score ));
        const winners = this.getPlayersList( sortedPlayers.filter( player => {
            return player.score === higherScore;
        }) );
        return (
            <Aux>
                <Modal show={this.state.show} modalClosed={this.endGameHandler}>
                    <h2>Winners</h2>
                    <ul>
                        { winners }
                    </ul>
                    <h4>Final score board</h4>
                    <ul>
                        { scoreChart }
                    </ul>

                    <Button disabled={false}
                    btnType="Success"
                    clicked={this.playAgainHandler}>Play Again</Button>

                    <Button disabled={false}
                            btnType="Danger"
                            clicked={this.endGameHandler}>End Game</Button>
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        gameSettings: state.deck.gameSettings,
        players: state.deck.players
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAnotherMatch: (gameSettings) => dispatch( actions.anotherMatch( gameSettings ) ),
        onStartNewGame: (gameSettings) => dispatch( startNewGame( gameSettings ) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(ScoreBoard, axios) );