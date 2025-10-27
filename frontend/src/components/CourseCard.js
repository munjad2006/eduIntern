// frontend/src/components/CourseCard.js
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function CourseCard({ course }) {
  const { darkMode } = useContext(ThemeContext);
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
      <h3>{course.title}</h3>
      <p>
        <strong>Duration:</strong> {course.duration}
      </p>
      <p>
        <strong>Certificate:</strong> {course.certificate}
      </p>

      <Link
        to={`/course/${course._id}`}
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
        Know More
      </Link>
    </div>
  );
}

export default CourseCard;
