import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';
export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: 'hex'
    };
  }

  changeLevel = level => {
    this.setState({ level });
  };
  changeFormat = val => {
    this.setState({ format: val });
  };

  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
      />
    ));

    return (
      <div className="Palette">
        {/* {navbar goes here} */}
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer eventualy */}
        <footer className="palette-footer">
          {paletteName} <span className="emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}
