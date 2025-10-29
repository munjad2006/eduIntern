// frontend/src/components/Sidebar.js
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function Sidebar({ role }) {
  const { darkMode } = useContext(ThemeContext);
  const studentLinks = [
    "Dashboard",
    "Internships",
    "Courses",
    "Profile",
    "Settings",
  ];
  const companyLinks = [
    "Dashboard",
    "Internships",
    "Courses",
    "Profile",
    "Settings",
  ];

  const links = role === "student" ? studentLinks : companyLinks;

  const getRoute = (link) => {
    if (link === "Dashboard") return "/";
    return `/${link.toLowerCase()}`;
  };

  return (
    <aside
      style={{
        position: "fixed", // keeps sidebar in place
        left: 0,
        width: "12%",
        height: "40%",
        background: darkMode ? colors.dark : colors.light,
        color: darkMode ? colors.light : colors.dark,
        padding: "1rem",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {links.map((link, i) => (
          <li key={i} style={{ marginBottom: "1rem" }}>
            <Link
              to={getRoute(link)}
              style={{
                display: "block",
                padding: "10px 12px",
                borderRadius: "8px",
                color: darkMode ? colors.light : colors.dark,
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "0.95rem",
                letterSpacing: "0.3px",
                transition: "all 0.3s ease",
                backgroundColor: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode
                  ? "rgba(0,123,255,0.25)"
                  : "rgba(0,123,255,0.15)";
                e.target.style.color = "#007bff";
                e.target.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)";
                e.target.style.color = darkMode ? colors.light : colors.dark;
                e.target.style.transform = "translateX(0)";
              }}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
