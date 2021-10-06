import React from 'react';
import 'src/crutch/static/styles/standUp.css';

class StandUp extends React.Component {

  static DEFAULT_LAST_STANDUP = "These are all the things you did last time";
  static DEFAULT_CURRENT_STANDUP = "These are all the things you're going to do today";

  constructor(props) {
    super(props);
  }

  getStandUp(tasks) {
    return tasks.map(task => task.name).join(", ");
  }

  render() {
    const lastToDoList = this.props.lastToDoList;
    const currentToDoList = this.props.currentToDoList;
    const lastListTasks = lastToDoList.tasks.filter(task => task.name.length > 0);
    const currentListTasks = currentToDoList.tasks.filter(task => task.name.length > 0);
    const lastStandUp = lastListTasks.length == 0 ? StandUp.DEFAULT_LAST_STANDUP : this.getStandUp(lastListTasks);
    const currentStandUp = currentListTasks.length == 0 ? StandUp.DEFAULT_CURRENT_STANDUP : this.getStandUp(currentListTasks);
    return (
      <div id="standUp">
        <div id="lastStandUp">
          Y: {lastStandUp}
        </div>
        <div id="currentStandUp">
          T: {currentStandUp}
        </div>
      </div>
    );
  }
}

export default StandUp;