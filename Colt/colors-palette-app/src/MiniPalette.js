import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class MiniPalette extends Component {
  constructor(props) {
    super();
  }

  deletePalette = e => {
    e.stopPropagation();
    this.props.handleDelete(this.props.id);
  };
  render() {
    const { classes, emoji, paletteName, colors, handleClick } = this.props;

    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));
    return (
      <div className={classes.root} onClick={handleClick}>
        <DeleteForeverIcon
          className={classes.deleteIcon}
          onClick={this.deletePalette}
        ></DeleteForeverIcon>

        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
