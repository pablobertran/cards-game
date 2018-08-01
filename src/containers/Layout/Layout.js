import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Modal from '../../components/UI/Modal/Modal';
import GameSettings from '../../components/GameSettings/GameSettings';
import Player from '../Player/Player';
import OtherPlayer from '../../components/OtherPlayer/OtherPlayer';
import Board from '../Board/Board';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from '../../axios-decks';

class Layout extends Component {

    state = {
        displayGameConfig: true,
        playersCreated: false
    }

    toggleSettingsHandler = () => {
        this.setState((prevState) => {
            return { displayGameConfig: !prevState.displayGameConfig }
        });
    }

    startGame = (gameSettings) => {
        this.props.onStartGame(gameSettings);
        this.toggleSettingsHandler();
    }

    render() {
        let gameBoard = (
            <Aux>
                <Board></Board>
                <Player showSettings={this.toggleSettingsHandler} gameStarted={this.props.gameStarted} cards={null}></Player>
            </Aux>
        );

        if(this.props.gameStarted){
            const playersCollection = Object.values(this.props.players);
            const players = playersCollection.map( (player, index) => !player.human ? <OtherPlayer player={player} key={index} currentPlayer={this.props.currentPlayer} /> : <Player key={index} gameStarted={this.props.gameStarted} showSettings={null} player={player} />);
            gameBoard = (
                <Aux>
                    {players}
                    <Board></Board>
                </Aux>
            )
        }

        const spinner = this.props.loading ? <Spinner></Spinner> : null;

        return(
            <Aux>
                <main className={classes.Layout}>
                    {spinner}
                    <Modal show={this.state.displayGameConfig} modalClosed={this.toggleSettingsHandler}>
                        <GameSettings gameStarted={this.props.gameStarted}
                                      defineGameSettings={this.startGame}></GameSettings>
                    </Modal>

                    {gameBoard}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        gameStarted: state.deck.gameStarted,
        gameSettings: state.deck.gameSettings,
        players: state.deck.players,
        currentPlayer: state.board.currentPlayer,
        loading: state.board.loading || state.deck.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartGame: (gameSettings) => dispatch( actions.startNewGame(gameSettings) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Layout, axios));