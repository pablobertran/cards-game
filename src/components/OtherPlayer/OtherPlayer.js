import React, { Component } from 'react';
import classes from './OtherPlayer.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from '../../axios-decks';

class OtherPlayer extends Component{

    playCardHandler() {
        const playedCard = [...this.state.cards].splice(1,Math.random() * (+(this.state.cards.length - 1) - +0) + +0);

    }

    render(){
        let attachedClasses = [classes.OtherPlayer, classes[this.props.player.name]];
        return (<div
                className={attachedClasses.join(' ')}>
                <h4>{this.props.player.name}</h4>
                <strong>Score: {this.props.player.score}</strong>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(OtherPlayer, axios) );