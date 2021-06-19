import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./_nav.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container" style={{ marginLeft: -30 }}>
        <a className="btn noHover abtn" href="#">
          Task
        </a>

        <ul className="navbar-nav mr">
          <li className="nav-item">
            <NavLink className="nav-link btn noHover homebtn" exact to="/">
              Home
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
