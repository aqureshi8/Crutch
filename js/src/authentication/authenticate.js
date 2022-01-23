import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import "src/authentication/static/styles/authenticate.css";


class Authenticate extends React.Component {

  submitUsername() {
    console.log("username submitted");
    return true;
  }

  render() {
    return (
      <div id="username">
        <input type="text" placeholder="Username"></input>
        <div className="submitUsername" onClick={() => this.submitUsername()}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </div>
      </div>
    );
  }
}

export default Authenticate;