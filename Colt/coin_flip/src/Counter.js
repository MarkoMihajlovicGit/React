import React, { Component } from 'react';
import Coin from './Coin';
import './Counter.css';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipsNum: 0,
      headsNum: 0,
      tailsNum: 0,
      side: null
    };
  }

  headOrTails = () => {
    const face = Math.floor(Math.random() * 2) + 1;

    this.setState(st => {
      return {
        flipsNum: st.flipsNum + 1,
        headsNum: st.headsNum + (face === 1 ? 1 : 0),
        tailsNum: st.tailsNum + (face === 2 ? 1 : 0),
        side: face === 1 ? 'head' : 'tail'
      };
    });
  };

  handleClick = () => {
    this.headOrTails();
  };

  render() {
    const { flipsNum, headsNum, tailsNum, side } = this.state;

    return (
      <div className="Counter">
        <h1>Lets flip a coin</h1>
        <h3>{side && side.toUpperCase()}</h3>
        {side && <Coin side={side} />}
        <button onClick={this.handleClick}>Flip Meeee</button>
        <p>
          Out of : {flipsNum} flips, there have been: {headsNum} heads and :{' '}
          {tailsNum} tails.
        </p>
      </div>
    );
  }
}
