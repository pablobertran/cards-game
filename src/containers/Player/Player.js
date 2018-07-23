import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import classes from './Player.css';

class Player extends Component {

    render() {
        let player = (
            <Aux>
                <h4>No game in course.</h4>
                <Button disabled={false} btnType="Error" clicked={this.props.startGame}>Start Game</Button>
            </Aux>
        );
        return (
            <div className={classes.Player}>
                {player}
            </div>
        );
    }
}

export default Player;