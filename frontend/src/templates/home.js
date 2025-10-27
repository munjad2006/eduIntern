import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InternshipCard from "../components/InternshipCard";
import CourseCard from "../components/CourseCard";
import AddInternshipForm from "../components/AddInternshipForm";
import AddCourseForm from "../components/AddCourseForm";

function Home() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [internships, setInternships] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showInternship, setShowInternship] = useState(false);
  const [showCourse, setShowCourse] = useState(false);

  const fetchData = async () => {
    try {
      if (user.role === "student") {
        // Fetch all internships and courses for students
        const [internRes, courseRes] = await Promise.all([
          axios.get("http://localhost:5000/api/internships"),
          axios.get("http://localhost:5000/api/courses"),
        ]);
        setInternships(internRes.data);
        setCourses(courseRes.data);
      } else if (user.role === "company") {
        // Fetch company-specific internships and courses using query params
        const [internRes, courseRes] = await Promise.all([
          axios.get(
            `http://localhost:5000/api/company/internships?companyId=${user._id || user.id}`
          ),
          axios.get(`http://localhost:5000/api/company/courses`, {
            params: { companyId: user._id || user.id },
          }),
        ]);
        setInternships(internRes.data);
        setCourses(courseRes.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.role]);

  return (
    <div style={{ display: "flex", marginLeft: "15%" }}>
      <Sidebar role={user.role} />
      <main style={{ flex: 1, padding: "1rem" }}>
        <Header user={user} />

        {/* ---------- STUDENT VIEW ---------- */}
        {user.role === "student" && (
          <>
            {/* <section>
              <h2>Your Profile</h2>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </section> */}

            <section>
              <h2>All Internships</h2>
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
              {internships.length > 0 ? (
                internships.map((i) => (
                  <InternshipCard key={i._id || Math.random()} internship={i} />
                ))
              ) : (
                <p>No internships available.</p>
              )}
</div>
            </section>

            <section>
              <h2>All Courses</h2>
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
                {courses.length > 0 ? (
                  courses.map((c) => (
                    <CourseCard key={c._id || Math.random()} course={c} />
                  ))
                ) : (
                  <p>No courses available.</p>
                )}
              </div>
            </section>

            <section>
              <h2>Recommended Internships</h2>
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
                {internships.slice(0, 3).map((i) => (
                  <InternshipCard key={i._id || Math.random()} internship={i} />
                ))}
              </div>
            </section>

            <section>
              <h2>Recommended Courses</h2>
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
                {courses.slice(0, 3).map((c) => (
                  <CourseCard key={c._id || Math.random()} course={c} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* ---------- COMPANY VIEW ---------- */}
        {user.role === "company" && (
          <>
            {/* add internship */}
            <section>
              <button
                onClick={() => setShowInternship(!showInternship)}
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
                {showInternship ? "Close Internship Form" : "Add Internship"}
              </button>

              {showInternship && (
                <AddInternshipForm
                  user={user}
                  onAdded={(newInternship) =>
                    setInternships((prev) => [newInternship, ...prev])
                  }
                />
              )}
            </section>

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
              <h2>Your Internships</h2>
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
              {internships && internships.length > 0 ? (
                internships.filter((i) => i && i.companyId === user.id).length >
                0 ? (
                  internships
                    .filter((i) => i && i.companyId === user.id)
                    .map((i) => (
                      <InternshipCard
                        key={i._id || Math.random()}
                        internship={i}
                      />
                    ))
                ) : (
                  <p>No internships available.</p>
                )
              ) : (
                <p>No internships available.</p>
              )}
              </div>
            </section>

            <section>
              <h2>Your Courses</h2>
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
      </main>
    </div>
  );
}

export default Home;
