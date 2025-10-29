import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";
import logo from "../assets/logo.png";

function Navbar({ user }) {
  const { darkMode } = useContext(ThemeContext);

  // user initial (fallback = "U")
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "👤";

  // Navbar container
  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: darkMode ? colors.dark : colors.light,
    color: darkMode ? colors.light : colors.dark,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.8rem 2rem",
    boxShadow: darkMode
      ? "0 2px 6px rgba(255,255,255,0.1)"
      : "0 2px 6px rgba(0,0,0,0.1)",
    transition: "background 0.3s ease",
  };

  // Nav links container
  const linkContainer = {
    display: "flex",
    alignItems: "center",
    gap: "1.8rem",
  };

  // Each link
  const linkStyle = {
    position: "relative",
    textDecoration: "none",
    color: darkMode ? colors.light : colors.dark,
    fontSize: "1rem",
    fontWeight: "500",
    padding: "6px 0",
    transition: "all 0.25s ease",
  };

  // Hover underline
  const underlineStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "2px",
    width: "0%",
    background: "#007bff",
    transition: "width 0.3s ease",
  };

  // Hover handlers
  const handleMouseEnter = (e) => {
    const underline = e.currentTarget.querySelector(".underline");
    underline.style.width = "100%";
    e.currentTarget.style.color = "#007bff";
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const handleMouseLeave = (e) => {
    const underline = e.currentTarget.querySelector(".underline");
    underline.style.width = "0%";
    e.currentTarget.style.color = darkMode ? colors.light : colors.dark;
    e.currentTarget.style.transform = "translateY(0)";
  };

  // Profile button
  const profileStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: darkMode ? "#007bff33" : "#007bff1a",
    color: "#007bff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    userSelect: "none",
    transition: "all 0.3s ease",
  };

  // Click 3D effect
  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = "scale(0.95)";
  };
  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <nav style={navStyle}>
      {/* ---- LEFT: LOGO ---- */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "3.5rem",
            verticalAlign: "middle",
            filter: darkMode ? "brightness(1.2)" : "none",
          }}
        />
      </Link>

      {/* ---- MIDDLE: NAV LINKS ---- */}
      <div style={linkContainer}>
        {["Home", "About", "Blog", "Contact", "Support"].map((text, i) => (
          <Link
            key={i}
            to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {text}
            <span className="underline" style={underlineStyle}></span>
          </Link>
        ))}
      </div>

      {/* ---- RIGHT: PROFILE ---- */}
      <Link
        to="/profile"
        style={profileStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = darkMode
            ? "#007bff55"
            : "#007bff22";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = darkMode
            ? "#007bff33"
            : "#007bff1a";
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {userInitial}
      </Link>
    </nav>
  );
}

export default Navbar;
