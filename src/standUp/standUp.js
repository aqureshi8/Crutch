import React from 'react';
import "src/standUp/static/styles/standUp.css";
import Task from 'src/standUp/task';
import { v4 as uuidv4 } from 'uuid';

class StandUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      tasks: [],
    };
  }

  componentDidMount() {
    this.addTask();
  }

  handleKeyUp(event, id) {
    const tasks = this.state.tasks;
    if (event.keyCode === 13 && tasks[tasks.length - 1].props.id === id) {
      event.preventDefault();
      this.addTask()
    }
  }

  removeTask(id) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.props.id != id)
    });
  }

  addTask() {
    const tasks = this.state.tasks;
    const id = uuidv4();
    let updatedTasks = tasks.concat([
      <Task
        key={id}
        id={id}
        onKeyUp={(event) => this.handleKeyUp(event, id)}
        handleRemove={() => this.removeTask(id)}
      />
    ]);
    this.setState({
      tasks: updatedTasks,
    });
  }

  render() {
    return (
      <div>
        {this.state.tasks}
        <button
          id="addTask"
          className="add"
          onClick={() => this.addTask()}>Add Task</button>
      </div>
    );
  }
}

export default StandUp;