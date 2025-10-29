import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        padding: "8px 14px",
        background: darkMode ? colors.light : colors.dark,
        color: darkMode ? colors.dark : colors.light,
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginLeft: "1rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: darkMode
          ? "0 2px 5px rgba(255,255,255,0.1)"
          : "0 2px 5px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.opacity = "0.9";
      }}
      onMouseOut={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.opacity = "1";
      }}
    >
      <span>{darkMode ? "☀️" : "🌙"}</span>
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
