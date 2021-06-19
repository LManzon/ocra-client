import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const NavbarBottom = (props) => {
    const { user } = props;
    return (
        <nav className="navbarbottom">

            <span className="bottomnavtext">
                <p className="creativeObjectives"> Create New Objective</p>




            </span>
        </nav>
    );
};

export default NavbarBottom;
