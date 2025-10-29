import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function CourseCard({ course, onDelete }) {
  const { darkMode } = useContext(ThemeContext);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${course.title}"?`)) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/courses/${course._id}`);
      alert(res.data.message || "Course deleted successfully");
      if (onDelete) onDelete(course._id);
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course. Please try again.");
    }
  };

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
      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          style={{
            width: "100%",
            height: "170px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "12px",
          }}
        />
      )}

      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          marginBottom: "8px",
          lineHeight: "1.3",
        }}
      >
        {course.title}
      </h3>

      <div style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
        {course.level && <p>📘 <strong>Level:</strong> {course.level}</p>}
        {course.duration && <p>⏱ <strong>Duration:</strong> {course.duration}</p>}
        {course.price !== undefined && <p>💰 <strong>Price:</strong> ₹{course.price}</p>}
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.2rem",
        }}
      >
        {/* View Button */}
        <Link
          to={`/course/${course._id}`}
          style={{
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
          View
        </Link>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            fontSize: "0.95rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#b02a37";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#dc3545";
            e.target.style.transform = "scale(1)";
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
