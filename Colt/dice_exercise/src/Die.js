import React, { Component } from 'react';
import './Die.css';

export default class Die extends Component {
  render() {
    const { diceValue, rolling } = this.props;
    return (
      <div>
        <i className={`Die fas fa-dice-${diceValue} ${rolling && 'shaking'}`} />
      </div>
    );
  }
}
