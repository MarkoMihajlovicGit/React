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
      head: false,
      tail: false
    };
  }

  headOrTails = () => {
    const { flipsNum, headsNum, tailsNum } = this.state;
    const face = Math.floor(Math.random() * 2) + 1;

    this.setState(st => {
      return {
        flipsNum: st.flipsNum + 1,
        headsNum: st.headsNum + (face === 1 ? 1 : 0),
        tailsNum: st.tailsNum + (face === 2 ? 1 : 0),
        head: face === 1 ? true : false,
        tail: face === 2 ? true : false
      };
    });
  };

  handleClick = () => {
    this.headOrTails();
  };

  render() {
    const { flipsNum, headsNum, tailsNum, head, tail } = this.state;

    return (
      <div className="Counter">
        <h1>Lets flip a coin</h1>
        <Coin head={head} tail={tail} />
        <button onClick={this.handleClick}>Flip Meeee</button>
        <p>
          Out of : {flipsNum} flips, there have been: {headsNum} heads and :{' '}
          {tailsNum} tails.
        </p>
      </div>
    );
  }
}
