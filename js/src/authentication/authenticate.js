import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import "src/authentication/static/styles/authenticate.css";
import { usernameExists } from 'src/authentication/authenticationRepo.js';

const Stage = {
  GetUsername: 0,
  SignUp: 1,
  Login: 2,
}
Object.freeze(Stage);

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    let pin = [];
    for (let x = 0; x < 6; x++) {
      pin.push("");
    }
    this.state = {
      username: "",
      stage: Stage.GetUsername,
      pin: pin,
    };
  }


  submitUsername() {
    if (usernameExists()) {
      this.setState({stage: Stage.Login})
    }
    return true;
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePinChange(event, index) {
    let newPin = [...this.state.pin];
    newPin[index] = event.target.value
    this.setState({pin: newPin});
  }

  renderGetUsername() {
    return (
      <div id="authenticationForm">
        <input
          name="username"
          id="username"
          type="text"
          maxLength="15"
          placeholder="Username"
          value={this.state.username}
          onChange={(event) => this.handleUsernameChange(event)}>
        </input>
        <div id="submitUsername" onClick={() => this.submitUsername()}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </div>
      </div>
    );
  }

  renderSignUp() {
    return (
      <div id="authenticationForm"></div>
    );
  }

  renderLogin() {
    let pinSubmission = [];
    for (let x = 0; x < this.state.pin.length; x++) {
      pinSubmission.push(
        <input
          type="text"
          pattern="\d"
          maxLength="1"
          key={x}
          value={this.state.pin[x]}
          onChange={(event) => this.handlePinChange(event, x)}/>
      );
    }
    return (
      <div id="authenticationForm">
        {pinSubmission}
      </div>
    );
  }

  render() {
    let authenticationForm;
    switch (this.state.stage) {
      case Stage.GetUsername:
        authenticationForm = this.renderGetUsername();
        break;
      case Stage.SignUp:
        authenticationForm = this.renderSignUp();
        break;
      case Stage.Login:
        authenticationForm = this.renderLogin();
        break;
    }
    return (
      authenticationForm
    );
  }
}

export default Authenticate;