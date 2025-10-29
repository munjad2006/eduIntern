import React, { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function AddLessonForm({ courseId, onAdded }) {
  const { darkMode } = useContext(ThemeContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!video && resources.length === 0) return {};

    const formData = new FormData();
    if (video) formData.append("video", video);
    resources.forEach((file) => formData.append("resources", file));

    const res = await axios.post(
      "http://localhost:5000/api/lessons/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
      }
    );

    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const uploadData = await handleUpload();

      const lessonData = {
        courseId,
        title,
        description,
        videoUrl: uploadData.videoUrl || "",
        resources: uploadData.resourceUrls || [],
      };

      const res = await axios.post(
        "http://localhost:5000/api/lessons",
        lessonData
      );
      onAdded(res.data);
      setMessage("✅ Lesson added successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setVideo(null);
      setResources([]);
      setUploadProgress(0);
    } catch (err) {
      console.error("Error creating lesson:", err);
      setMessage("❌ Failed to create lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "0.7rem",
    borderRadius: "8px",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#2a2a2a" : "#fff",
    color: darkMode ? "#f1f1f1" : "#000",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s ease",
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      style={{
        background: darkMode ? "#1e1e1e" : "#f8f9fa",
        color: darkMode ? "#f5f5f5" : "#333",
        padding: "2rem",
        borderRadius: "12px",
        marginBottom: "1rem",
        boxShadow: darkMode
          ? "0 0 15px rgba(255,255,255,0.05)"
          : "0 6px 20px rgba(0,0,0,0.1)",
        maxWidth: "700px",
        margin: "2rem auto",
        transition: "all 0.3s ease",
      }}
    >
      <h2
        style={{
          marginBottom: "1rem",
          fontWeight: "700",
          color: darkMode ? "#fff" : "#222",
          textAlign: "center",
        }}
      >
        Add New Lesson
      </h2>

      {/* Title */}
      <label style={{ display: "flex", flexDirection: "column", marginBottom: "1rem" }}>
        <span style={{ fontWeight: 600, marginBottom: "0.3rem" }}>Lesson Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
          onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
          onBlur={(e) =>
            (e.target.style.border = darkMode
              ? "1px solid #555"
              : "1px solid #ccc")
          }
        />
      </label>

      {/* Description */}
      <label style={{ display: "flex", flexDirection: "column", marginBottom: "1rem" }}>
        <span style={{ fontWeight: 600, marginBottom: "0.3rem" }}>Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          style={{
            ...inputStyle,
            resize: "none",
          }}
        />
      </label>

      {/* Video Upload */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontWeight: 600 }}>Upload Video (optional)</label>
        <label
          style={{
            display: "inline-block",
            background: darkMode ? "#007aff" : "#007bff",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "0.5rem",
            transition: "background 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = darkMode ? "#0062cc" : "#0056b3")
          }
          onMouseOut={(e) =>
            (e.target.style.background = darkMode ? "#007aff" : "#007bff")
          }
        >
          Choose Video
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>
        {video && (
          <p style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
            🎥 Selected: {video.name}
          </p>
        )}
      </div>

      {/* Resource Upload */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontWeight: 600 }}>Upload Resources (optional)</label>
        <label
          style={{
            display: "inline-block",
            background: darkMode ? "#007aff" : "#007bff",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "0.5rem",
            transition: "background 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = darkMode ? "#0062cc" : "#0056b3")
          }
          onMouseOut={(e) =>
            (e.target.style.background = darkMode ? "#007aff" : "#007bff")
          }
        >
          Choose Files
          <input
            type="file"
            multiple
            onChange={(e) => setResources(Array.from(e.target.files))}
            style={{ display: "none" }}
          />
        </label>
        {resources.length > 0 && (
          <p style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
            📁 {resources.length} file(s) selected
          </p>
        )}
      </div>

      {/* Upload Progress */}
      {uploadProgress > 0 && (
        <div
          style={{
            height: "10px",
            background: darkMode ? "#333" : "#e0e0e0",
            borderRadius: "5px",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: `${uploadProgress}%`,
              background: "#007bff",
              height: "100%",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: darkMode ? "#0a84ff" : "#007bff",
          color: "#fff",
          border: "none",
          padding: "0.9rem",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "600",
          width: "100%",
          boxShadow: darkMode
            ? "0 4px 0 #0056b3"
            : "0 4px 0 #004999",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = darkMode ? "#006fe0" : "#0056b3")
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = darkMode ? "#0a84ff" : "#007bff")
        }
      >
        {loading ? "Saving..." : "Add Lesson"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: message.includes("❌") ? "red" : "green",
            fontWeight: 600,
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default AddLessonForm;
