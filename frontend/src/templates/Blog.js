import { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";
import axios from "axios";

function Blog() {
  const { darkMode } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([
          {
            title: "Top 5 Skills to Boost Your Career in 2025",
            author: "CareerGuide Team",
            date: "Oct 15, 2025",
            image:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
            content:
              "Discover the most in-demand skills employers are looking for in 2025, from AI and cloud computing to creative problem-solving.",
          },
          {
            title: "Why Internships Matter More Than Ever",
            author: "EduBridge Experts",
            date: "Sep 20, 2025",
            image:
              "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1000&q=80",
            content:
              "Internships offer more than just experience — they open doors to career growth and real-world learning opportunities.",
          },
          {
            title: "How Online Learning is Transforming Education",
            author: "SkillLink Blog",
            date: "Aug 10, 2025",
            image:
              "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1000&q=80",
            content:
              "Explore how digital learning platforms are reshaping the future of education, making it more flexible, affordable, and global.",
          },
        ]);
      }
    };

    fetchBlogs();
  }, []);

  const styles = {
    card: {
      background: darkMode
        ? "linear-gradient(145deg, #1e1e1e, #2c2c2c)"
        : "#ffffff",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: darkMode
        ? "0 4px 10px rgba(255,255,255,0.05)"
        : "0 4px 10px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: darkMode ? "#e0e0e0" : "#222",
      borderBottom: `2px solid ${darkMode ? "#66b2ff" : "#007bff"}`,
      display: "inline-block",
      marginBottom: "1.2rem",
    },
    section: {
      marginBottom: "2.5rem",
      padding: "1.5rem",
      borderRadius: "10px",
      background: darkMode
        ? "linear-gradient(145deg, #1a1a1a, #242424)"
        : "linear-gradient(145deg, #f9f9f9, #ffffff)",
      boxShadow: darkMode
        ? "0 3px 8px rgba(255,255,255,0.05)"
        : "0 3px 8px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
    },
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
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        {/* Prevent crash if Header expects user data */}
        <Header user={{ role: "guest" }} />

        {/* HERO SECTION */}
        <section
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(135deg, #121212, #1f1f1f)"
              : "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "4rem 2rem",
            borderRadius: "12px",
            marginBottom: "3rem",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: darkMode
                ? "rgba(0,0,0,0.6)"
                : "rgba(0,0,0,0.55)",
              padding: "3rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              Stay Ahead with Our Learning Insights
            </h1>
            <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
              Explore articles on career growth, internships, online learning, and the future of technology education.
            </p>
          </div>
        </section>

        {/* BLOG LIST */}
        <section style={styles.section}>
          <h2 style={styles.heading}>Latest Articles</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {blogs.map((blog, i) => (
              <div
                key={i}
                style={styles.card}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <h3 style={{ color: darkMode ? "#66b2ff" : "#007bff" }}>
                  {blog.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: darkMode ? "#aaa" : "#555" }}>
                  {blog.date} • {blog.author}
                </p>
                <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
                  {blog.content}
                </p>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "6px",
                    marginTop: "1rem",
                    cursor: "pointer",
                    fontWeight: "500",
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
                  Read More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* COMMUNITY SECTION */}
        <section
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            borderRadius: "12px",
            background: darkMode
              ? "linear-gradient(135deg, #0c0c0c, #1a1a1a)"
              : "linear-gradient(135deg, #e3f2fd, #ffffff)",
            marginBottom: "3rem",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Trusted by Learners Worldwide
          </h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 1.5rem" }}>
            Over <b>1 million learners</b> and <b>500+ companies</b> have joined our platform to learn, grow, and hire talent across the globe.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "3rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            {[
              { label: "Active Learners", value: "1.2M+" },
              { label: "Internships Posted", value: "15K+" },
              { label: "Courses Offered", value: "10K+" },
              { label: "Partner Companies", value: "500+" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 style={{ fontSize: "1.8rem", color: "#007bff" }}>
                  {stat.value}
                </h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>

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
            Join Us Today
          </button>
        </section>

        {/* FAQ SECTION */}
        <section style={styles.section}>
          <h2 style={styles.heading}>Frequently Asked Questions</h2>
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
                q: "Who writes the blogs?",
                a: "Our blogs are written by industry professionals, educators, and students who share real insights and experiences.",
              },
              {
                q: "How often do you post new articles?",
                a: "We publish new content every week covering internships, tech trends, and career tips.",
              },
              {
                q: "Can I contribute my own blog?",
                a: "Yes, registered users can submit their articles for review and publication on our platform.",
              },
              {
                q: "Do I need an account to read blogs?",
                a: "No, all blogs are open to everyone. You only need an account to comment or contribute.",
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
      </main>
    </div>
  );
}

export default Blog;
