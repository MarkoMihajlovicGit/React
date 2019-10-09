import React, { Component } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

const styles = {
  darkerText: {
    color: props =>
      chroma(props.background).luminance() >= 0.5
        ? 'rgba(0, 0, 0, 0.7)'
        : 'white'
  },
  nameColor: {
    color: props =>
      chroma(props.background).luminance() <= 0.08
        ? 'white'
        : 'rgba(0, 0, 0, 0.7)'
  },
  copyButton: {
    color: props =>
      chroma(props.background).luminance() >= 0.6
        ? 'rgba(0, 0, 0, 0.7)'
        : 'white',
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
    opacity: '0',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none'
  },
  seeMore: {
    color: props =>
      chroma(props.background).luminance() >= 0.5
        ? 'rgba(0, 0, 0, 0.7)'
        : 'white',
    background: ' rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: ' 0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase'
  },
  colorBox: {
    width: '20%',
    height: props => (props.showingFullPalette ? ' 25%' : '50%'),
    margin: ' 0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4.8px',
    '&:hover button': {
      opacity: '1',
      transition: ' 0.35s'
    }
  }
};

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  render() {
    const {
      name,
      background,
      moreUrl,
      showingFullPalette,
      classes
    } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.colorBox}>
          <div
            className={`copy-overlay ${copied && 'show'}`}
            style={{ background }}
          />
          <div className={`copy-msg ${copied && 'show'}`}>
            <h1>copied!</h1>
            <p className={classes.darkerText}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={classes.nameColor}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
