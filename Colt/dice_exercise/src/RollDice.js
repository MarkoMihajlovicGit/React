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
      diceOne: this.roll(),
      diceTwo: this.roll(),
      rolling: true
    });
    setTimeout(() => {
      this.setState({ rolling: false });
    }, 1000);
  };

  render() {
    return (
      <div className="RollDice">
        <div className="RollDice-container">
          <Die diceValue={this.state.diceOne} rolling={this.state.rolling} />
          <Die diceValue={this.state.diceTwo} rolling={this.state.rolling} />
        </div>
        <button onClick={this.rollDices} disabled={this.state.rolling}>
          {this.state.rolling ? 'Rolling...' : 'Roll the Dices'}
        </button>
      </div>
    );
  }
}
