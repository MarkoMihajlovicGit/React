import React from 'react';
import CounterClass from './CounterClass';
import CounterHook from './CounterHook';
import Toggler from './Toggler';
import SimpleFormClass from './SimpleFormClass';
import SimpleFormHooks from './SimpleFormHooks';
import SimpleFormInputHook from './SimpleFormInputHook';
import Clicker from './Clicker';
import './App.css';
import SWMovies from './SWMovies';

function App() {
  return (
    <div className="App">
      {/* <CounterClass></CounterClass>
      <CounterHook></CounterHook>
      <Toggler></Toggler>
      <SimpleFormClass></SimpleFormClass>
      <SimpleFormHooks></SimpleFormHooks>
      <SimpleFormInputHook></SimpleFormInputHook>
      <Clicker></Clicker> */}
      <SWMovies></SWMovies>
    </div>
  );
}

export default App;
