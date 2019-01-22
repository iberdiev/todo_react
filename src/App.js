import React, { Component } from 'react';
import Todos from './Todos'
import AddTodo from './AddTodo'

class App extends Component {
  state = {
    todos:[
      // {id:1, content: 'buy milk'},
      // {id:2, content: 'play games'}
    ]
  }
  deleteTodo = (id) => {
    console.log(id)
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    })
    this.setState({
      todos
    })
    localStorage.setItem("tasks", JSON.stringify(todos));
  }
  addTodo = (todo) => {
    todo.id = Math.random()
    if (todo.content){
      let todos = [...this.state.todos, todo]
      this.setState ({
        todos
      })
      localStorage.setItem("tasks", JSON.stringify(todos));
    }
  }
  saveLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  componentDidMount() {
    this.saveLocalStorage();

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }
    componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    this.saveStateToLocalStorage();
}


  render() {
    return (
      <div className="todo-app container">
        <h1 className='center green-text'>Todo's</h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
        <AddTodo addTodo={this.addTodo} />
      </div>
    );
  }
}

export default App;
