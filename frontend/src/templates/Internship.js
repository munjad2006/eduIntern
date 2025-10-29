import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import InternshipCard from "../components/InternshipCard";
import AddInternshipForm from "../components/AddInternshipForm";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function Internship() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [internships, setInternships] = useState([]);
  const [showInternship, setShowInternship] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const fetchInternships = async () => {
    try {
      if (user.role === "student") {
        const res = await axios.get("http://localhost:5000/api/internships");
        setInternships(res.data);
      } else if (user.role === "company") {
        const res = await axios.get(
          `http://localhost:5000/api/company/internships`,
          { params: { companyId: user.id } }
        );
        setInternships(res.data);
      }
    } catch (err) {
      console.error("Error fetching internships:", err);
    }
  };

  useEffect(() => {
    fetchInternships();
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
        marginLeft:"14%"
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
        {/* Header Section */}
        <header style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              color: darkMode ? "#fff" : "#222",
            }}
          >
            {user.role === "company"
              ? "Your Internships"
              : "Available Internships"}
          </h1>
          <p style={{ color: darkMode ? "#aaa" : "#555", fontSize: "1rem" }}>
            {user.role === "company"
              ? "Manage and post internships to attract talented students."
              : "Browse and apply to top internship opportunities from leading companies."}
          </p>
        </header>

        {/* 🎯 Banner Section */}
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
              <h2 style={{ marginBottom: "0.5rem" }}>🚀 Start Your Career</h2>
              <p style={{ marginBottom: 0 }}>
                Explore real-world internships to gain hands-on experience,
                build skills, and connect with companies looking for talent like
                you.
              </p>
            </>
          ) : (
            <>
              <h2 style={{ marginBottom: "0.5rem" }}>🏢 Grow Your Team</h2>
              <p style={{ marginBottom: 0 }}>
                Post internships to discover driven students ready to
                contribute. Manage all listings and applicants right here.
              </p>
            </>
          )}
        </section>

        {/* Company Dashboard */}
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
              }}
            >
              <button
                onClick={() => setShowInternship(!showInternship)}
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
                {showInternship ? "Close Internship Form" : "Add Internship"}
              </button>

              {showInternship && (
                <div style={{ marginTop: "1rem" }}>
                  <AddInternshipForm
                    user={user}
                    onAdded={(newInternship) =>
                      setInternships((prev) => [newInternship, ...prev])
                    }
                  />
                </div>
              )}
            </section>

            <section>
              <h2 style={{ marginBottom: "1rem" }}>Posted Internships</h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1.2rem",
                  justifyContent: "flex-start",
                }}
              >
                {internships && internships.length > 0 ? (
                  internships
                    .filter((i) => i && i.companyId === user.id)
                    .map((i) => (
                      <div
                        key={i._id || Math.random()}
                        style={{ transition: "transform 0.25s ease" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "translateY(-5px)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
                      >
                        <InternshipCard internship={i} />
                      </div>
                    ))
                ) : (
                  <p>No internships available.</p>
                )}
              </div>
            </section>
          </>
        )}

        {/* Student Internship List */}
        {user.role === "student" && (
          <section>
            <h2 style={{ marginBottom: "1rem" }}>Explore Internships</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.2rem",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {internships && internships.length > 0 ? (
                internships.map((i) => (
                  <div
                    key={i._id || Math.random()}
                    style={{ transition: "transform 0.25s ease" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <InternshipCard internship={i} />
                  </div>
                ))
              ) : (
                <p>No internships available.</p>
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
              How can I apply for an internship?
            </summary>
            <p style={{ marginTop: "0.5rem" }}>
              Students can browse internships listed below and apply directly
              through the platform or via the contact details provided.
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
              How do companies post internships?
            </summary>
            <p style={{ marginTop: "0.5rem" }}>
              Company users can click “Add Internship,” fill in the form, and
              publish instantly for students to view.
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
              Can I edit or remove an internship after posting?
            </summary>
            <p style={{ marginTop: "0.5rem" }}>
              Yes, company users can manage listings from their dashboard.
              Editing and removal options will be available in the next update.
            </p>
          </details>
        </section>
      </main>
    </div>
  );
}

export default Internship;
