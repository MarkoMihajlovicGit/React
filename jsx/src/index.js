// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Create a react component

const App = () => {
  const buttonText = { text: 'Click me!' };
  function getTime() {
    return new Date().toLocaleTimeString();
  }
  return (
    <div>
      <label className="label" htmlFor="name">
        Enter name:
      </label>
      <input id="name" type="text" />
      <button
        style={{ backgroundColor: 'blue', color: 'white', fontSize: '24px' }}
      >
        {buttonText.text}
      </button>
      <div>Current time:</div>
      <h3>{getTime()}</h3>
    </div>
  );
};

// Take the react component and show it on the screen
ReactDOM.render(<App />, document.querySelector('#root'));
