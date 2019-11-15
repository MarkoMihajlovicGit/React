import React, { Component } from 'react';

export default class CounterClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counts: 0
    };
  }

  addCount = () => {
    this.setState({ counts: this.state.counts + 1 });
  };

  render() {
    return (
      <div>
        <h1>The Count is: {this.state.counts}</h1>
        <button onClick={this.addCount}>add 1</button>
      </div>
    );
  }
}
