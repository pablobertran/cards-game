import React, { Component } from 'react';
import CardList from '../../components/CardList/CardList';

class Hand extends Component {

    render() {
        return this.props.cards ? <CardList board={this.props.disabled} cards={this.props.cards} playCard={this.props.playCard}></CardList> : <p>You have an empty hand!</p>;
    }
}

export default Hand;