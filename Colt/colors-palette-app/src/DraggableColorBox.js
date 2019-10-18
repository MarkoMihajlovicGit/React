import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/DraggableColorBoxStyles';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { SortableElement } from 'react-sortable-hoc';

const DraggableColorBox = SortableElement(props => {
  const { classes, handleClick, color, name } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteForeverSharpIcon
          className={classes.deleteIcon}
          onClick={handleClick}
        ></DeleteForeverSharpIcon>
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
