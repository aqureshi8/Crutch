import React from "react";
import { useNavigate } from "react-router-dom";
import { withRouter } from "react-router";

class AuthenticatedComponent extends React.Component {
  constructor(props) {
    super(props);
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === 'false' || !isLoggedIn) {
      this.props.history.push("/login");
    }
  }
}

export default withRouter(AuthenticatedComponent);