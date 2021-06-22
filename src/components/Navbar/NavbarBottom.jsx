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
                <h1 className="creativeObjectives">+</h1>


                <span class="material-icons-outlined">

                </span>

            </span>
        </nav>
    );
};

export default NavbarBottom;
