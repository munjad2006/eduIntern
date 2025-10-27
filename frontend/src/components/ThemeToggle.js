import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        padding: "8px 12px",
        background: darkMode ? colors.light : colors.dark,
        color: darkMode ? colors.dark : colors.light,
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginLeft: "1rem",
      }}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
