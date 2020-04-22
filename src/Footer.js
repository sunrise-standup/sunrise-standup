import React from "react";
import "./Footer.css";
import NavButtons from "./NavButtons";

const Footer = () => {
  return (
    <footer id="footer" className="has-background-primary has-text-centered">
      <div className="is-hidden-tablet">
        <NavButtons></NavButtons>
      </div>
    </footer>
  );
};

export default Footer;
