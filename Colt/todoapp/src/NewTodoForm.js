import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './NewTodoForm.css';

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ''
    };
  }
  handleSubmit = evt => {
    evt.preventDefault();
    const newTodo = { ...this.state, id: uuid(), completed: false };
    this.props.createTodo(newTodo);
    this.setState({ task: '' });
  };
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    return (
      <form className="NewTodoForm" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="task">New Todo </label>
          <input
            type="text"
            id="task"
            name="task"
            value={this.state.task}
            onChange={this.handleChange}
            placeholder="New Todo"
          />
          <button>Add Todo</button>
        </div>
      </form>
    );
  }
}
