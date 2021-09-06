import React from "react";
import TaskModel from 'src/standUp/models/taskModel';
import "src/standUp/static/styles/task.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAngleDoubleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TASK_IN_PROGRESS, TASK_FINISHED } from 'src/common/features';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.model = props.model;
    this.state = {
      id: this.model.id,
      name: this.model.name,
      date: this.model.date,
      status: TaskModel.Status.NOT_STARTED,
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  updateModel() {
    this.model.name = this.state.name;
    this.model.status = this.state.status;
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
    this.updateModel();
  }

  setStatus(status) {
    if (status === this.state.status) {
      this.setState({
        status: TaskModel.Status.NOT_STARTED
      });
    } else {
      this.setState({
        status: status
      });
    }
    this.updateModel();
  }

  render() {
    var taskStatus = [];
    if (TASK_IN_PROGRESS) {
      taskStatus.push(
        <div
          key="statusInProgress"
          className={"taskStatus inProgress" + (this.state.status === TaskModel.Status.NOT_STARTED ? " unselected" : "")}
          onClick={() => this.setStatus(TaskModel.Status.IN_PROGRESS)}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </div>
      )
    }
    if (TASK_FINISHED) {
      taskStatus.push(
        <div
          key="statusFinished"
          className={"taskStatus finished" + (this.state.status !== TaskModel.Status.FINISHED ? " unselected" : "")}
          onClick={() => this.setStatus(TaskModel.Status.FINISHED)}
        >
          <FontAwesomeIcon icon={faCheck} />      
        </div>
      )
    }
    return (
      <div className="task">
        <input
          className="taskName"
          type="text"
          ref={(input) => this.input = input}
          placeholder="What do you plan to get done?"
          defaultValue={this.state.name}
          onChange={(event) => this.handleChange(event, this.model.id)}
          onKeyUp={(event) => this.props.onKeyUp(event, this.model.id)}
        />
        {taskStatus}
        <div
          className="taskOption delete"
          onClick={() => this.props.handleRemove()}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    );
  }
}

export default Task;