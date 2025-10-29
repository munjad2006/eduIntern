import { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

export default function AddCourseForm({ companyId, onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const { darkMode } = useContext(ThemeContext);

  const token = localStorage.getItem("token");

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setThumbnail(data.fileUrl);
      setMessage("✅ Thumbnail uploaded successfully!");
    } catch {
      setMessage("❌ Error uploading thumbnail");
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/upload/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideoUrl(data.fileUrl);
      setMessage("✅ Video uploaded successfully!");
    } catch {
      setMessage("❌ Error uploading video");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setMessage("⚠️ Please login first.");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/courses",
        { title, description, category, level, price, thumbnail, videoUrl, companyId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Course created successfully!");
      onAdded && onAdded(data);
      setTitle("");
      setDescription("");
      setCategory("");
      setLevel("");
      setPrice("");
      setThumbnail("");
      setVideoUrl("");
    } catch {
      setMessage("❌ Failed to create course");
    }
  };

  const bg = darkMode
    ? "linear-gradient(135deg, #0b0b0b, #121212, #1c1c1c)"
    : "linear-gradient(135deg, #f5f8ff, #ffffff, #eef3ff)";
  const cardBg = darkMode ? "#1a1a1a" : "#fff";
  const textColor = darkMode ? colors.light : colors.dark;

  return (
    <section
      style={{
        minHeight: "100vh",
        background: bg,
        color: textColor,
        padding: "40px 0",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: cardBg,
          padding: "30px",
          borderRadius: "14px",
          boxShadow: darkMode
            ? "0 4px 15px rgba(255,255,255,0.05)"
            : "0 6px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          Add New Course
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: darkMode ? "#222" : "#fff",
              color: textColor,
            }}
          />

          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: darkMode ? "#222" : "#fff",
              color: textColor,
            }}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: darkMode ? "#222" : "#fff",
              color: textColor,
            }}
          />

          <input
            type="text"
            placeholder="Level (e.g. Beginner)"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: darkMode ? "#222" : "#fff",
              color: textColor,
            }}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: darkMode ? "#222" : "#fff",
              color: textColor,
            }}
          />

          {/* Thumbnail Upload */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Upload Thumbnail:
            </label>
            <input type="file" onChange={handleThumbnailUpload} />
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail"
                style={{
                  marginTop: "10px",
                  height: "100px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>

          {/* Video Upload */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Upload Video:
            </label>
            <input type="file" onChange={handleVideoUpload} />
            {videoUrl && (
              <video
                src={videoUrl}
                controls
                style={{
                  marginTop: "10px",
                  width: "100%",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            style={{
              width: "100%",
              background: darkMode
                ? "linear-gradient(90deg, #007bff, #3399ff)"
                : "linear-gradient(90deg, #0056b3, #0099ff)",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: uploading ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: darkMode
                ? "0 3px 10px rgba(0, 123, 255, 0.3)"
                : "0 3px 10px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!uploading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 6px 14px rgba(0, 123, 255, 0.4)"
                  : "0 6px 14px rgba(0, 0, 0, 0.25)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = darkMode
                ? "0 3px 10px rgba(0, 123, 255, 0.3)"
                : "0 3px 10px rgba(0, 0, 0, 0.15)";
            }}
          >
            {uploading ? "Uploading..." : "Create Course"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: message.includes("❌") ? "red" : "green",
              fontWeight: "500",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
