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
        background: darkMode ? colors.dark : colors.light,
        color: darkMode ? colors.light : colors.dark,
        padding: "1rem",
        minHeight: "100vh",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link, i) => (
          <li key={i} style={{ marginBottom: "1rem" }}>
            <Link
              to={getRoute(link)}
              style={{
                color: darkMode ? colors.light : colors.dark,
                textDecoration: "none",
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
