import React from "react";
import { Link } from "react-router-dom";

const NavButton = (props) => {
  return (
    <Link className="button is-primary" to={props.path}>
      <strong>
        <i id="videoIcon" className={props.icon}></i> {props.text}
      </strong>
    </Link>
  );
};

export default NavButton;
