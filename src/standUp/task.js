import React from "react";

class Task extends React.Component {
  Status = Object.freeze({
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    FINISHED: "Finished",
  });

  constructor(props) {
    super(props);
    let name = props.name ? props.name : "";
    this.state = {
      id: null,
      name: name,
      status: this.Status.NOT_STARTED,
    };
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  componentDidMount() {
    this.input.focus()
  }

  render() {
    return (
      <div className="task">
        <input
          id="name"
          className="taskName"
          type="text"
          ref={(input) => this.input = input}
          placeholder="What do you plan to get done?"
          defaultValue={this.state.name}
          onChange={(event) => this.handleChange(event)}
          onKeyUp={(event) => this.props.onKeyUp(event)}
        />
      </div>
    );
  }
}

export default Task;