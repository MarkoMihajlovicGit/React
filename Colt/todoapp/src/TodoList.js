import React, { Component } from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

import './TodoList.css';

export default class TodoList extends Component {
  //state of all todos here
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  create = newTodo => {
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  remove = id => {
    this.setState({
      todos: this.state.todos.filter(todo => id !== todo.id)
    });
  };

  update = (id, updatedTask) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  toggleCompletion = id => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  };

  render() {
    const todos = this.state.todos.map(todo => (
      <Todo
        id={todo.id}
        key={todo.id}
        task={todo.task}
        completed={todo.completed}
        removeTodo={() => this.remove(todo.id)}
        updateTodo={this.update}
        toggleCompletion={this.toggleCompletion}
      />
    ));
    return (
      <div className="TodoList">
        <h1>
          Todo List! <span>A Simple React Todo List App</span>
        </h1>

        <ul>{todos}</ul>
        <NewTodoForm createTodo={this.create} />
      </div>
    );
  }
}
