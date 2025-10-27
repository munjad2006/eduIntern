import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";
import logo from '../assets/logo.png';

function Navbar() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <nav
      style={{
        position: "sticky", // makes it stick
        top: 0, // sticks to the top
        zIndex: 1000,
        background: darkMode ? colors.dark : colors.light,
        color: darkMode ? colors.light : colors.dark,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1.5rem",
        marginBottom: "0.3rem",
      }}
    >
      <Link
        to="/"
        style={{
          color: darkMode ? colors.light : colors.dark,
          textDecoration: "none",
        }}
      >

        <img src={logo} alt="Logo" style={{ height: '4rem', verticalAlign: 'middle' }}/>
      </Link>
      <Link
        to="/"
        style={{
          color: darkMode ? colors.light : colors.dark,
          textDecoration: "none",
        }}
      >
        Home
      </Link>
      <Link
        to="/about"
        style={{
          color: darkMode ? colors.light : colors.dark,
          textDecoration: "none",
        }}
      >
        About
      </Link>
      {/* <Link
        to="/register"
        style={{
          color: darkMode ? colors.light : colors.dark,
          textDecoration: "none",
        }}
      >
        Register
      </Link>
      <Link
        to="/login"
        style={{
          color: darkMode ? colors.light : colors.dark,
          textDecoration: "none",
        }}
      >
        Login
      </Link> */}
    </nav>
  );
}

export default Navbar;
