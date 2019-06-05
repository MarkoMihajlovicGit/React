import React, { Component } from 'react';
import Box from './Box';
import colors from './colors';
import './Boxes.css';

export default class Boxes extends Component {
  static defaultProps = {
    nBoxes: 18,
    colors
  };

  render() {
    const boxes = Array.from({ length: this.props.nBoxes }).map((n, index) => (
      <Box colors={this.props.colors} key={index} />
    ));

    return <div className="Boxes">{boxes}</div>;
  }
}
