import React, { Component } from 'react';
import LotteryBall from './LotteryBall';
import './Lottery.css';

export default class Lottery extends Component {
  static defaultProps = {
    numBalls: 7,
    maxNum: 40,
    tittle: 'Lotto'
  };

  constructor(props) {
    super(props);
    this.state = {
      nums: Array.from({ length: this.props.numBalls })
    };
  }
  // generateNumbers = () => {
  //   const { maxNum, numBalls } = this.props;
  //   var arr = [];
  //   while (arr.length < numBalls) {
  //     var r = Math.floor(Math.random() * maxNum) + 1;
  //     if (arr.indexOf(r) === -1) arr.push(r);
  //   }
  //   this.setState({ nums: arr });
  // };

  generateNumbers = () => {
    this.setState(currState => ({
      nums: currState.nums.map(
        n => Math.floor(Math.random() * this.props.maxNum) + 1
      )
    }));
  };

  render() {
    const { nums } = this.state;
    return (
      <div className="Lottery">
        <h1>{this.props.tittle}</h1>
        <ul className="Lottery-ul">
          {nums.map((num, index) => {
            return (
              <li key={index}>
                <LotteryBall num={num} />
              </li>
            );
          })}
        </ul>
        <button onClick={this.generateNumbers}> Generate Lotto</button>
      </div>
    );
  }
}
