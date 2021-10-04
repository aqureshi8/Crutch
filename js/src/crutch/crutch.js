import React from 'react';
import ToDoList from 'src/toDoList/toDoList';
import ToDoListModel from 'src/toDoList/models/toDoListModel';
import { v4 as uuidv4 } from 'uuid';
import 'src/crutch/static/styles/crutch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-regular-svg-icons';
import Task from 'src/toDoList/task';
import TaskModel from "src/toDoList/models/taskModel.js";
import StandUp from "src/crutch/standUp.js";


class Crutch extends React.Component {
  constructor(props) {
    super(props);
    const toDoLists = this.loadToDoLists();
    const currentToDoList = toDoLists.length - 1;
    this.state = {
      toDoLists: toDoLists,
      currentToDoList: currentToDoList
    }
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

  updateTasks(id, tasks) {
    const toDoLists = this.state.toDoLists;
    const newToDoLists = toDoLists.map((toDoList) => {
      if (toDoList.id == id) {
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
  }

  addTask(id) {
    const toDoLists = this.state.toDoLists;
    const newToDoLists = toDoLists.map((toDoList) => {
      if (toDoList.id == id) {
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
        key={toDoList.id}
        tasks={toDoList.tasks}
        updateTasks={(tasks) => this.updateTasks(toDoList.id, tasks)}
        addTask={() => this.addTask(toDoList.id)}
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

  render() {
    const toDoLists = this.state.toDoLists;
    const currentToDoList = this.state.currentToDoList;
    const lastToDoList = toDoLists[currentToDoList - 1]
    const displayToDoList = toDoLists[currentToDoList];
    const title = displayToDoList.date.toDateString();
    const leftToggleDisabled = currentToDoList - 1 < 0
    const rightToggleDisabled = currentToDoList + 1 >= toDoLists.length;
    return (
      <div className="crutch">
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
      </div>
    );
  }
}

export default Crutch;