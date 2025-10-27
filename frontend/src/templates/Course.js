import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import Sidebar from "../components/Sidebar";
import AddCourseForm from "../components/AddCourseForm";

function Course() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [courses, setCourses] = useState([]);
  const [showCourse, setShowCourse] = useState(false);

  const fetchCourses = async () => {
    try {
      if (user.role === "student") {
        const res = await axios.get("http://localhost:5000/api/courses");
        console.log("Fetched courses:", res.data);
        setCourses(res.data);
      } else if (user.role === "company") {
        const res = await axios.get(
          "http://localhost:5000/api/company/courses",
          {
            params: { companyId: user.id },
          }
        );
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
    <div style={{ display: "flex", marginLeft: "15%" }}>
      <Sidebar role={user.role} />
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Courses</h1>
        {user.role === "company" && (
          <>
            {/* add course */}
            <section>
              <button
                onClick={() => setShowCourse(!showCourse)}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                {showCourse ? "Close Course Form" : "Add Course"}
              </button>

              {showCourse && (
                <AddCourseForm
                  companyId={user._id || user.id}
                  onAdded={(newCourse) =>
                    setCourses((prev) => [newCourse, ...prev])
                  }
                />
              )}
            </section>

            <section>
               <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
              {courses && courses.length > 0 ? (
                // Filter courses that belong to the current company
                courses.filter((c) => c && c.companyId === user.id).length >
                0 ? (
                  courses
                    .filter((c) => c && c.companyId === user.id)
                    .map((c) => (
                      <CourseCard key={c._id || Math.random()} course={c} />
                    ))
                ) : (
                  <p>No courses available.</p>
                )
              ) : (
                <p>No courses available.</p>
              )}
              </div>
            </section>
          </>
        )}

        {user.role === "student" && (
          <>
           <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
            {courses && courses.length > 0 ? (
              courses
                .filter((c) => c != null)
                .map((c) => (
                  <CourseCard key={c._id || Math.random()} course={c} />
                ))
            ) : (
              <p>No courses available.</p>
            )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Course;
