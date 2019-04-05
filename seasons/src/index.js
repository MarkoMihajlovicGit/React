import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  // constructor(props) {
  //   super(props); // this is reference to the parent class React.Component

  //   // THIS IS THE ONLY TIME we do direct assignment to this.state !!!!
  //   this.state = { lat: null, errorMessage: '' };
  // }

  state = { lat: null, errorMessage: '' };

  //Good place for data loading
  //This function will be called automatically ONE time when our component get 1st time rendered on screen
  componentDidMount() {
    //console.log('My component was rendered to the screen');
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  // Sit and waith for update, anytime we call setState and update our state the component will rerender itself()update itself!!!

  // componentDidUpdate() {
  //   console.log('My component was just updated - it rerendered');
  // }

  // We might decide to stop showing this component on the screen
  //This method is used as some kinda a CELAN UP AFTER OUR COMPONENT
  // componentWillUnmount(){
  //
  //}

  // React says we have to define render, and use it JUST to return JSX!!!!
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }

    return <div>Loading...!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
