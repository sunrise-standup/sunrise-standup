import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./NavButtons.css";

const NavButtons = ({ user }) => {
  const userCanPost = user && user.isAdmin;

  // The menu icon for post is only displayed if the user is logged in
  // and is a member of the admin role
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
      </div>
    );
  } else return null;
};

export default NavButtons;
