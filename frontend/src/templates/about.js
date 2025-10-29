import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function About() {
  const { darkMode } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const headingStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: darkMode ? "#e0e0e0" : "#222",
    textAlign: "center",
    marginBottom: "1.5rem",
  };

  const sectionStyle = {
    background: darkMode
      ? "linear-gradient(145deg, #1a1a1a, #232323)"
      : "linear-gradient(145deg, #f9f9f9, #ffffff)",
    borderRadius: "12px",
    padding: "2rem",
    marginBottom: "2.5rem",
    boxShadow: darkMode
      ? "0 4px 10px rgba(255,255,255,0.05)"
      : "0 4px 10px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
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
        {/* ---------- HERO / ABOUT INTRO ---------- */}
        <section
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(135deg, #0d0d0d, #1a1a1a)"
              : "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            padding: "4rem 2rem",
            color: "#fff",
            textAlign: "center",
            marginBottom: "3rem",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: darkMode
                ? "rgba(0,0,0,0.7)"
                : "rgba(0,0,0,0.5)",
              borderRadius: "12px",
              padding: "3rem 2rem",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              Empowering Students and Companies
            </h1>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              Our mission is to bridge the gap between education and industry by
              providing students with real-world internship opportunities and
              companies with access to talented learners ready to make an impact.
            </p>
          </div>
        </section>

        {/* ---------- ABOUT DETAILS ---------- */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>What We Do</h2>
          <p style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
            We are an integrated education and internship platform that helps
            students learn in-demand skills, earn certifications, and get real
            industry experience. Companies use our platform to find talented
            interns and post training opportunities that align with their hiring
            goals.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginTop: "2rem",
            }}
          >
            {[
              {
                title: "Learn",
                desc: "Access 10,000+ courses across technology, design, and business.",
                color: "#007bff",
              },
              {
                title: "Grow",
                desc: "Gain hands-on experience through curated internships.",
                color: "#28a745",
              },
              {
                title: "Connect",
                desc: "Build your profile, network with mentors, and get noticed by top employers.",
                color: "#ff7b00",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: darkMode ? "#1c1c1c" : "#fff",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: darkMode
                    ? "0 3px 8px rgba(255,255,255,0.05)"
                    : "0 3px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <h3 style={{ color: item.color, marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: darkMode ? "#bbb" : "#555", fontSize: "0.95rem" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- TRUST / IMPACT BANNER ---------- */}
        <section
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            margin: "3rem 0",
            background: darkMode
              ? "linear-gradient(135deg, #0b0b0b, #1a1a1a)"
              : "linear-gradient(135deg, #e3f2fd, #ffffff)",
            borderRadius: "12px",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Trusted by Learners and Recruiters Worldwide
          </h2>
          <p style={{ maxWidth: "700px", margin: "0 auto 2rem" }}>
            Over <strong>50,000+ students</strong> and <strong>1,200+ companies</strong> use our platform
            to learn, connect, and grow every day.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { number: "50K+", label: "Active Learners" },
              { number: "1.2K+", label: "Partner Companies" },
              { number: "10K+", label: "Internships Posted" },
              { number: "98%", label: "User Satisfaction" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <h3 style={{ fontSize: "2rem", color: "#007bff" }}>
                  {stat.number}
                </h3>
                <p style={{ color: darkMode ? "#ccc" : "#555" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- FAQ SECTION ---------- */}
        <section style={sectionStyle}>
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
                q: "Who can join this platform?",
                a: "Anyone looking to enhance their skills or offer internship opportunities — students, professionals, and companies alike.",
              },
              {
                q: "Are the courses certified?",
                a: "Yes. Every completed course comes with an industry-recognized certificate you can showcase on LinkedIn or your resume.",
              },
              {
                q: "Do I need to pay to access internships?",
                a: "No. Browsing and applying to internships is completely free for students.",
              },
              {
                q: "How do companies benefit from joining?",
                a: "Companies can post internships, find qualified candidates, and promote their brand to thousands of students worldwide.",
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
                  cursor: "pointer",
                  boxShadow: darkMode
                    ? "0 2px 5px rgba(255,255,255,0.05)"
                    : "0 2px 5px rgba(0,0,0,0.08)",
                }}
              >
                <summary style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                  {faq.q}
                </summary>
                <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- CALL TO ACTION ---------- */}
        <section
          style={{
            textAlign: "center",
            marginTop: "4rem",
            marginBottom: "2rem",
            background: darkMode
              ? "linear-gradient(135deg, #0d0d0d, #1a1a1a)"
              : "linear-gradient(135deg, #e3f2fd, #ffffff)",
            padding: "3rem 1rem",
            borderRadius: "12px",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Ready to Shape Your Future?
          </h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 1.5rem" }}>
            Join thousands of learners and recruiters who trust our platform
            every day to connect, learn, and grow.
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
      </main>
    </div>
  );
}

export default About;
