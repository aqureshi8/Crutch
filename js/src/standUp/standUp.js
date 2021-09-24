import React from 'react';
import "src/standUp/static/styles/standUp.css";
import Task from 'src/standUp/task';
import { v4 as uuidv4 } from 'uuid';
import TaskModel from './models/taskModel';

class StandUp extends React.Component {
  constructor(props) {
    super(props);
    this.date = props.model.date;
    this.state = {
      tasks: props.model.tasks,
    };
  }

  componentDidMount() {
    this.addTask();
  }

  handleKeyUp(event, id) {
    const tasks = this.state.tasks;
    if (event.keyCode === 13 && tasks[tasks.length - 1].id === id) {
      event.preventDefault();
      this.addTask();
    }
  }

  removeTask(id) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id != id)
    });
    console.log("removed task id: " + id);
  }

  updateTask(id, name) {
    const tasks = this.state.tasks.map((task) => {
      if (task.id == id) {
        const updatedTask = {
          ...task,
          name: name
        };
        return updatedTask
      }
      return task;
    });
    this.setState({
        tasks: tasks
    });
  }

  addTask() {
    const tasks = this.state.tasks;
    let updatedTasks = tasks.concat([
        TaskModel.create({date: this.state.date})
    ]);
    this.setState({
      tasks: updatedTasks,
    });
  }

  renderTask(task) {
    return (
      <Task
        key={task.id}
        model={task}
        onKeyUp={(event, id) => this.handleKeyUp(event, id)}
        handleRemove={(id) => this.removeTask(id)}
        handleUpdate={(id, name) => this.updateTask(id, name)}
      />
    );
  }

  render() {
   console.log(this.state.tasks);
    const tasks = this.state.tasks.map((task) => this.renderTask(task));
    return (
      <div>
        {tasks}
        <button
          id="addTask"
          className="add"
          onClick={() => this.addTask()}>Add Task</button>
      </div>
    );
  }
}

export default StandUp;