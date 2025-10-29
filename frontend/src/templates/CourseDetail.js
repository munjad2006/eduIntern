import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AddLessonForm from "../components/AddLessonForm";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [lessons, setLessons] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");

  const [editingLesson, setEditingLesson] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editVideo, setEditVideo] = useState(null);
  const [editResources, setEditResources] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/courses/${id}`
        );
        setCourse(data);
        if (data.reviews) setReviews(data.reviews);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    const fetchLessons = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/lessons/${id}`
        );
        setLessons(data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      }
    };

    fetchCourse();
    fetchLessons();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/courses/${id}/reviews`,
        {
          userId: user.id,
          userName: user.name,
          comment: newReview,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) => [data, ...prev]);
      setNewReview("");
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  if (!course) return <p>Loading course details...</p>;

  const handleDeleteLesson = async (lessonId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lesson? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/lessons/${lessonId}`);
      setLessons((prev) => prev.filter((l) => l._id !== lessonId));
      alert("Lesson deleted successfully.");
    } catch (err) {
      console.error("Error deleting lesson:", err);
      alert("Failed to delete lesson.");
    }
  };

  const handleEditLesson = async (lesson) => {
    const newTitle = prompt("Edit Lesson Title:", lesson.title);
    const newDesc = prompt("Edit Lesson Description:", lesson.description);
    if (!newTitle || !newDesc) return;

    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("description", newDesc);

      const { data } = await axios.put(
        `http://localhost:5000/api/lessons/${lesson._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setLessons((prev) => prev.map((l) => (l._id === data._id ? data : l)));
    } catch (err) {
      console.error("Error updating lesson:", err);
      alert("Failed to update lesson.");
    }
  };

  const openEditModal = (lesson) => {
    setEditingLesson(lesson);
    setEditTitle(lesson.title);
    setEditDescription(lesson.description);
  };

  const closeEditModal = () => {
    setEditingLesson(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("description", editDescription);
      if (editVideo) formData.append("video", editVideo);
      editResources.forEach((file) => formData.append("resources", file));

      const { data } = await axios.put(
        `http://localhost:5000/api/lessons/${editingLesson._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setLessons((prev) => prev.map((l) => (l._id === data._id ? data : l)));
      closeEditModal();
    } catch (err) {
      console.error("Error updating lesson:", err);
      alert("Failed to update lesson.");
    }
  };

  return (
    <div style={{ display: "flex", marginLeft: "15%" }}>
      <Sidebar role={user.role} />
      <main style={{ flex: 1, padding: "1rem" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <h1 style={{ marginTop: "10px" }}>{course.title}</h1>
        <p>{course.description}</p>
        {course.videoUrl && (
          <video
            key={course.videoUrl}
            controls
            preload="metadata"
            style={{
              width: "70%",
              borderRadius: "5px",
              backgroundColor: "#000",
            }}
          >
            <source
              src={
                course.videoUrl.startsWith("http")
                  ? course.videoUrl
                  : `http://localhost:5000${course.videoUrl}`
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}

        <p>
          <strong>Category:</strong> {course.category}
        </p>
        <p>
          <strong>Level:</strong> {course.level}
        </p>
        <p>
          <strong>Price:</strong> ₹{course.price}
        </p>

        <h3>Modules</h3>
        {course.modules?.length > 0 ? (
          course.modules.map((mod, idx) => (
            <div
              key={idx}
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <h4>
                Module {idx + 1}: {mod.moduleTitle}
              </h4>
              <p>{mod.description}</p>
            </div>
          ))
        ) : (
          <p>No modules added yet.</p>
        )}

        <h3>Lessons</h3>

        {/* ✅ Company can add new lessons */}
        {user.role === "company" && (
          <AddLessonForm
            courseId={id}
            onAdded={(newLesson) => setLessons((prev) => [newLesson, ...prev])}
          />
        )}

        {lessons.length > 0 ? (
          lessons.map((l, i) => (
            <div
              key={i}
              style={{
                background: "#f1f1f1",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              <h4>{l.title}</h4>
              <p>{l.description}</p>

              {l.videoUrl && (
                <video
                  src={`http://localhost:5000${l.videoUrl}`}
                  controls
                  style={{ width: "70%", borderRadius: "5px" }}
                >
                  Your browser does not support the video tag.
                </video>
              )}

              {l.resources?.length > 0 && (
                <div style={{ marginTop: "8px" }}>
                  <strong>Resources:</strong>
                  <ul>
                    {l.resources.map((file, idx) => (
                      <li key={idx}>
                        <a
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.split("/").pop()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {user.role === "company" && (
                <div
                  style={{ marginTop: "10px", display: "flex", gap: "10px" }}
                >
                  <button
                    onClick={() => openEditModal(l)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteLesson(l._id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No lessons yet.</p>
        )}

        <h3>Student Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((r, idx) => (
            <div
              key={idx}
              style={{ borderBottom: "1px solid #ddd", marginBottom: "10px" }}
            >
              <strong>{r.userName}</strong>
              <p>{r.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}

        {user.role === "student" && (
          <form onSubmit={handleReviewSubmit} style={{ marginTop: "1rem" }}>
            <textarea
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
              style={{ width: "100%", height: "80px" }}
            />
            <button type="submit" style={{ marginTop: "10px" }}>
              Submit Review
            </button>
          </form>
        )}

        {editingLesson && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                width: "400px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              <h3>Edit Lesson</h3>

              <label>Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />

              <label>Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                style={{
                  width: "100%",
                  height: "80px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />

              <label>Change Video (optional)</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setEditVideo(e.target.files[0])}
                style={{ display: "block", marginBottom: "10px" }}
              />

              <label>Change Resources (optional)</label>
              <input
                type="file"
                multiple
                onChange={(e) => setEditResources(Array.from(e.target.files))}
                style={{ display: "block", marginBottom: "10px" }}
              />

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={closeEditModal}
                  style={{
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    marginRight: "8px",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  style={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CourseDetail;
