import React, { Component } from 'react';
import './Die.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix
} from '@fortawesome/free-solid-svg-icons';

class Die extends Component {
  static defaultProps = {
    face: [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix]
  };

  handleClick = () => {
    this.props.handleClick(this.props.idx);
  };
  render() {
    const { face, val, locked, disabled, rolling } = this.props;
    let classes = `Die`;
    if (locked) {
      classes += ' Die-locked ';
    }
    if (rolling && !locked) {
      classes += ' Die-rolling';
    }
    return (
      <FontAwesomeIcon
        className={classes}
        icon={face[val - 1]}
        onClick={this.handleClick}
        size="4x"
        disabled={disabled}
      />
    );
  }
}

export default Die;
