import React from 'react';
import StandUp from 'src/standUp/standUp';
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
    //Current standup
    standUps = standUps.concat([
      <StandUp date={new Date(Date.now())}/>
    ]);
    return standUps;
  }

  render() {
    const standUps = this.state.standUps;
    const displayStandUp = standUps[this.state.currentStandUp];
    const title = displayStandUp.props.date.toDateString();
    return (
      <div className="crutch">
        <div className="dateToggle">
          <div className="dateToggleButton">
            <FontAwesomeIcon icon={faCaretSquareLeft} />
          </div>
          <div className="title">{title}</div>
          <div className="dateToggleButton">
            <FontAwesomeIcon icon={faCaretSquareRight} />
          </div>
        </div>
        {displayStandUp}
      </div>
    );
  }
}

export default Crutch;