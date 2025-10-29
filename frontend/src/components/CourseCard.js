// frontend/src/components/CourseCard.js
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

    if (onDelete) onDelete(course._id); // ✅ remove from parent state
  } catch (err) {
    console.error("Error deleting course:", err);
    alert("Failed to delete course. Please try again.");
  }
};


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
      }}
    >
      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      )}

      <h3>{course.title}</h3>
      {course.level && <p>Level: {course.level}</p>}
      {course.price !== undefined && <p>Price: ₹{course.price}</p>}
      {course.duration && <p>Duration: {course.duration}</p>}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <Link
          to={`/course/${course._id}`}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "5px",
          }}
        >
          View
        </Link>

        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
