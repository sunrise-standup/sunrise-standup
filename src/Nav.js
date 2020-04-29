import React, { useState } from "react";
import "./Nav.css";
import NavButtons from "./NavButtons";

const Nav = ({ user }) => {
  const [menuActive, setMenuActive] = useState(false);

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
        <button
          id="burger"
          className="button navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setMenuActive(!menuActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className={"navbar-menu " + (menuActive ? "is-active" : "")}>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <NavButtons user={user}></NavButtons>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
