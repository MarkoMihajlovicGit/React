import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles = {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },

  PaletteColors: {
    height: '90%'
  },
  goBack: {
    width: '20%',
    height: '50%',
    margin: ' 0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4.8px',
    opacity: 1,
    backgroundColor: 'rgb(2, 2, 2)',
    '& a': {
      color: 'white',
      width: '100px',
      height: '30px',
      position: 'absolute',
      display: 'inline-block',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-15px',
      textAlign: ' center',
      outline: 'none',
      background: 'rgba(255, 255, 255, 0.3)',
      fontSize: '1rem',
      lineHeight: '30px',
      opacity: '1',
      textTransform: 'uppercase',
      border: 'none',
      textDecoration: 'none'
    }
  }
};
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
    const { paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;

    const colorBoxes = this._shades.map(shade => (
      <ColorBox
        key={shade.name}
        name={shade.name}
        background={shade[format]}
        showingFullPalette={false}
      ></ColorBox>
    ));
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} displaySlider={false}></Navbar>

        <div className={classes.PaletteColors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}></PaletteFooter>
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
