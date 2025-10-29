import { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function AddInternshipForm({ onAdded, user }) {
  const { darkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    activelyHiring: true,
    title: "",
    companyName: "",
    companyEmail: user.email || "",
    companyWebsite: "",
    workType: "Home",
    startImmediately: true,
    startDate: "",
    duration: "",
    stipend: "",
    applyEndDate: "",
    aboutCompany: "",
    aboutInternship: "",
    skillRequired: "",
    certificates: "",
    conditions: "",
    seats: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const res = await axios.post("http://localhost:5000/api/internships", {
        ...formData,
        companyId: storedUser.id,
      });

      onAdded(res.data);
      setMessage("✅ Internship added successfully!");

      setFormData({
        activelyHiring: true,
        title: "",
        companyName: "",
        companyWebsite: "",
        workType: "Home",
        startImmediately: true,
        startDate: "",
        duration: "",
        stipend: "",
        applyEndDate: "",
        aboutCompany: "",
        aboutInternship: "",
        skillRequired: "",
        certificates: "",
        conditions: "",
        seats: "",
        additionalInfo: "",
      });
    } catch (err) {
      console.error("Error adding internship:", err);
      setMessage("❌ Failed to add internship. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "0.6rem",
    borderRadius: "8px",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    background: darkMode ? "#2a2a2a" : "#fff",
    color: darkMode ? "#f1f1f1" : "#000",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s ease",
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(135deg, #1e1e1e, #121212)"
          : "linear-gradient(135deg, #eef2f3, #d9e4ec)",
        padding: "40px 0",
        transition: "background 0.3s ease",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "750px",
          margin: "0 auto",
          background: darkMode ? "#1e1e1e" : "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: darkMode
            ? "0 0 15px rgba(255,255,255,0.05)"
            : "0 6px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          color: darkMode ? "#f5f5f5" : "#333",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "700",
            marginBottom: "0.5rem",
            color: darkMode ? "#fff" : "#333",
          }}
        >
          Add New Internship
        </h2>
        <p
          style={{
            textAlign: "center",
            color: darkMode ? "#aaa" : "#666",
            marginBottom: "1rem",
          }}
        >
          Fill out the details below to post a new internship opportunity.
        </p>

        {/* Input Fields */}
        {[
          { label: "Internship Title", name: "title", type: "text" },
          { label: "Company Name", name: "companyName", type: "text" },
          { label: "Company Website", name: "companyWebsite", type: "text" },
          { label: "Duration", name: "duration", type: "text" },
          { label: "Stipend", name: "stipend", type: "text" },
          { label: "Apply End Date", name: "applyEndDate", type: "date" },
          { label: "Skills Required", name: "skillRequired", type: "text" },
          { label: "Certificates", name: "certificates", type: "text" },
          { label: "Conditions", name: "conditions", type: "text" },
          { label: "Seats", name: "seats", type: "number" },
        ].map(({ label, name, type }) => (
          <label key={name} style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "0.3rem", fontWeight: 600 }}>
              {label}
            </span>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
              onBlur={(e) =>
                (e.target.style.border = darkMode
                  ? "1px solid #555"
                  : "1px solid #ccc")
              }
            />
          </label>
        ))}

        {/* Work Type */}
        <label style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginBottom: "0.3rem", fontWeight: 600 }}>
            Work Type
          </span>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            style={{
              ...inputStyle,
              cursor: "pointer",
            }}
          >
            <option value="Home">Home</option>
            <option value="On-site">On-site</option>
            <option value="Both">Both</option>
          </select>
        </label>

        {/* Checkboxes */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <label>
            <input
              type="checkbox"
              name="activelyHiring"
              checked={formData.activelyHiring}
              onChange={handleChange}
            />{" "}
            Actively Hiring
          </label>
          <label>
            <input
              type="checkbox"
              name="startImmediately"
              checked={formData.startImmediately}
              onChange={handleChange}
            />{" "}
            Start Immediately
          </label>
        </div>

        {/* Start Date */}
        {!formData.startImmediately && (
          <label style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "0.3rem", fontWeight: 600 }}>
              Start Date
            </span>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
        )}

        {/* Textareas */}
        {[
          { label: "About Company", name: "aboutCompany" },
          { label: "About Internship", name: "aboutInternship" },
          { label: "Additional Info", name: "additionalInfo" },
        ].map(({ label, name }) => (
          <label key={name} style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "0.3rem", fontWeight: 600 }}>
              {label}
            </span>
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleChange}
              rows="4"
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />
          </label>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: darkMode ? "#0a84ff" : "#007bff",
            color: "#fff",
            border: "none",
            padding: "0.9rem",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            boxShadow: darkMode
              ? "0 4px 0 #0062cc"
              : "0 4px 0 #0056b3",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = darkMode ? "#006fe0" : "#0056b3")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = darkMode ? "#0a84ff" : "#007bff")
          }
          onMouseDown={(e) => (e.target.style.transform = "translateY(2px)")}
          onMouseUp={(e) => (e.target.style.transform = "translateY(0)")}
        >
          {loading ? "Submitting..." : "Add Internship"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: message.includes("❌") ? "red" : "green",
              fontWeight: 600,
            }}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default AddInternshipForm;
