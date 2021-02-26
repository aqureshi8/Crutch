import React from "react";
import "src/standUp/static/styles/task.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAngleDoubleRight, faTimes } from '@fortawesome/free-solid-svg-icons';

class Task extends React.Component {
  Status = Object.freeze({
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    FINISHED: "Finished",
  });

  constructor(props) {
    super(props);
    const name = props.name ? props.name : "";
    const id = props.id ? props.id : "";
    this.state = {
      id: id,
      name: name,
      status: this.Status.NOT_STARTED,
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  setStatus(status) {
    if (status === this.state.status) {
      this.setState({
        status: this.Status.NOT_STARTED
      });
    } else {
      this.setState({
        status: status
      });
    }
  }

  render() {
    return (
      <div className="task">
        <input
          className="taskName"
          type="text"
          ref={(input) => this.input = input}
          placeholder="What do you plan to get done?"
          defaultValue={this.state.name}
          onChange={(event) => this.handleChange(event)}
          onKeyUp={(event) => this.props.onKeyUp(event)}
        />
        <div
          className={"taskStatus inProgress" + (this.state.status === this.Status.NOT_STARTED ? " unselected" : "")}
          onClick={() => this.setStatus(this.Status.IN_PROGRESS)}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </div>
        <div
          className={"taskStatus finished" + (this.state.status !== this.Status.FINISHED ? " unselected" : "")}
          onClick={() => this.setStatus(this.Status.FINISHED)}
        >
          <FontAwesomeIcon icon={faCheck} />      
        </div>
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