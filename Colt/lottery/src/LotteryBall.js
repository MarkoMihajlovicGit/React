import React from 'react';
import './LotteryBall.css';

const LotteryBall = props => {
  const { num } = props;
  return <div className="LotteryBall">{num}</div>;
};

export default LotteryBall;
