import React from 'react';
import "src/toDoList/static/styles/toDoList.css";
import Task from 'src/toDoList/task';
import { v4 as uuidv4 } from 'uuid';
import TaskModel from './models/taskModel';

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.tasks.length == 0) {
      this.props.addTask();
    }
  }

  handleKeyUp(event, id) {
    const tasks = this.props.tasks;
    if (event.keyCode === 13 && tasks[tasks.length - 1].id === id) {
      event.preventDefault();
      this.props.addTask();
    }
  }

  /*removeTask(id) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id != id)
    });
  }*/

  updateTask(id, name) {
    const tasks = this.props.tasks.map((task) => {
      if (task.id == id) {
        const updatedTask = {
          ...task,
          name: name
        };
        return updatedTask
      }
      return task;
    });
    this.props.updateTasks(tasks);
  }

  renderTask(task) {
    return (
      <Task
        key={task.id}
        id={task.id}
        name={task.name}
        onKeyUp={(event, id) => this.handleKeyUp(event, id)}
        handleRemove={(id) => this.removeTask(id)}
        handleUpdate={(id, name) => this.updateTask(id, name)}
      />
    );
  }

  render() {
    const tasks = this.props.tasks.map((task) => this.renderTask(task));
    return (
      <div>
        {tasks}
        <button
          id="addTask"
          className="add"
          onClick={() => this.props.addTask()}>Add Task</button>
      </div>
    );
  }
}

export default ToDoList;