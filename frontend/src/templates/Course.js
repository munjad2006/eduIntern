import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import Sidebar from "../components/Sidebar";
import AddCourseForm from "../components/AddCourseForm";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function Course() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [courses, setCourses] = useState([]);
  const [showCourse, setShowCourse] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const fetchCourses = async () => {
    try {
      if (user.role === "student") {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } else if (user.role === "company") {
        const res = await axios.get("http://localhost:5000/api/company/courses", {
          params: { companyId: user.id },
        });
        setCourses(res.data);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        background: darkMode
          ? "linear-gradient(135deg, #0b0b0b, #121212, #1c1c1c)"
          : "linear-gradient(135deg, #f5f8ff, #ffffff, #eef3ff)",
        color: darkMode ? colors.light : colors.dark,
        minHeight: "100vh",
        transition: "background 0.3s ease, color 0.3s ease",
         marginLeft: "14%",
      }}
    >
      <Sidebar role={user.role} />

      <main
        style={{
          flex: 1,
          padding: "2rem",
         
          transition: "all 0.3s ease",
        }}
      >
        <header style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              color: darkMode ? "#fff" : "#222",
            }}
          >
            {user.role === "company" ? "Your Courses" : "Explore Courses"}
          </h1>
          <p style={{ color: darkMode ? "#aaa" : "#555", fontSize: "1rem" }}>
            {user.role === "company"
              ? "Manage and create courses for students to enroll."
              : "Browse the latest available courses from top companies."}
          </p>
        </header>

        {/* 🎓 Banner Section */}
        <section
          style={{
            background: darkMode
              ? "rgba(255,255,255,0.05)"
              : "linear-gradient(90deg, #e3f2fd, #ffffff)",
            borderRadius: "10px",
            padding: "1.5rem",
            marginBottom: "2rem",
            boxShadow: darkMode
              ? "0 3px 10px rgba(255,255,255,0.08)"
              : "0 3px 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
        >
          {user.role === "student" ? (
            <>
              <h2 style={{ marginBottom: "0.5rem" }}>📘 Learn and Grow</h2>
              <p>
                Enroll in high-quality courses to enhance your skills and get
                certified. Every lesson helps you move one step closer to your
                career goals.
              </p>
            </>
          ) : (
            <>
              <h2 style={{ marginBottom: "0.5rem" }}>🏫 Share Your Expertise</h2>
              <p>
                Create and publish your own courses to educate and upskill the
                next generation of students in your field.
              </p>
            </>
          )}
        </section>

        {/* Company Section */}
        {user.role === "company" && (
          <>
            <section
              style={{
                marginBottom: "2rem",
                background: darkMode ? "#1a1a1a" : "#f9f9f9",
                padding: "1rem 1.5rem",
                borderRadius: "10px",
                boxShadow: darkMode
                  ? "0 2px 10px rgba(255, 255, 255, 0.05)"
                  : "0 2px 10px rgba(0, 0, 0, 0.1)",
                transition: "background 0.3s ease",
              }}
            >
              <button
                onClick={() => setShowCourse(!showCourse)}
                style={{
                  backgroundColor: darkMode ? "#007bff" : "#0056b3",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.25s ease",
                  boxShadow: darkMode
                    ? "0 3px 10px rgba(0, 123, 255, 0.3)"
                    : "0 3px 10px rgba(0, 0, 0, 0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {showCourse ? "Close Course Form" : "Add Course"}
              </button>

              {showCourse && (
                <div style={{ marginTop: "1rem" }}>
                  <AddCourseForm
                    companyId={user._id || user.id}
                    onAdded={(newCourse) =>
                      setCourses((prev) => [newCourse, ...prev])
                    }
                  />
                </div>
              )}
            </section>

            <section>
              <h2 style={{ marginBottom: "1rem" }}>Published Courses</h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1.2rem",
                  justifyContent: "flex-start",
                }}
              >
                {courses && courses.length > 0 ? (
                  courses
                    .filter((c) => c && c.companyId === user.id)
                    .map((c) => (
                      <div
                        key={c._id}
                        style={{ transition: "transform 0.25s ease" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "translateY(-5px)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
                      >
                        <CourseCard
                          course={c}
                          userRole={user.role}
                          onDelete={(deletedId) =>
                            setCourses((prev) =>
                              prev.filter((course) => course._id !== deletedId)
                            )
                          }
                        />
                      </div>
                    ))
                ) : (
                  <p>No courses available.</p>
                )}
              </div>
            </section>
          </>
        )}

        {/* Student View */}
        {user.role === "student" && (
          <section>
            <h2 style={{ marginBottom: "1rem" }}>Available Courses</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.2rem",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {courses && courses.length > 0 ? (
                courses.map((c) => (
                  <div
                    key={c._id || Math.random()}
                    style={{ transition: "transform 0.25s ease" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <CourseCard
                      course={c}
                      onDelete={(deletedId) =>
                        setCourses((prev) =>
                          prev.filter((course) => course._id !== deletedId)
                        )
                      }
                    />
                  </div>
                ))
              ) : (
                <p>No courses available.</p>
              )}
            </div>
          </section>
        )}

        {/* 💬 FAQ Section */}
        <section
          style={{
            marginTop: "3rem",
            background: darkMode ? "#181818" : "#f7f9fc",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: darkMode
              ? "0 3px 10px rgba(255,255,255,0.05)"
              : "0 3px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Frequently Asked Questions</h2>

          <details
            style={{
              marginBottom: "0.8rem",
              background: darkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
              padding: "0.8rem 1rem",
              borderRadius: "8px",
            }}
          >
            <summary style={{ cursor: "pointer", fontWeight: "600" }}>
              How can students enroll in a course?
            </summary>
            <p style={{ marginTop: "0.5rem" }}>
              Students can view available courses and click “Enroll” to join
              directly through the platform.
            </p>
          </details>

          <details
            style={{
              marginBottom: "0.8rem",
              background: darkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
              padding: "0.8rem 1rem",
              borderRadius: "8px",
            }}
          >
            <summary style={{ cursor: "pointer", fontWeight: "600" }}>
              Can companies edit or delete a course?
            </summary>
            <p style={{ marginTop: "0.5rem" }}>
              Yes. Companies can manage their own courses from this page by
              editing or deleting existing ones.
            </p>
          </details>

          <details
            style={{
              background: darkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
              padding: "0.8rem 1rem",
              borderRadius: "8px",
            }}
          >
            <summary style={{ cursor: "pointer", fontWeight: "600" }}>
              Are the courses free to access?
            </summary>
            <p style={{ marginTop: "0.5rem" }}>
              It depends on the company’s settings. Some courses are free, while
              others may require approval or payment.
            </p>
          </details>
        </section>
      </main>
    </div>
  );
}

export default Course;
