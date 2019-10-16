import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = props => {
  return (
    <div
      className={props.classes.root}
      style={{ backgroundColor: props.color }}
    >
      {props.name}
    </div>
  );
};

export default withStyles(styles)(DraggableColorBox);
