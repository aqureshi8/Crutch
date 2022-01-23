import React from 'react';
import "src/static/style.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Crutch from "src/crutch/crutch";
import Authenticate from "src/authentication/authenticate";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="menu">
            <div className="appName">Crutch!</div>
            <div className="appDescription">It helps you Stand Up</div>
            <a id="authenticateLink" href="/authenticate">
              <div className="authenticate">Login</div>
            </a>
          </div>
          <Switch>
            <Route path="/" exact component={Crutch} />
            <Route path="/authenticate" exact component={Authenticate} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;