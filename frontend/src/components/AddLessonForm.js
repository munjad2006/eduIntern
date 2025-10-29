import React, { useState } from "react";
import axios from "axios";

function AddLessonForm({ courseId, onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    if (!title.trim() || !description.trim())
      return alert("Please fill in all fields.");

    try {
      setLoading(true);
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

      // reset
      setTitle("");
      setDescription("");
      setVideo(null);
      setResources([]);
      setUploadProgress(0);
    } catch (err) {
      console.error("Error creating lesson:", err);
      alert("Failed to create lesson.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      style={{
        background: "#f8f9fa",
        padding: "1rem",
        borderRadius: "10px",
        marginBottom: "1rem",
      }}
    >
      <h3>Add Lesson</h3>

      <div>
        <label>Lesson Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: "100%", height: "80px", marginBottom: "8px" }}
        />
      </div>

      <div>
        <label>Upload Video (optional)</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          style={{ display: "block", marginBottom: "8px" }}
        />
      </div>

      <div>
        <label>Upload Resources (optional)</label>
        <input
          type="file"
          multiple
          onChange={(e) => setResources(Array.from(e.target.files))}
          style={{ display: "block", marginBottom: "8px" }}
        />
      </div>

      {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "8px 16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Saving..." : "Add Lesson"}
      </button>
    </form>
  );
}

export default AddLessonForm;
