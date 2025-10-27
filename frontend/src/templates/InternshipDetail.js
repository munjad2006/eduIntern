import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function InternshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/internships/${id}`
        );
        setInternship(res.data);
      } catch (err) {
        console.error("Error fetching internship:", err);
      }
    };

    fetchInternship();
  }, [id]);

  const handleApplyInternship = (e) => {

    if (!internship.companyEmail) {
      alert("Company email not available. Cant apply right now.");
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

    // Create mailto link
    const mailtoLink = `mailto:${internship.companyEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the default email client
    window.location.href = mailtoLink;
  };

  if (!internship) return <p>Loading internship details...</p>;

  return (
    <div style={{ display: "flex", marginLeft: "15%" }}>
      <Sidebar role={user.role} />
      <main style={{ flex: 1, padding: "1rem" }}>
        {/* ✅ Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <h1 style={{ marginTop: "0px" }}>{internship.title}</h1>
        <p>
          <strong>Company:</strong> {internship.companyName}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={internship.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
          >
            {internship.companyWebsite}
          </a>
        </p>
        <p>
          <strong>Work Type:</strong> {internship.workType}
        </p>
        <p>
          <strong>Start:</strong>{" "}
          {internship.startImmediately ? "Immediately" : internship.startDate}
        </p>
        <p>
          <strong>Duration:</strong> {internship.duration}
        </p>
        <p>
          <strong>Stipend:</strong> {internship.stipend}
        </p>
        <p>
          <strong>Apply By:</strong> {internship.applyEndDate}
        </p>
        <p>
          <strong>About Company:</strong> {internship.aboutCompany}
        </p>
        <p>
          <strong>About Internship:</strong> {internship.aboutInternship}
        </p>
        <p>
          <strong>Skills Required:</strong> {internship.skillRequired}
        </p>
        <p>
          <strong>Certificates:</strong> {internship.certificates}
        </p>
        <p>
          <strong>Conditions:</strong> {internship.conditions}
        </p>
        <p>
          <strong>Seats:</strong> {internship.seats}
        </p>
        <p>
          <strong>Additional Info:</strong> {internship.additionalInfo}
        </p>

        {user.role === "student" && (
          <button
          onClick={() => handleApplyInternship()}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Apply Internship
        </button>
        )}
      </main>
    </div>
  );
}

export default InternshipDetail;
