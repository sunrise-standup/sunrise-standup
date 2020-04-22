import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./NavButtons.css";

const NavButtons = withRouter((props) => {
  let activeButton = <div></div>;
  let postButton = (
    <Link className="button is-primary is-medium navbutton" to="/post">
      <span class="has-text-weight-bold">
        <i id="videoIcon" className="fa fa-video"></i> Post
      </span>
    </Link>
  );

  let cancelButton = (
    <Link className="button is-primary is-medium navbutton" to="/">
      <span class="has-text-weight-bold">
        <i id="videoIcon" className="fa fa-arrow-circle-left"></i> Cancel
      </span>
    </Link>
  );

  // let loginButton = (
  //   <Link className="button is-primary is-medium navbutton" to="/login">
  //     <span class="has-text-weight-bold">
  //       <i id="videoIcon" className="fa fa-user"></i> Login
  //     </span>
  //   </Link>
  // );

  let { pathname } = props.location;
  switch (pathname) {
    case "/":
      activeButton = postButton;
      break;
    case "/post":
      activeButton = cancelButton;
      break;
    default:
      activeButton = postButton;
  }

  return activeButton;
});

export default NavButtons;
