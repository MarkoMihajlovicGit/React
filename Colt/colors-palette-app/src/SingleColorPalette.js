import React, { Component } from 'react';
import ColorBox from './ColorBox';
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    console.log(this._shades);
  }

  gatherShades = (palette, colorToFilterBy) => {
    //return all shades of given color
    let shades = [];

    let allColors = palette.colors;
    for (let color in allColors) {
      shades = shades.concat(
        allColors[color].filter(color => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  };
  render() {
    const colorBoxes = this._shades.map(shade => (
      <ColorBox
        key={shade.name}
        name={shade.name}
        background={shade.hex}
        showLink={false}
      ></ColorBox>
    ));
    return (
      <div className="Palette">
        <h1>Single Color Palette</h1>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
