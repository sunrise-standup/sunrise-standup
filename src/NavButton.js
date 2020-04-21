import React from "react";
import { Link } from "react-router-dom";

const NavButton = (props) => {
  return (
    <Link className="button is-primary is-medium" to={props.path}>
      <span class="has-text-weight-bold">
        <i id="videoIcon" className={props.icon}></i> {props.text}
      </span>
    </Link>
  );
};

export default NavButton;
