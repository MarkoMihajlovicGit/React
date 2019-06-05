import React, { Component } from 'react';
import './Box.css';
import { choice } from './helper';

export default class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: choice(this.props.colors)
    };
  }

  handleClick = () => {
    this.randomColor();
  };

  randomColor = () => {
    let newColor;
    do {
      newColor = choice(this.props.colors);
    } while (newColor === this.state.color);
    this.setState({ color: newColor });
  };

  render() {
    return (
      <div
        className="Box-color"
        onClick={this.handleClick}
        style={{ backgroundColor: this.state.color }}
      />
    );
  }
}
