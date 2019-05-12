import React, { Component } from 'react';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';

// class Button extends Component {
//   static contextType = LanguageContext;

//   render() {
//     const text = this.context === 'english' ? 'Submit' : 'Voorleggen';
//     return <button className="ui primary button">{text}</button>;
//   }
// }

class Button extends Component {
  renderButton(color) {
    return (
      <button className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {value => (value === 'english' ? 'Submit' : 'Voorleggen')}
        </LanguageContext.Consumer>
      </button>
    );
  }

  render() {
    return (
      <ColorContext.Consumer>
        {color => this.renderButton(color)}
      </ColorContext.Consumer>
    );
  }
}

export default Button;
