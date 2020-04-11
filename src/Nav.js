import React from "react";
import { withRouter } from "react-router-dom";
import "./Nav.css";
import NavButton from "./NavButton";

const Nav = withRouter((props) => {
  let { pathname } = props.location;
  let buttonProps;

  if (pathname === "/") {
    buttonProps = { path: "/post", icon: "fa fa-video", text: "Post" };
  } else {
    buttonProps = {
      path: "/",
      icon: "fa fa-arrow-circle-left",
      text: "Cancel",
    };
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img
            id="logo"
            src="logo.png"
            alt="Grab a cup and let's go"
            height="85"
          />
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <NavButton
              path={buttonProps.path}
              icon={buttonProps.icon}
              text={buttonProps.text}
            ></NavButton>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Nav;
