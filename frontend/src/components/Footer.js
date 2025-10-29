import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  const linkStyle = {
    color: darkMode ? "#9ecbff" : "#007bff",
    textDecoration: "none",
    fontSize: "0.9rem",
  };

  const sectionTitle = {
    fontWeight: "bold",
    fontSize: "1rem",
    marginBottom: "0.5rem",
    color: darkMode ? "#fff" : "#333",
  };

  const sectionLinks = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  return (
    <footer
      style={{
        background: darkMode ? colors.dark : colors.light,
        padding: "2rem 1rem",
        
        borderTop: `1px solid ${darkMode ? "#2a2a2a" : "#e5e5e5"}`,
        marginTop: "1rem",
        color: darkMode ? "#ccc" : "#555",
      }}
    >
      {/* Upper Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1.5rem",
          textAlign: "left",
          maxWidth: "1100px",
          margin: "0 auto 1.5rem auto",
        }}
      >
        <div>
          <h4 style={sectionTitle}>Browse by Subject</h4>
          <div style={sectionLinks}>
            <a href="/subject/cs" style={linkStyle}>Computer Science</a>
            <a href="/subject/psychology" style={linkStyle}>Psychology</a>
            <a href="/subject/web-development" style={linkStyle}>Web Development</a>
            <a href="/subject/health" style={linkStyle}>Health</a>
            <a href="/subject/law" style={linkStyle}>Law</a>
          </div>
        </div>

        <div>
          <h4 style={sectionTitle}>Browse by Provider</h4>
          <div style={sectionLinks}>
            <a href="/provider/coursera" style={linkStyle}>Coursera</a>
            <a href="/provider/udemy" style={linkStyle}>Udemy</a>
            <a href="/provider/edx" style={linkStyle}>edX</a>
            <a href="/provider/linkedin-learning" style={linkStyle}>LinkedIn Learning</a>
            <a href="/provider/freecodecamp" style={linkStyle}>freeCodeCamp</a>
          </div>
        </div>

        <div>
          <h4 style={sectionTitle}>Universities</h4>
          <div style={sectionLinks}>
            <a href="/university/harvard" style={linkStyle}>Harvard</a>
            <a href="/university/stanford" style={linkStyle}>Stanford</a>
            <a href="/university/iitm" style={linkStyle}>IIT Madras</a>
            <a href="/university/umich" style={linkStyle}>University of Michigan</a>
          </div>
        </div>

        <div>
          <h4 style={sectionTitle}>About</h4>
          <div style={sectionLinks}>
            <a href="/about" style={linkStyle}>About EdIntern</a>
            <a href="/contact" style={linkStyle}>Contact</a>
            <a href="/help" style={linkStyle}>Help Center</a>
            <a href="/privacy" style={linkStyle}>Privacy Policy</a>
          </div>
        </div>

        <div>
          <h4 style={sectionTitle}>Follow Us</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>YouTube</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          borderTop: `1px solid ${darkMode ? "#2a2a2a" : "#e5e5e5"}`,
          paddingTop: "1rem",
          textAlign: "center",
          fontSize: "0.85rem",
          color: darkMode ? "#aaa" : "#666",
        }}
      >
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} EdIntern. All rights reserved.
        </p>
        <p style={{ marginTop: "0.3rem" }}>
          <a href="/about" style={linkStyle}>About</a> |{" "}
          <a href="/contact" style={linkStyle}>Contact</a> |{" "}
          <a href="/privacy" style={linkStyle}>Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
