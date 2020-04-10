import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img
            id="logo"
            src="logo.png"
            alt="Grab a cup and let's go"
            height="85"
          />
        </a>
      </div>
      <div className="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <Link class="button is-primary" to="/post">
                <strong>
                  <i id="videoIcon" class="fa fa-video"></i> Post Update
                </strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
