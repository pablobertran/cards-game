import React, {Component} from 'react';
import Card from '../Card/Card';
import classes from './CardList.css';

class CardList extends Component {

    render() {

        let cardList = <div></div>;
        if(this.props.cards){
            cardList = (
                <ul className={classes.CardList}>
                    {
                        this.props.cards.map( card => {
                            return (
                                <li key={card.code}>
                                    <Card card={card} playCard={this.props.playCard} board={this.props.board}></Card>
                                </li>
                            );
                        })
                    }
                </ul>
            )
        }
        return cardList;
    }
}

export default CardList;
