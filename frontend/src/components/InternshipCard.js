import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function InternshipCard({ internship }) {
  const { darkMode } = useContext(ThemeContext);
  if (!internship) return null;

  const {
    _id,
    activelyHiring = false,
    title = "No title",
    companyWebsite = "Unknown company",
    workType = "Home",
    startImmediately = true,
    duration = "",
    stipend = "",
  } = internship;

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#f5f5f5" : "#222",
        borderRadius: "12px",
        boxShadow: darkMode
          ? "0 4px 12px rgba(255, 255, 255, 0.05)"
          : "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "1.2rem",
        width: "300px",
        margin: "1rem",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = darkMode
          ? "0 6px 18px rgba(255, 255, 255, 0.1)"
          : "0 6px 18px rgba(0, 0, 0, 0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = darkMode
          ? "0 4px 12px rgba(255, 255, 255, 0.05)"
          : "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
    >
      <p
        style={{
          color: activelyHiring ? "#28a745" : "#dc3545",
          fontWeight: "600",
          marginBottom: "8px",
        }}
      >
        {activelyHiring ? "Actively Hiring" : "Not Hiring"}
      </p>

      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          marginBottom: "6px",
          lineHeight: "1.3",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#007bff",
          fontWeight: "500",
          fontSize: "0.95rem",
          marginBottom: "10px",
        }}
      >
        {companyWebsite}
      </p>

      <div style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
        <p>💼 <strong>Work Type:</strong> {workType}</p>
        <p>🕒 <strong>Start:</strong> {startImmediately ? "Immediately" : internship.startDate}</p>
        <p>📅 <strong>Duration:</strong> {duration || "N/A"}</p>
        <p>💰 <strong>Stipend:</strong> {stipend || "Not specified"}</p>
      </div>

      <Link
        to={`/internship/${_id}`}
        style={{
          display: "inline-block",
          marginTop: "1.2rem",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          padding: "10px 18px",
          borderRadius: "6px",
          fontSize: "0.95rem",
          fontWeight: "500",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#0056b3";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#007bff";
          e.target.style.transform = "scale(1)";
        }}
      >
        View More
      </Link>
    </div>
  );
}

export default InternshipCard;
