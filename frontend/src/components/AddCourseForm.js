import { useState } from "react";
import axios from "axios";

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

  const token = localStorage.getItem("token");

  // Upload Thumbnail
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
      setMessage("Thumbnail uploaded successfully!");
    } catch (error) {
      setMessage("❌ Error uploading thumbnail");
    } finally {
      setUploading(false);
    }
  };

  // Upload Video
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
      setMessage("Video uploaded successfully!");
    } catch (error) {
      setMessage("❌ Error uploading video");
    } finally {
      setUploading(false);
    }
  };

  // Create Course
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return setMessage("⚠️ Please login first.");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/courses",
        { title, description, category, level, price, thumbnail, videoUrl, companyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    } catch (error) {
      console.error("Error creating course:", error);
      setMessage("❌ Failed to create course");
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "30px 0",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
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
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
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
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
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
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <input
            type="text"
            placeholder="Level (e.g. Beginner)"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
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
                alt="thumb"
                style={{
                  marginTop: "10px",
                  height: "100px",
                  borderRadius: "5px",
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
                  borderRadius: "5px",
                }}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            style={{
              width: "100%",
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: uploading ? "not-allowed" : "pointer",
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
            }}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
