import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

const Settings = () => {
  const { darkMode } = useContext(ThemeContext);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [emailNotifications, setEmailNotifications] = useState(
    localStorage.getItem("emailNotifications") === "true"
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have been logged out.");
    navigate("/login");
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    localStorage.setItem("theme", e.target.value);
  };

  const handleEmailNotifications = (e) => {
    setEmailNotifications(e.target.checked);
    localStorage.setItem("emailNotifications", e.target.checked);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginLeft: "15%",
        minHeight: "100vh",
        background: darkMode ? "#121212" : "#f4f5f7",
        transition: "background 0.3s ease",
      }}
    >
      <Sidebar role={user.role} />

      <div
        style={{
          flex: 1,
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <main
          style={{
            background: darkMode ? colors.dark : colors.light,
            color: darkMode ? colors.light : colors.dark,
            borderRadius: "12px",
            padding: "2rem",
            width: "100%",
            maxWidth: "500px",
            boxShadow: darkMode
              ? "0 4px 15px rgba(255,255,255,0.1)"
              : "0 4px 15px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              borderBottom: darkMode
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid rgba(0,0,0,0.1)",
              paddingBottom: "0.5rem",
            }}
          >
            Settings
          </h2>

          <div style={{ marginBottom: "1.5rem" }}>
            <label>
              <strong>Theme:</strong>
              <div style={{ marginTop: "0.5rem" }}>
                <ThemeToggle />
              </div>
            </label>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label>
              <strong>Email Notifications:</strong>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={handleEmailNotifications}
                style={{
                  marginLeft: "1rem",
                  transform: "scale(1.3)",
                  cursor: "pointer",
                }}
              />
            </label>
          </div>

          <div
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              borderRadius: "8px",
              background: darkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
            }}
          >
            <strong>Account Details</strong>
            <p style={{ margin: "6px 0" }}>Name: {user.name || "N/A"}</p>
            <p style={{ margin: "6px 0" }}>Email: {user.email || "N/A"}</p>
            <p style={{ margin: "6px 0" }}>Role: {user.role || "N/A"}</p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ff4d4d",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#ff3333";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#ff4d4d";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Logout
          </button>
        </main>
      </div>
    </div>
  );
};

export default Settings;
