import React from 'react';
import "src/static/style.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Crutch from "src/crutch/crutch";
import Authenticate from "src/authentication/authenticate";
import { logout } from "src/authentication/authenticationRepo.js";

class App extends React.Component {
  renderAccountAction() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === 'true') {
      return (
        <a id="authenticateLink" href="/authenticate" onClick={() => logout()}>
          <div className="authenticate">Logout</div>
        </a>
      );
    } else {
      return (
        <a id="authenticateLink" href="/authenticate">
          <div className="authenticate">Login</div>
        </a>
      );
    }
  }

  render() {
    var accountAction = this.renderAccountAction();
    return (
      <Router>
        <div className="App">
          <div className="menu">
            <div className="appName">Crutch!</div>
            <div className="appDescription">It helps you Stand Up</div>
            {accountAction}
          </div>
          <div id="content">
            <Switch>
              <Route path="/" exact component={Crutch} />
              <Route path="/authenticate" exact component={Authenticate} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;