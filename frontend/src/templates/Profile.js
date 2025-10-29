import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import colors from "../Color";
import { ThemeContext } from "../context/ThemeContext";

const Profile = () => {
  const { darkMode } = useContext(ThemeContext);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have been logged out.");
    navigate("/login");
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
            Your Profile
          </h2>

          <section
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              borderRadius: "8px",
              background: darkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
            }}
          >
            <p style={{ margin: "8px 0" }}>
              <strong>Name:</strong> {user.name || "N/A"}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Email:</strong> {user.email || "N/A"}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Role:</strong> {user.role || "N/A"}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Joined On:</strong>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Not available"}
            </p>
          </section>

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

          {/* FAQ / About Section */}
          <section
            style={{
              marginTop: "2rem",
              borderTop: darkMode
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.1)",
              paddingTop: "1.5rem",
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
              Quick FAQs
            </h3>
            <details
              style={{
                marginBottom: "1rem",
                background: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                padding: "0.8rem",
                borderRadius: "8px",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "600" }}>
                How can I update my details?
              </summary>
              <p style={{ marginTop: "0.5rem" }}>
                Profile editing will be available in a future update. For now,
                please contact your admin or support team.
              </p>
            </details>

            <details
              style={{
                marginBottom: "1rem",
                background: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                padding: "0.8rem",
                borderRadius: "8px",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "600" }}>
                How do I change my password?
              </summary>
              <p style={{ marginTop: "0.5rem" }}>
                Password changes can be made from the “Account Settings” section
                (coming soon).
              </p>
            </details>

            <details
              style={{
                background: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                padding: "0.8rem",
                borderRadius: "8px",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "600" }}>
                Need help or support?
              </summary>
              <p style={{ marginTop: "0.5rem" }}>
                You can reach out to our support team via email or the help
                section in the dashboard.
              </p>
            </details>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
