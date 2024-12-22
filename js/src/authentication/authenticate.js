import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import "src/authentication/static/styles/authenticate.css";
import { login, usernameExists } from 'src/authentication/authenticationRepo.js';

const Stage = {
  GetUsername: 0,
  SignUp: 1,
  Login: 2,
}
Object.freeze(Stage);

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    let pinNumbers = [];
    for (let x = 0; x < 6; x++) {
      pinNumbers.push("");
    }
    this.state = {
      username: "",
      stage: Stage.GetUsername,
      pinNumbers: pinNumbers,
    };
    this.initialInputRef = React.createRef();
  }

  componentDidMount() {
    if (this.initialInputRef.current) {
      this.initialInputRef.current.focus();
    }
  }

  submitUsername() {
    if (usernameExists(this.state.username)) {
      this.setState({stage: Stage.Login})
    }
    return true;
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleUsernameKeyUp(event) {
    if (event.keyCode === 13) {
      this.submitUsername();
    }
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
          onChange={(event) => this.handleUsernameChange(event)}
          onKeyUp={(event) => this.handleUsernameKeyUp(event)}
          ref={this.initialInputRef}
        />
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


  handlePinChange(event, index, nextPinBoxRef) {
    let newPinNumbers = [...this.state.pinNumbers];
    newPinNumbers[index] = event.target.value
    this.setState({pinNumbers: newPinNumbers});
    if (nextPinBoxRef.current != null) {
      if (newPinNumbers[index] != "") {
        nextPinBoxRef.current.focus();
      }
    } else {
      this.submitPin(newPinNumbers);
    }
  }

  submitPin(pinNumbers) {
    let pinCode = pinNumbers.join('');
    console.log(pinCode);
    if (login(this.state.username, pinCode)) {
      console.log("LOGGED IN");
    }
  }

  renderLogin() {
    let pinSubmission = [];
    let refs = [];
    for (let x = 0; x < this.state.pinNumbers.length; x++) {
      refs.push(React.createRef());
      pinSubmission.push(
        <input
          name={"pinbox-" + x}
          className="pinbox"
          type="text"
          pattern="\d"
          maxLength="1"
          key={x}
          value={this.state.pinNumbers[x]}
          onChange={(event) => this.handlePinChange(event, x, refs[x])}
          ref={x > 0 ? refs[x-1] : null}
        />
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