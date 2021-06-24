import React from "react";
import "./Navbar.css";

const NavbarBottom = (props) => {
  const { user } = props;
  return (
    <nav className="navbarbottom">
      <span className="bottomnavtext">
        <h1 className="creativeObjectives">+</h1>

        <span class="material-icons-outlined"></span>
      </span>
    </nav>
  );
};

export default NavbarBottom;
