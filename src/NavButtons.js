import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./NavButtons.css";

const NavButtons = ({ user }) => {
  const userCanPost = user && user.isAdmin;

  if (userCanPost) {
    return (
      <div>
        <Switch>
          <Route path="/" exact>
            <Link className="button is-primary is-medium navbutton" to="/post">
              <span className="has-text-weight-bold">
                <i id="videoIcon" className="fa fa-video"></i> Post
              </span>
            </Link>
          </Route>
          <Route path="/map" exact>
            <Link className="button is-primary is-medium navbutton" to="/post">
              <span className="has-text-weight-bold">
                <i id="videoIcon" className="fa fa-video"></i> Post
              </span>
            </Link>
          </Route>
          <Route path="/post" exact>
            <Link className="button is-primary is-medium navbutton" to="/">
              <span className="has-text-weight-bold">
                <i id="videoIcon" className="fa fa-arrow-circle-left"></i>{" "}
                Cancel
              </span>
            </Link>
          </Route>
        </Switch>
        <a href="logout" className="button is-secondary is-medium navbutton">
          <span className="has-text-weight-bold">
            <i id="videoIcon" className="fa fa-user"></i> Log Out
          </span>
        </a>
      </div>
    );
  } else {
    return (
      <a className="button is-primary is-medium navbutton" href="login">
        <span className="has-text-weight-bold">
          <i id="videoIcon" className="fa fa-user"></i> Login
        </span>
      </a>
    );
  }
};

export default NavButtons;
