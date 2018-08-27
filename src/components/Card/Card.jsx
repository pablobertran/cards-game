import React from 'react';
import PropTypes from 'prop-types';
import classes from './Card.css';

const Card = (props) => {
  const { board, playCard, card } = props;
  return (
    <div
      className={classes.Card}
      onClick={() => (board ? null : playCard(card))}
    >
      <img src={card.image} alt={card.value} />
    </div>
  );
};

Card.propTypes = {
  board: PropTypes.bool.isRequired,
  playCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired
};

export default Card;
