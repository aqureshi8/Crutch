import React from "react";
import TaskModel from 'src/toDoList/models/taskModel';
import "src/toDoList/static/styles/task.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAngleDoubleRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TASK_IN_PROGRESS, TASK_FINISHED } from 'src/common/features';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.id = props.id;
  }

  componentDidMount() {
    this.input.focus();
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
  }

  render() {
    var taskStatus = [];
    if (TASK_IN_PROGRESS) {
      taskStatus.push(
        <div
          key="statusInProgress"
          className={"taskStatus inProgress" + (this.status === TaskModel.Status.NOT_STARTED ? " unselected" : "")}
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
          className={"taskStatus finished" + (this.status !== TaskModel.Status.FINISHED ? " unselected" : "")}
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
          defaultValue={this.props.name}
          onChange={(event) => this.props.handleUpdate(this.id, event.target.value)}
          onKeyUp={(event) => this.props.onKeyUp(event, this.id)}
        />
        {taskStatus}
        <div
          className="taskOption delete"
          onClick={() => this.props.handleRemove(this.id)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    );
  }
}

export default Task;