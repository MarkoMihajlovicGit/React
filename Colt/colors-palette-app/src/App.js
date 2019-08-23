import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
  console.log(generatePalette(seedColors[6]));

  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[3])} />
    </div>
  );
}

export default App;
