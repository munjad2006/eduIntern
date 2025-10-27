import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

const Footer = () => {
    const { darkMode } = useContext(ThemeContext);
  return (
    <footer
      style={{
        background: darkMode ? colors.dark : colors.light,
        padding: "1rem 0",
        textAlign: "center",
        borderTop: "1px solid darkMode ? #1e1e1e : #f1f1f1",
        marginTop: "0.3rem",
      }}
    >
      <p style={{ margin: 0, color: darkMode ? "#f1f1f1" : "#555", fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} EdIntern. All rights reserved.
      </p>
      <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", color: "#777" }}>
        <a
          href="/about"
          style={{ color: "#007bff", textDecoration: "none", marginRight: "10px" }}
        >
          About
        </a>
        |
        <a
          href="/contact"
          style={{ color: "#007bff", textDecoration: "none", marginLeft: "10px" }}
        >
          Contact
        </a>
      </p>
    </footer>
  );
};

export default Footer;
