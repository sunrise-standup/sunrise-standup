import React from "react";
import "./Nav.css";
import NavButtons from "./NavButtons";

const Nav = (props) => {
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
      <div className="navbar-menu is-paddingless">
        <div className="navbar-end">
          <div className="navbar-item">
            <NavButtons></NavButtons>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
