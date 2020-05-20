import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import NavButtons from "./NavButtons";
import LoginButton from "./LoginButton";

const Nav = ({ user }) => {
  // menuActive controls whether or not the menu is shown
  // it's value is toggled when the hamburger icon is clicked on
  const [menuActive, setMenuActive] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            id="logo"
            src="logo.png"
            alt="Grab a cup and let's go"
            height="85"
          />
        </Link>
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
              <LoginButton user={user}></LoginButton>
              <NavButtons user={user}></NavButtons>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
