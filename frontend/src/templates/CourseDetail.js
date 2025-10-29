import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AddLessonForm from "../components/AddLessonForm";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editingLesson, setEditingLesson] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editVideo, setEditVideo] = useState(null);
  const [editResources, setEditResources] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");

  // Fetch course and lessons
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, lessonsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/courses/${id}`),
          axios.get(`http://localhost:5000/api/lessons/${id}`),
        ]);
        setCourse(courseRes.data);
        setLessons(lessonsRes.data);
        if (courseRes.data.reviews) setReviews(courseRes.data.reviews);
      } catch (err) {
        console.error("Error fetching course details:", err);
      }
    };
    fetchData();
  }, [id]);

  if (!course) return <p style={{ margin: "2rem" }}>Loading course details...</p>;

  // Review submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/courses/${id}/reviews`,
        { userId: user.id, userName: user.name, comment: newReview },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews((prev) => [data, ...prev]);
      setNewReview("");
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  // Lesson editing
  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/lessons/${lessonId}`);
      setLessons((prev) => prev.filter((l) => l._id !== lessonId));
    } catch (err) {
      console.error("Error deleting lesson:", err);
    }
  };

  const openEditModal = (lesson) => {
    setEditingLesson(lesson);
    setEditTitle(lesson.title);
    setEditDescription(lesson.description);
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
      setEditingLesson(null);
    } catch (err) {
      console.error("Error updating lesson:", err);
    }
  };

  // Theme colors
  const bg = darkMode ? colors.dark : "#f9fafc";
  const textColor = darkMode ? colors.light : colors.dark;
  const cardBg = darkMode ? "#1f1f1f" : "#fff";

  return (
    <div
      style={{
        display: "flex",
        background: bg,
        color: textColor,
        minHeight: "100vh",
        marginLeft:"13%"
      }}
    >
      <Sidebar role={user.role} />

      <main style={{ flex: 1, padding: "2rem" }}>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: darkMode
              ? "linear-gradient(90deg, #333, #555)"
              : "linear-gradient(90deg, #007bff, #00bfff)",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
          }}
        >
          ← Back
        </button>

        {/* Course Card */}
        <div
          style={{
            background: cardBg,
            padding: "2rem",
            borderRadius: "14px",
            boxShadow: darkMode
              ? "0 4px 15px rgba(255,255,255,0.05)"
              : "0 6px 20px rgba(0,0,0,0.08)",
            maxWidth: "900px",
            margin: "2rem auto",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <h1>{course.title}</h1>
          <p style={{ lineHeight: "1.7" }}>{course.description}</p>

          {course.videoUrl && (
            <video
              controls
              style={{ width: "100%", borderRadius: "10px", marginTop: "1rem" }}
            >
              <source
                src={
                  course.videoUrl.startsWith("http")
                    ? course.videoUrl
                    : `http://localhost:5000${course.videoUrl}`
                }
                type="video/mp4"
              />
            </video>
          )}

          <div style={{ marginTop: "1.5rem", lineHeight: 1.8 }}>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Level:</strong> {course.level}</p>
            <p><strong>Price:</strong> ₹{course.price}</p>
          </div>

          {/* Modules */}
          <hr style={{ margin: "1.5rem 0", border: "none", borderTop: "1px solid #ddd" }} />
          <h3>Modules</h3>
          {course.modules?.length ? (
            course.modules.map((mod, i) => (
              <div
                key={i}
                style={{
                  background: darkMode ? "#2a2a2a" : "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <h4>Module {i + 1}: {mod.moduleTitle}</h4>
                <p>{mod.description}</p>
              </div>
            ))
          ) : (
            <p>No modules yet.</p>
          )}

          {/* Lessons */}
          <h3 style={{ marginTop: "2rem" }}>Lessons</h3>
          {user.role === "company" && (
            <AddLessonForm
              courseId={id}
              onAdded={(lesson) => setLessons((prev) => [lesson, ...prev])}
            />
          )}

          {lessons.length ? (
            lessons.map((l) => (
              <div
                key={l._id}
                style={{
                  background: darkMode ? "#2b2b2b" : "#f1f3f5",
                  padding: "1rem",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h4>{l.title}</h4>
                <p>{l.description}</p>

                {l.videoUrl && (
                  <video
                    src={`http://localhost:5000${l.videoUrl}`}
                    controls
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginTop: "10px",
                    }}
                  />
                )}

                {l.resources?.length > 0 && (
                  <div>
                    <strong>Resources:</strong>
                    <ul>
                      {l.resources.map((file, idx) => (
                        <li key={idx}>
                          <a
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#007bff" }}
                          >
                            {file.split("/").pop()}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {user.role === "company" && (
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button
                      onClick={() => openEditModal(l)}
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
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
                        padding: "8px 12px",
                        borderRadius: "6px",
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

        </div>
      </main>
    </div>
  );
}

export default CourseDetail;
