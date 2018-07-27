import React, {Component} from 'react';
import classes from './Card.css';

class Card extends Component {

    render() {
        return (
            <div className={classes.Card}
                 onClick={() => this.props.board ? null : this.props.playCard(this.props.card)}>
                <img src={this.props.card.image} alt={this.props.card.value} />
            </div>
        )
    }
}

export default Card;