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
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "1rem",
        margin: "0.5rem",
        width: "280px",
        backgroundColor: darkMode ? colors.dark : colors.light,
        color: darkMode ? colors.light : colors.dark,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
      }}
    >
      <p>
        <strong>{activelyHiring ? "Actively Hiring" : "Not Hiring"}</strong>
      </p>
      <h3>{title}</h3>
      <p>{companyWebsite}</p>
      <p>Work Type: {workType}</p>
      <p>Start: {startImmediately ? "Immediately" : internship.startDate}</p>
      <p>Duration: {duration}</p>
      <p>Stipend: {stipend}</p>
      <Link
        to={`/internship/${_id}`}
        style={{
          marginTop: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        View More
      </Link>
    </div>
  );
}

export default InternshipCard;

//           <p>Stipend: {stipend}</p>
//           <p>Apply By: {applyEndDate}</p>
//           <p>About Company: {aboutCompany}</p>
//           <p>Skills Required: {skillRequired}</p>
//           <p>Certificates: {certificates}</p>
//           <p>Conditions: {conditions}</p>
//           <p>Seats: {seats}</p>
//           <p>Additional Info: {additionalInfo}</p>
