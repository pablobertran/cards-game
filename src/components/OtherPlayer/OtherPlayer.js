import React, { Component } from 'react';
import classes from './OtherPlayer.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from '../../axios-decks';
import playerImage from '../../assets/images/player.png';

class OtherPlayer extends Component{

    state = {
        playing: false
    }

    playCardHandler() {
        const playedCard = [...this.props.player.cards].splice(0,1)[0];
        playedCard.player = {
            key: this.props.player.key,
            name: this.props.player.name
        };
        this.props.onPlayCard(playedCard, this.props.player, this.props.deck, this.props.players);
        this.props.onCardPlayed(playedCard, this.props.player,  this.props.deck);

        this.setState({playing: false});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentPlayer !== this.props.currentPlayer && nextProps.currentPlayer === this.props.player.key && !this.state.playing){
            this.setState({playing: true});
            setTimeout(()=>{
                this.playCardHandler();
            }, 500);
        }
    }

    render(){
        let attachedClasses = [classes.OtherPlayer, classes[this.props.player.name]];
        return (<div
                className={attachedClasses.join(' ')}>
                <img src={playerImage} alt={this.props.player.name} />
                <h4>{this.props.player.name}</h4>
                <strong>Score: {this.props.player.score}</strong>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nextPlayer: state.board.nextPlayer,
        players: state.deck.players,
        deck: state.deck.deckId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onPlayCard: (card, player, deck, players) => dispatch( actions.onPlayCard(card, player, deck, players) ),
        onCardPlayed: (card, player, deck) => dispatch( actions.onCardPlayed(card, player, deck) )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(OtherPlayer, axios) );