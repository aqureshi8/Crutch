import React from 'react';
import "src/standUp/static/styles/standUp.css";
import Task from 'src/standUp/task';

class StandUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(Date.now()),
      tasks: [],
    };
  }

  componentDidMount() {
    this.addTask();
  }

  handleKeyUp(event, key) {
    const tasks = this.state.tasks;
    if (event.keyCode === 13 && key === tasks.length - 1) {
      event.preventDefault();
      this.addTask()
    }
  }

  addTask() {
    let tasks = this.state.tasks;
    let updatedTasks = tasks.concat([
      <Task
        key={tasks.length}
        onKeyUp={(event) => this.handleKeyUp(event, tasks.length)}
      />
    ]);
    this.setState({
      tasks: updatedTasks,
    });
  }

  render() {
    const title = this.state.date.toDateString();
    return (
      <div>
        <div className="title">{title}</div>
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