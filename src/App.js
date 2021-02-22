import React from 'react';
import "src/static/style.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StandUp from "src/standUp/standUp";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="menu">
            <div className="appName">Crutch!</div>
            <div className="appDescription">It helps you Stand Up</div>
          </div>
          <Switch>
            <Route path="/" exact component={StandUp} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;