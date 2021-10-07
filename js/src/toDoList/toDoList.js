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

  handleKeyUp(event, externalId) {
    const tasks = this.props.tasks;
    if (event.keyCode === 13 && tasks[tasks.length - 1].externalId === externalId) {
      event.preventDefault();
      this.props.addTask();
    }
  }

  /*removeTask(externalId) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.externalId != externalId)
    });
  }*/

  updateTask(externalId, name) {
    const tasks = this.props.tasks.map((task) => {
      if (task.externalId == externalId) {
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
        key={task.externalId}
        externalId={task.externalId}
        name={task.name}
        onKeyUp={(event, externalId) => this.handleKeyUp(event, externalId)}
        handleRemove={(externalId) => this.removeTask(externalId)}
        handleUpdate={(externalId, name) => this.updateTask(externalId, name)}
      />
    );
  }

  render() {
    const tasks = this.props.tasks.map((task) => this.renderTask(task));
    return (
      <div id="taskList">
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