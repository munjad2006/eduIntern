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
    <div style={{ display: "flex", justifyContent: "space-around", marginLeft: "15%" }}>
      <Sidebar role={user.role} />
      <div
        style={{
          padding: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          margin: "1rem",
          width: "300px",
          background: darkMode ? colors.dark : colors.light,
          color: darkMode ? colors.light : colors.dark,
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <main>
          <div className="settings-page" style={{ padding: "2rem" }}>
            <section style={{ maxWidth: "400px", margin: "auto" }}>
              <h2>Settings</h2>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  <strong>Theme:</strong>
                  <ThemeToggle />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  <strong>Email Notifications:</strong>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={handleEmailNotifications}
                    style={{ marginLeft: "1rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <strong>Account:</strong>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                Logout
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
