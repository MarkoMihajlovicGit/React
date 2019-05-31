import React, { Component } from 'react';
import Die from './Die';
import './RollDice.css';

export default class RollDice extends Component {
  static defaultProps = {
    numbers: ['one', 'two', 'three', 'four', 'five', 'six']
  };

  constructor(props) {
    super(props);
    this.state = {
      diceOne: this.roll(),
      diceTwo: this.roll(),
      rolling: false
    };
  }

  roll = () => {
    let rand = Math.floor(Math.random() * this.props.numbers.length);
    return this.props.numbers[rand];
  };
  rollDices = () => {
    this.setState({
      rolling: true
    });
    setTimeout(() => {
      this.setState({
        diceOne: this.roll(),
        diceTwo: this.roll(),
        rolling: false
      });
    }, 1000);
  };

  render() {
    const { diceOne, diceTwo, rolling } = this.state;
    return (
      <div className="RollDice">
        <div className="RollDice-container">
          <Die diceValue={diceOne} rolling={rolling} />
          <Die diceValue={diceTwo} rolling={rolling} />
        </div>
        <button onClick={this.rollDices} disabled={rolling}>
          {rolling ? 'Rolling...' : 'Roll the Dices'}
        </button>
      </div>
    );
  }
}
