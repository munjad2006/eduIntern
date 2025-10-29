import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function InternshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/internships/${id}`);
        setInternship(res.data);
      } catch (err) {
        console.error("Error fetching internship:", err);
      }
    };
    fetchInternship();
  }, [id]);

  const handleApplyInternship = () => {
    if (!internship.companyEmail) {
      alert("Company email not available. Can't apply right now.");
      return;
    }

    const subject = `Application for ${internship.title}`;
    const body = `Hello ${internship.companyName},

I am interested in applying for the ${internship.title} internship.

Here are my details:
Name: ${user.name}
Email: ${user.email || "Not provided"}

Looking forward to hearing from you.

Best regards,
${user.name}`;

    const mailtoLink = `mailto:${internship.companyEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  if (!internship)
    return (
      <p
        style={{
          color: darkMode ? colors.light : colors.dark,
          textAlign: "center",
          padding: "2rem",
        }}
      >
        Loading internship details...
      </p>
    );

  const bg = darkMode
    ? "linear-gradient(135deg, #0b0b0b, #121212, #1c1c1c)"
    : "linear-gradient(135deg, #f5f8ff, #ffffff, #eef3ff)";
  const textColor = darkMode ? colors.light : colors.dark;
  const cardBg = darkMode ? "#1a1a1a" : "#fff";

  return (
    <div
      style={{
        display: "flex",
        background: bg,
        color: textColor,
        minHeight: "100vh",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <Sidebar role={user.role} />

      <main
        style={{
          flex: 1,
          padding: "2rem",
          marginLeft: "12%",
          transition: "all 0.3s ease",
        }}
      >
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
            fontWeight: "600",
            boxShadow: darkMode
              ? "0 3px 10px rgba(255,255,255,0.1)"
              : "0 3px 10px rgba(0,0,0,0.15)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = darkMode
              ? "0 5px 14px rgba(255,255,255,0.15)"
              : "0 5px 14px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = darkMode
              ? "0 3px 10px rgba(255,255,255,0.1)"
              : "0 3px 10px rgba(0,0,0,0.15)";
          }}
        >
          ← Back
        </button>

        {/* Internship card */}
        <div
          style={{
            background: cardBg,
            padding: "2rem",
            borderRadius: "14px",
            boxShadow: darkMode
              ? "0 4px 15px rgba(255,255,255,0.05)"
              : "0 6px 20px rgba(0,0,0,0.08)",
            maxWidth: "800px",
            margin: "2rem auto",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <h1 style={{ marginTop: 0 }}>{internship.title}</h1>
          <p>
            <strong>Company:</strong> {internship.companyName}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={internship.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: darkMode ? "#66b2ff" : "#007bff",
                textDecoration: "none",
              }}
            >
              {internship.companyWebsite}
            </a>
          </p>
          <p><strong>Work Type:</strong> {internship.workType}</p>
          <p>
            <strong>Start:</strong>{" "}
            {internship.startImmediately
              ? "Immediately"
              : internship.startDate}
          </p>
          <p><strong>Duration:</strong> {internship.duration}</p>
          <p><strong>Stipend:</strong> {internship.stipend}</p>
          <p><strong>Apply By:</strong> {internship.applyEndDate}</p>

          <hr
            style={{
              margin: "1.5rem 0",
              border: "none",
              borderTop: darkMode ? "1px solid #333" : "1px solid #ddd",
            }}
          />

          <p><strong>About Company:</strong> {internship.aboutCompany}</p>
          <p><strong>About Internship:</strong> {internship.aboutInternship}</p>
          <p><strong>Skills Required:</strong> {internship.skillRequired}</p>
          <p><strong>Certificates:</strong> {internship.certificates}</p>
          <p><strong>Conditions:</strong> {internship.conditions}</p>
          <p><strong>Seats:</strong> {internship.seats}</p>
          <p><strong>Additional Info:</strong> {internship.additionalInfo}</p>

          {/* Apply button for student */}
          {user.role === "student" && (
            <button
              onClick={handleApplyInternship}
              style={{
                background: darkMode
                  ? "linear-gradient(90deg, #007bff, #3399ff)"
                  : "linear-gradient(90deg, #0056b3, #0099ff)",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                marginTop: "20px",
                boxShadow: darkMode
                  ? "0 3px 10px rgba(0, 123, 255, 0.3)"
                  : "0 3px 10px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 6px 14px rgba(0, 123, 255, 0.4)"
                  : "0 6px 14px rgba(0, 0, 0, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = darkMode
                  ? "0 3px 10px rgba(0, 123, 255, 0.3)"
                  : "0 3px 10px rgba(0, 0, 0, 0.15)";
              }}
            >
              Apply Internship
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default InternshipDetail;
