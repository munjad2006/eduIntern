import { useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function Support() {
  const { darkMode } = useContext(ThemeContext);

  const cardStyle = {
    background: darkMode ? "#1c1c1c" : "#fff",
    color: darkMode ? "#ddd" : "#333",
    border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
    padding: "1.5rem",
    borderRadius: "10px",
    width: "300px",
    boxShadow: darkMode
      ? "0 2px 6px rgba(255,255,255,0.05)"
      : "0 2px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "15%",
        background: darkMode
          ? "linear-gradient(135deg, #0b0b0b, #1a1a1a)"
          : "linear-gradient(135deg, #f7f9fc, #ffffff)",
        color: darkMode ? "#e5e5e5" : "#222",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <Header />

        {/* HERO SECTION */}
        <section
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #121212, #1f1f1f)"
              : "linear-gradient(135deg, #007bff, #4facfe)",
            color: "#fff",
            padding: "4rem 2rem",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Support Center</h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
            Need help with your CareerBridge account, courses, or internships?  
            Our support team is here to guide you every step of the way.
          </p>
        </section>

        {/* CONTACT OPTIONS */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {[
            {
              title: "Technical Support",
              desc: "Having trouble logging in or using the platform? Our engineers can help.",
              email: "techsupport@careerbridge.com",
            },
            {
              title: "Course Assistance",
              desc: "Need help enrolling or understanding course materials?",
              email: "courses@careerbridge.com",
            },
            {
              title: "Internship Queries",
              desc: "Questions about applying, deadlines, or verification? We're here for you.",
              email: "internships@careerbridge.com",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={cardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h3 style={{ marginBottom: "0.8rem", color: darkMode ? "#4dabf7" : "#007bff" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.95rem", marginBottom: "0.8rem" }}>{item.desc}</p>
              <a
                href={`mailto:${item.email}`}
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                {item.email}
              </a>
            </div>
          ))}
        </section>

        {/* LIVE CHAT */}
        <section
          style={{
            ...cardStyle,
            margin: "0 auto 3rem",
            maxWidth: "800px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: darkMode ? "#4dabf7" : "#007bff" }}>Live Chat Support</h2>
          <p style={{ marginTop: "1rem" }}>
            Need immediate assistance? Start a live chat with one of our support
            representatives between <b>9 AM to 8 PM (IST)</b>, Monday to Saturday.
          </p>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              marginTop: "1.2rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Start Chat
          </button>
        </section>

        {/* STATS BANNER */}
        <section
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            borderRadius: "12px",
            background: darkMode
              ? "linear-gradient(135deg, #0d0d0d, #1a1a1a)"
              : "linear-gradient(135deg, #e3f2fd, #ffffff)",
            marginBottom: "3rem",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Trusted by Thousands of Learners Worldwide
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "3rem",
              marginTop: "2rem",
            }}
          >
            {[
              { label: "Support Tickets Resolved", value: "95K+" },
              { label: "Avg Response Time", value: "2 min" },
              { label: "Active Learners", value: "1.2M+" },
              { label: "Partner Companies", value: "400+" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 style={{ fontSize: "1.8rem", color: "#007bff" }}>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <footer
          style={{
            textAlign: "center",
            padding: "1rem",
            fontSize: "0.9rem",
            color: darkMode ? "#aaa" : "#555",
          }}
        >
          © {new Date().getFullYear()} CareerBridge Support | We’re here to help you
          learn and grow.
        </footer>
      </main>
    </div>
  );
}

export default Support;
