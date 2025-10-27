import React, { useState,useContext } from "react";
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
    navigate("/login"); // redirect to login page
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
            <h2>Your Profile</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>

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

export default Profile;
