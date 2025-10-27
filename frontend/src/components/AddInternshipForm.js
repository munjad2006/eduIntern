import { useState } from "react";
import axios from "axios";

function AddInternshipForm({ onAdded, user }) {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const res = await axios.post("http://localhost:5000/api/internships", {
        ...formData,
        companyId: user.id,
      });
      onAdded(res.data);
      alert("Internship added successfully");

      // Reset form
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
      alert("Failed to add internship");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        background: "#f9f9f9",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
        Add Internship
      </h2>

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
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </label>
      ))}

      <label style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ marginBottom: "0.3rem", fontWeight: 600 }}>
          Work Type
        </span>
        <select
          name="workType"
          value={formData.workType}
          onChange={handleChange}
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        >
          <option value="Home">Home</option>
          <option value="On-site">On-site</option>
          <option value="Both">Both</option>
        </select>
      </label>

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
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
      )}

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
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </label>
      ))}

      <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "0.75rem",
          borderRadius: "5px",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Add Internship
      </button>
    </form>
  );
}

export default AddInternshipForm;
