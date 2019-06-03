import React, { Component } from 'react';
import Lottery from './Lottery';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Lottery />
        <Lottery tittle="Magic Round" numBalls={4} maxNum={20} />
      </div>
    );
  }
}
