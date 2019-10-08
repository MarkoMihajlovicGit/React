import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = {
      format: 'hex'
    };
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

  changeFormat = val => {
    this.setState({ format: val });
  };
  render() {
    const { format } = this.state;
    const { paletteName, emoji } = this.props.palette;

    const colorBoxes = this._shades.map(shade => (
      <ColorBox
        key={shade.name}
        name={shade.name}
        background={shade[format]}
        showLink={false}
      ></ColorBox>
    ));
    return (
      <div className="Palette">
        <Navbar handleChange={this.changeFormat} displaySlider={false}></Navbar>
        <h1>Single Color Palette</h1>
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}></PaletteFooter>
      </div>
    );
  }
}

export default SingleColorPalette;
