import React, { Component } from 'react';

class Hand extends Component {

    render() {
        let cardList = <p>You have an empty hand!</p>;

        return (
            {cardList}
        );
    }
}

export default Hand;