import React from 'react';
import headImg from './head.jpg';
import tailsImg from './tails.jpg';
import './Coin.css';

const Coin = props => {
  return (
    <div>
      <img src={props.side === 'head' ? headImg : tailsImg} alt={props.side} />
    </div>
  );
};

export default Coin;
