import React, { Component } from 'react';

export default class SimpleFormClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  handleChange = e => {
    this.setState({ email: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>You Entered: {this.state.email}</h1>
        <input
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }
}
