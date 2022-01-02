import React from 'react';
import ToDoList from 'src/toDoList/toDoList';
import ToDoListModel from 'src/toDoList/models/toDoListModel';
import { v4 as uuidv4 } from 'uuid';
import 'src/crutch/static/styles/crutch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-regular-svg-icons';
import Task from 'src/toDoList/task';
import TaskModel from 'src/toDoList/models/taskModel.js';
import StandUp from 'src/crutch/standUp.js';
import axios from 'axios';
import { getCsrfToken } from 'src/common/requestHelper.js';

class Crutch extends React.Component {
  constructor(props) {
    super(props);
    const toDoLists = this.loadToDoLists();
    const currentToDoList = toDoLists.length - 1;
    this.tasksToSave = false;
    this.state = {
      toDoLists: toDoLists,
      currentToDoList: currentToDoList,
      saving: false
    }
    setTimeout(() => this.saveTasks(), 10000);
  }

  loadToDoLists() {
    //TODO: update with real loading code, load last 10 stand ups
    let toDoLists = [];
    for(var x = 9; x > 0; x--) {
      const xDaysAgo = new Date();
      xDaysAgo.setDate(new Date().getDate() - x);
      const toDoList = ToDoListModel.createWithDate(xDaysAgo);
      toDoLists.push(toDoList);
    }
    //Current toDoList
    toDoLists = toDoLists.concat([ToDoListModel.create()]);
    return toDoLists;
  }

  toggleCurrentToDoList(count) {
    let currentToDoList = this.state.currentToDoList;
    this.setState({
      currentToDoList: currentToDoList + count
    });
  }

  updateTasks(externalId, tasks) {
    const toDoLists = this.state.toDoLists;
    const newToDoLists = toDoLists.map((toDoList) => {
      if (toDoList.externalId == externalId) {
        const updatedToDoList = {
          ...toDoList,
          tasks: tasks
        }
        return updatedToDoList;
      }
      return toDoList;
    });
    this.setState({
      toDoLists: newToDoLists
    });
    this.tasksToSave = true;
  }

  async saveTasks() {
    if (this.tasksToSave) {
      console.log("saving");
      this.setState({saving: true});
      var x = 0;
      while (x < 5) {
        await this.sleep(1000);
        x+= 1;
      }
      this.setState({saving: false});
      this.tasksToSave = false;
    } else {
      console.log("nothing to save");
    }
    setTimeout(() => this.saveTasks(), 10000);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  addTask(externalId) {
    const toDoLists = this.state.toDoLists;
    const newToDoLists = toDoLists.map((toDoList) => {
      if (toDoList.externalId == externalId) {
        const updatedTasks = toDoList.tasks.concat([
          TaskModel.create({date: this.state.date})
        ]);
        const updatedToDoList = {
          ...toDoList,
          tasks: updatedTasks
        }
        return updatedToDoList;
      }
      return toDoList;
    });
    this.setState({
      toDoLists: newToDoLists
    });
  }

  renderToDoList(toDoList) {
    return (
      <ToDoList
        key={toDoList.externalId}
        tasks={toDoList.tasks}
        updateTasks={(tasks) => this.updateTasks(toDoList.externalId, tasks)}
        addTask={() => this.addTask(toDoList.externalId)}
      />
    );
  }

  renderStandUp(lastToDoList, currentToDoList) {
    return (
      <StandUp
        lastToDoList={lastToDoList}
        currentToDoList={currentToDoList}
      />
    );
  }

  renderAutoSave() {
    if (this.state.saving) {
      return (<div>Saving</div>);
    } else {
      return;
    }
  }

  saveStandUp(toDoList) {
    var csrftoken = getCsrfToken();
    var headers = {
      "X-CSRFToken": csrftoken
    };
    var data = {
      toDoList: toDoList
    };
    console.log(data);
    axios.post("/standUp", data, { headers: headers })
    .then(function(response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const toDoLists = this.state.toDoLists;
    const currentToDoList = this.state.currentToDoList;
    const lastToDoList = toDoLists[currentToDoList - 1]
    const displayToDoList = toDoLists[currentToDoList];
    const title = displayToDoList.date.toDateString();
    const leftToggleDisabled = currentToDoList - 1 < 0
    const rightToggleDisabled = currentToDoList + 1 >= toDoLists.length;
    const autosave = this.renderAutoSave();
    return (
      <div id="crutch">
        <div className="dateToggle">
          <div
            className={"dateToggleButton" + (leftToggleDisabled ? " disabledToggle" : "")}
            onClick={() => this.toggleCurrentToDoList(-1)}
          >
            <FontAwesomeIcon icon={faCaretSquareLeft} />
          </div>
          <div className="title">{title}</div>
          <div
            className={"dateToggleButton" + (rightToggleDisabled ? " disabledToggle" : "")}
            onClick={() => this.toggleCurrentToDoList(1)}
          >
            <FontAwesomeIcon icon={faCaretSquareRight} />
          </div>
        </div>
        {this.renderToDoList(displayToDoList)}
        {this.renderStandUp(lastToDoList, displayToDoList)}
        {autosave}
      </div>
    );
  }
}

export default Crutch;