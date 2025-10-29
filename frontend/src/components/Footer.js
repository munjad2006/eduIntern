import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  const accent = darkMode ? "#9ecbff" : "#007bff";

  const linkStyle = {
    color: accent,
    textDecoration: "none",
    fontSize: "0.9rem",
    transition: "color 0.25s ease, transform 0.25s ease",
    fontWeight: "500",
  };

  const linkHover = (e, enter) => {
    e.target.style.color = enter
      ? darkMode
        ? "#66b2ff"
        : "#0056b3"
      : accent;
    e.target.style.transform = enter ? "translateX(4px)" : "translateX(0)";
  };

  const sectionTitle = {
    fontWeight: "700",
    fontSize: "1.15rem",
    marginBottom: "1rem",
    color: darkMode ? "#fff" : "#222",
    borderBottom: `2px solid ${accent}33`,
    paddingBottom: "6px",
    letterSpacing: "0.4px",
  };

  const sectionLinks = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  return (
    <footer
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #1f1f1f, #151515, #0b0b0b)"
          : "linear-gradient(135deg, #f5f9ff, #f0f4ff, #ffffff)",
        padding: "3rem 1.5rem 1.5rem",
        borderTop: `1px solid ${darkMode ? "#2a2a2a" : "#e5e5e5"}`,
        marginTop: "3rem",
        color: darkMode ? "#ccc" : "#555",
        transition: "all 0.3s ease",
      }}
    >
      {/* Upper Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "2rem",
          textAlign: "left",
          maxWidth: "1200px",
          margin: "0 auto 2rem auto",
        }}
      >
        {[
          {
            title: "Browse by Subject",
            links: [
              ["Computer Science", "/subject/cs"],
              ["Psychology", "/subject/psychology"],
              ["Web Development", "/subject/web-development"],
              ["Health", "/subject/health"],
              ["Law", "/subject/law"],
            ],
          },
          {
            title: "Browse by Provider",
            links: [
              ["Coursera", "/provider/coursera"],
              ["Udemy", "/provider/udemy"],
              ["edX", "/provider/edx"],
              ["LinkedIn Learning", "/provider/linkedin-learning"],
              ["freeCodeCamp", "/provider/freecodecamp"],
            ],
          },
          {
            title: "Universities",
            links: [
              ["Harvard", "/university/harvard"],
              ["Stanford", "/university/stanford"],
              ["IIT Madras", "/university/iitm"],
              ["University of Michigan", "/university/umich"],
            ],
          },
          {
            title: "About",
            links: [
              ["About EdIntern", "/about"],
              ["Contact", "/contact"],
              ["Help Center", "/help"],
              ["Privacy Policy", "/privacy"],
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 style={sectionTitle}>{section.title}</h4>
            <div style={sectionLinks}>
              {section.links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  style={linkStyle}
                  onMouseEnter={(e) => linkHover(e, true)}
                  onMouseLeave={(e) => linkHover(e, false)}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h4 style={sectionTitle}>Follow Us</h4>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "0.5rem",
            }}
          >
            {["Facebook", "Twitter", "LinkedIn", "YouTube"].map((platform) => (
              <a
                key={platform}
                href={`https://${platform.toLowerCase()}.com`}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => linkHover(e, true)}
                onMouseLeave={(e) => linkHover(e, false)}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          borderTop: `1px solid ${darkMode ? "#2a2a2a" : "#e5e5e5"}`,
          paddingTop: "1rem",
          textAlign: "center",
          fontSize: "0.9rem",
          color: darkMode ? "#aaa" : "#666",
        }}
      >
        <p style={{ margin: 0, letterSpacing: "0.3px" }}>
          © {new Date().getFullYear()} <strong>EdIntern</strong>. All rights reserved.
        </p>
        <p style={{ marginTop: "0.4rem" }}>
          {["About", "Contact", "Privacy Policy"].map((label, idx) => (
            <React.Fragment key={label}>
              <a
                href={`/${label.toLowerCase().replace(" ", "-")}`}
                style={linkStyle}
                onMouseEnter={(e) => linkHover(e, true)}
                onMouseLeave={(e) => linkHover(e, false)}
              >
                {label}
              </a>
              {idx < 2 && " | "}
            </React.Fragment>
          ))}
        </p>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          backgroundColor: accent,
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          cursor: "pointer",
          fontSize: "1.4rem",
          boxShadow: darkMode
            ? "0 4px 12px rgba(0, 123, 255, 0.3)"
            : "0 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
          e.currentTarget.style.boxShadow = darkMode
            ? "0 6px 16px rgba(0, 123, 255, 0.5)"
            : "0 6px 16px rgba(0, 0, 0, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = darkMode
            ? "0 4px 12px rgba(0, 123, 255, 0.3)"
            : "0 4px 10px rgba(0, 0, 0, 0.2)";
        }}
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
