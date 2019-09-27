import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
  console.log(generatePalette(seedColors[6]));

  return (
    <Switch>
      <Route exact path="/" render={() => <h1>Pallete List goeas here</h1>} />
      <Route
        exact
        path="/palette/:id"
        render={() => <h1>Individual pallete</h1>}
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[3])} />
    // </div>
  );
}

export default App;
