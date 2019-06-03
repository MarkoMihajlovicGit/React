import React from 'react';
import headImg from './head.jpg';
import tailsImg from './tails.jpg';
import './Coin.css';

const Coin = props => {
  const coinImg = () => {
    const { head, tail } = props;
    if (head) {
      return <img src={headImg} alt="head" />;
    } else if (tail) {
      return <img src={tailsImg} alt="tail" />;
    } else {
      return null;
    }
  };

  return <div>{coinImg()}</div>;
};

export default Coin;
