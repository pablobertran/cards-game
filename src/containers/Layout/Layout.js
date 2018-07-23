import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Modal from '../../components/UI/Modal/Modal';
import GameSettings from '../../components/GameSettings/GameSettings';
import Button from '../../components/UI/Button/Button';
import Player from '../Player/Player';
import Board from '../Board/Board';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from '../../axios-decks';

class Layout extends Component {

    state = {
        displayGameConfig: true
    }

    toggleSettingsHandler = () => {
        this.setState((prevState) => {
            return { displayGameConfig: !prevState.displayGameConfig }
        });
    }

    startGameHandler = (gameSettings) => {
        this.props.onGetNewDeck(gameSettings);
        this.toggleSettingsHandler();
        // Create players
        // Draw cards
        // Start game
    }

    render() {
        return(
            <Aux>
                <main className={classes.Layout}>
                    <Button disabled={this.state.displayGameConfig}
                            clicked={this.toggleSettingsHandler}
                            btnType="SettingsButton">Settings</Button>

                    <Modal show={this.state.displayGameConfig} modalClosed={this.toggleSettingsHandler}>
                        <GameSettings gameStarted={this.startGameHandler}></GameSettings>
                    </Modal>

                    <Board></Board>
                    <Player></Player>
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetNewDeck: (gameSettings) => dispatch( actions.getNewDeck(gameSettings) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Layout, axios));