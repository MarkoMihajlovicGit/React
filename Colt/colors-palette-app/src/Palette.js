import React, { Component } from 'react';
import ColorBox from './ColorBox';
// important!!! import our own Palette.css after rc-slider styles
import 'rc-slider/assets/index.css';
import './Palette.css';
import Slider from 'rc-slider';

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500
    };
  }

  changeLevel = level => {
    this.setState({ level });
  };
  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;

    const colorBoxes = colors[level].map((color, idx) => (
      <ColorBox background={color.hex} name={color.name} key={idx} />
    ));

    return (
      <div className="Palette">
        <div className="slider">
          <Slider
            defaultValue={this.state.level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>
        {/* {navbar goes here} */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer eventualy */}
      </div>
    );
  }
}
