import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InternshipCard from "../components/InternshipCard";
import CourseCard from "../components/CourseCard";
import AddInternshipForm from "../components/AddInternshipForm";
import AddCourseForm from "../components/AddCourseForm";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function Home() {
  const { darkMode } = useContext(ThemeContext);

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
        const [internRes, courseRes] = await Promise.all([
          axios.get("http://localhost:5000/api/internships"),
          axios.get("http://localhost:5000/api/courses"),
        ]);
        setInternships(internRes.data);
        setCourses(courseRes.data);
      } else if (user.role === "company") {
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

  const sectionStyle = {
    marginBottom: "2rem",
    padding: "1.5rem",
    borderRadius: "10px",
    background: darkMode
      ? "linear-gradient(145deg, #1a1a1a, #242424)"
      : "linear-gradient(145deg, #f9f9f9, #ffffff)",
    boxShadow: darkMode
      ? "0 3px 8px rgba(255,255,255,0.05)"
      : "0 3px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const headingStyle = {
    fontSize: "1.4rem",
    fontWeight: "600",
    color: darkMode ? "#e0e0e0" : "#333",
    marginBottom: "1rem",
    borderBottom: `2px solid ${darkMode ? "#007bff" : "#007bff"}`,
    paddingBottom: "4px",
    display: "inline-block",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "12px",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
  };

  const buttonHover = (e, active) => {
    e.target.style.backgroundColor = active ? "#0056b3" : "#007bff";
    e.target.style.transform = active ? "translateY(-2px)" : "translateY(0)";
    e.target.style.boxShadow = active
      ? "0 4px 10px rgba(0, 123, 255, 0.3)"
      : "none";
  };

  const cardContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.2rem",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "15%",
        backgroundColor: darkMode ? colors.dark : "#f5f7fa",
        color: darkMode ? "#e5e5e5" : "#222",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <Sidebar role={user.role} />
      <main style={{ flex: 1, padding: "2rem" }}>
        <Header user={user} />

        {/* ---------- LANDING BANNER ---------- */}
        <section
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(135deg, #1f1f1f, #292929)"
              : "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "4rem 2rem",
            borderRadius: "12px",
            marginBottom: "2.5rem",
            marginTop: "2.5rem",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: darkMode ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.5)",
              padding: "3rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              {user.role === "company"
                ? "Find the Right Talent, Faster"
                : "Learn from 350+ Top Universities and Companies"}
            </h1>
            <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
              {user.role === "company"
                ? "Post internships, manage applicants, and connect with emerging professionals."
                : "Grow your skills with hands-on courses, industry insights, and internships."}
            </p>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: user.role === "company" ? "#28a745" : "#ff7b00",
                fontSize: "1rem",
                padding: "12px 20px",
              }}
              onMouseEnter={(e) => buttonHover(e, true)}
              onMouseLeave={(e) => buttonHover(e, false)}
            >
              {user.role === "company"
                ? "Post an Internship"
                : "Explore Opportunities"}
            </button>
          </div>
        </section>

        {/* ---------- WHY CHOOSE US ---------- */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          {[
            {
              title: "Invest in your career",
              desc: "Explore new skills and opportunities with our expert-designed programs.",
            },
            {
              title: "Access 10,000+ courses",
              desc: "From AI to Business to Cloud Computing, learn what matters today.",
            },
            {
              title: "Earn valuable credentials",
              desc: "Get certificates for every course and boost your hiring potential.",
            },
            {
              title: "Learn from the best",
              desc: "Gain practical knowledge from industry leaders and educators.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: darkMode
                  ? "linear-gradient(145deg, #1c1c1c, #2a2a2a)"
                  : "#fff",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: darkMode
                  ? "0 3px 8px rgba(255,255,255,0.05)"
                  : "0 3px 8px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h3
                style={{
                  color: darkMode ? "#66b2ff" : "#007bff",
                  marginBottom: "0.5rem",
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: darkMode ? "#bbb" : "#555", fontSize: "0.95rem" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* ---------- PARTNER COMPANIES ---------- */}
        <section style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={headingStyle}>Our Hiring Partners</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "1.5rem",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            {[
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_2015_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/4/4f/Adobe_Systems_logo_and_wordmark.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            ].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Partner company"
                style={{
                  height: "40px",
                  objectFit: "contain",
                  margin: "0 auto",
                  filter: darkMode ? "invert(1) brightness(0.8)" : "none",
                }}
              />
            ))}
          </div>
        </section>

        {/* ---------- STUDENT VIEW ---------- */}
        {user.role === "student" && (
          <>
            <section style={sectionStyle}>
              <h2 style={headingStyle}>All Internships</h2>
              <div style={cardContainer}>
                {internships.length > 0 ? (
                  internships.map((i) => (
                    <InternshipCard key={i._id || Math.random()} internship={i} />
                  ))
                ) : (
                  <p>No internships available.</p>
                )}
              </div>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>All Courses</h2>
              <div style={cardContainer}>
                {courses.length > 0 ? (
                  courses.map((c) => (
                    <CourseCard key={c._id || Math.random()} course={c} />
                  ))
                ) : (
                  <p>No courses available.</p>
                )}
              </div>
            </section>
          </>
        )}

        {/* ---------- COMPANY VIEW ---------- */}
        {user.role === "company" && (
          <>
            <section style={sectionStyle}>
              <button
                onClick={() => setShowInternship(!showInternship)}
                style={buttonStyle}
                onMouseEnter={(e) => buttonHover(e, true)}
                onMouseLeave={(e) => buttonHover(e, false)}
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

            <section style={sectionStyle}>
              <button
                onClick={() => setShowCourse(!showCourse)}
                style={buttonStyle}
                onMouseEnter={(e) => buttonHover(e, true)}
                onMouseLeave={(e) => buttonHover(e, false)}
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

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Your Internships</h2>
              <div style={cardContainer}>
                {internships.length > 0 ? (
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
                )}
              </div>
            </section>

            <section style={sectionStyle}>
              <h2 style={headingStyle}>Your Courses</h2>
              <div style={cardContainer}>
                {courses.length > 0 ? (
                  courses
                    .filter((c) => c && c.companyId === user.id)
                    .map((c) => (
                      <CourseCard key={c._id || Math.random()} course={c} />
                    ))
                ) : (
                  <p>No courses available.</p>
                )}
              </div>
            </section>

            {/* ---------- FAQ SECTION ---------- */}
<section style={{ marginTop: "4rem", marginBottom: "2rem" }}>
  <h2 style={headingStyle}>Frequently Asked Questions</h2>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      maxWidth: "800px",
      margin: "0 auto",
    }}
  >
    {[
      {
        q: "How do I apply for an internship?",
        a: "Go to the internships section, browse available options, and click on 'Apply Now'. You’ll be notified once the company reviews your application.",
      },
      {
        q: "Can I enroll in multiple courses?",
        a: "Yes. You can take multiple courses at once and track your progress separately for each one.",
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Click 'Forgot Password' on the login page and follow the instructions to reset it securely.",
      },
      {
        q: "How can companies post internships or courses?",
        a: "Company users can use the 'Add Internship' or 'Add Course' buttons on the dashboard.",
      },
    ].map((faq, i) => (
      <details
        key={i}
        style={{
          background: darkMode ? "#1c1c1c" : "#fff",
          color: darkMode ? "#ddd" : "#333",
          border: `1px solid ${darkMode ? "#333" : "#ccc"}`,
          borderRadius: "8px",
          padding: "1rem",
          boxShadow: darkMode
            ? "0 2px 5px rgba(255,255,255,0.05)"
            : "0 2px 5px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        <summary style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
          {faq.q}
        </summary>
        <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>{faq.a}</p>
      </details>
    ))}
  </div>
</section>

{/* ---------- COMMUNITY BANNER ---------- */}
<section
  style={{
    marginTop: "3rem",
    textAlign: "center",
    background: darkMode
      ? "linear-gradient(135deg, #0b0b0b, #1a1a1a)"
      : "linear-gradient(135deg, #e3f2fd, #ffffff)",
    padding: "2.5rem 1rem",
    borderRadius: "12px",
  }}
>
  <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
    Join Our Learning Community
  </h2>
  <p style={{ maxWidth: "600px", margin: "0 auto 1.5rem" }}>
    Connect with peers, get help from mentors, and share your progress. Grow
    together with a network of learners and professionals.
  </p>
  <button
    style={{
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px 18px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = "#0056b3";
      e.target.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = "#007bff";
      e.target.style.transform = "translateY(0)";
    }}
  >
    Join Now
  </button>
</section>


          </>
        )}
      </main>
    </div>
  );
}

export default Home;
