import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task
    };
  }

  toggleForm = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleUpdate = evt => {
    evt.preventDefault();
    //take new task data and pass to parrent
    this.props.updateTodo(this.props.id, this.state.task);
    this.toggleForm();
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleToggle = evt => {
    this.props.toggleCompletion(this.props.id);
  };

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div className="Todo">
          <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
            <input
              type="text"
              value={this.state.task}
              name="task"
              onChange={this.handleChange}
            />
            <button>Save</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div className="Todo">
          <li
            className={
              this.props.completed ? 'Todo-task completed' : 'Todo-task'
            }
            onClick={this.handleToggle}
          >
            {this.props.task}
          </li>
          <div className="Todo-buttons">
            <button onClick={this.toggleForm} className="Todo-button-edit">
              <i className="fas fa-pen" />
            </button>
            <button onClick={this.props.removeTodo} className="Todo-button">
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
      );
    }
    return result;
  }
}
