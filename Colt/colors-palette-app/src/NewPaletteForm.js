import React from 'react';
import classNames from 'classnames';
import PaletteFormNav from './PaletteFormNav';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/NewPaletteFormStyles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';

class NewPaletteForm extends React.Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  // handleChange = evt => {
  //   this.setState({
  //     [evt.target.name]: evt.target.value
  //   });
  // };

  addNewColor = newColor => {
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ''
    });
  };

  handleSubmit = newPaletteName => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors: this.state.colors
    };
    this.props.savePalette(newPalette);

    //redirect
    this.props.history.push('/');
  };

  removeColor = colorName => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  clearColors = () => {
    this.setState({ colors: [] });
  };

  addRandomColor = () => {
    //pick random color from existing palettes
    // const allColors = this.props.palettes.map(p => p.colors).flat();
    // let rand = Math.floor(Math.random() * allColors.length);
    // const randomColor = allColors[rand];
    // this.setState({ colors: [...this.state.colors, randomColor] });
    const getColor = () => {
      const randomPaletteIndex = Math.floor(
        Math.random() * this.props.palettes.length
      );
      const randomPalette = this.props.palettes[randomPaletteIndex];
      const randomColorIndex = Math.floor(
        Math.random() * randomPalette.colors.length
      );
      return randomPalette.colors[randomColorIndex];
    };
    const color = getColor();

    const validateColor = color => {
      const colors = this.state.colors;
      if (colors.includes(color)) {
        console.log(`Found Duplicate ${color.name}`);
        let otherColor = getColor();
        console.log(`OTHER COLOR ${otherColor.name}`);
        if (colors.includes(otherColor)) {
          let newColor = getColor();
          return newColor;
        } else {
          return otherColor;
        }
      } else {
        return color;
      }
    };

    this.setState({ colors: [...this.state.colors, validateColor(color)] });
  };

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        ></PaletteFormNav>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={this.addNewColor}
            colors={colors}
          ></ColorPickerForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            onSortEnd={this.onSortEnd}
            axis="xy"
          ></DraggableColorList>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
