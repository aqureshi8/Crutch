import React from 'react';
import StandUp from 'src/standUp/standUp';
import StandUpModel from 'src/standUp/models/standUpModel';
import { v4 as uuidv4 } from 'uuid';
import 'src/crutch/static/styles/crutch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-regular-svg-icons';

class Crutch extends React.Component {
  constructor(props) {
    super(props);
    const standUps = this.loadStandUps();
    const currentStandUp = standUps.length - 1;
    this.state = {
      standUps: standUps,
      currentStandUp: currentStandUp
    }
  }

  loadStandUps() {
    //LOAD LAST 10 Stand ups
    let standUps = [];
    for(var x = 9; x > 0; x--) {
      const xDaysAgo = new Date();
      xDaysAgo.setDate(new Date().getDate() - x);
      const standUp = new StandUpModel({date: xDaysAgo});
      standUps.push(standUp);
    }
    //Current standup
    standUps = standUps.concat([new StandUpModel()]);
    return standUps;
  }

  toggleCurrentStandup(count) {
    let currentStandUp = this.state.currentStandUp;
    this.setState({
      currentStandUp: currentStandUp + count
    });
  }

  renderStandUp(standUp) {
    return (
      <StandUp
        key={standUp.id}
        model={standUp}
      />
    );
  }

  render() {
    const standUps = this.state.standUps;
    const currentStandUp = this.state.currentStandUp;
    const displayStandUp = standUps[currentStandUp];
    const title = displayStandUp.date.toDateString();
    const leftToggleDisabled = currentStandUp - 1 < 0
    const rightToggleDisabled = currentStandUp + 1 >= standUps.length;
    return (
      <div className="crutch">
        <div className="dateToggle">
          <div
            className={"dateToggleButton" + (leftToggleDisabled ? " disabledToggle" : "")}
            onClick={() => this.toggleCurrentStandup(-1)}
          >
            <FontAwesomeIcon icon={faCaretSquareLeft} />
          </div>
          <div className="title">{title}</div>
          <div
            className={"dateToggleButton" + (rightToggleDisabled ? " disabledToggle" : "")}
            onClick={() => this.toggleCurrentStandup(1)}
          >
            <FontAwesomeIcon icon={faCaretSquareRight} />
          </div>
        </div>
        {this.renderStandUp(displayStandUp)}
      </div>
    );
  }
}

export default Crutch;