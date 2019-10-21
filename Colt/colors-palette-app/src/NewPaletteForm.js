import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/NewPaletteFormStyles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
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
      currentColor: 'teal',
      newColorName: '',
      newPaletteName: '',
      colors: this.props.palettes[0].colors
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value => {
      return this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.state.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  };

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ''
    });
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };
  handleSubmit = () => {
    let newPaletteName = this.state.newPaletteName;
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
    const { classes, maxColors } = this.props;
    const { open, colors, currentColor, newColorName } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
          color="default"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                label="Palette Name"
                value={this.state.newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'Enter Palette Name',
                  'Palette Name must be unique!'
                ]}
              ></TextValidator>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
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
          <ChromePicker
            color={currentColor}
            onChangeComplete={newColor => this.updateCurrentColor(newColor)}
          ></ChromePicker>
          <ValidatorForm
            onSubmit={this.addNewColor}
            // instantValidate={false}
          >
            <TextValidator
              value={newColorName}
              name="newColorName"
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={[
                'this field is required',
                'Color name must be unique',
                'Color already used!'
              ]}
            ></TextValidator>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={paletteIsFull}
              style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
            >
              {paletteIsFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
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
