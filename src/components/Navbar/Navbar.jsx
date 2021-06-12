import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  const { user } = props;
  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        {CONSTS.CAPITALIZED_APP}
      </Link>

      <div className="nav__authLinks">
        {props.user ? (
          <>
            <div>
              <p style={{ color: "white" }}>{user.name}</p>
              <img
                src={user.profilePic}
                width="50px"
                alt={`Profile picture for ${user.name}`}
              />
            </div>

            <Link to={PATHS.PROFILE_PAGE} className="authLink">
              Edit Profile
            </Link>
            {/* <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link> */}
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
