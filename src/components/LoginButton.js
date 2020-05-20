import React from "react";

const LoginButton = ({ user }) => {
  const loginButton = (
    <a className="button is-primary is-medium navbutton" href="login">
      <span className="has-text-weight-bold">
        <i id="videoIcon" className="fa fa-user"></i> Login
      </span>
    </a>
  );

  const logoutButton = (
    <a href="logout" className="button is-secondary is-medium navbutton">
      <span className="has-text-weight-bold">
        <i id="videoIcon" className="fa fa-user"></i> Log Out
      </span>
    </a>
  );

  if (user.isLoggedIn) {
    return logoutButton;
  } else {
    return loginButton;
  }
};

export default LoginButton;
