import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function Header({ user }) {
  const { darkMode } = useContext(ThemeContext);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Safe fallback for user
  const safeUser = user || { name: "Guest", role: "guest", email: "No email" };
  const role = safeUser?.role?.toLowerCase() || "guest";

  // 🎯 Dynamic content
  const slogans = {
    student: {
      title: "🎓 Welcome, future innovator!",
      subtitle:
        "Learn. Build. Grow. Your journey to internships and skills starts here.",
      accent: "#007bff",
    },
    company: {
      title: "🏢 Welcome back, recruiter!",
      subtitle:
        "Connect. Hire. Empower. Discover top talent and post your opportunities.",
      accent: "#28a745",
    },
    guest: {
      title: "👋 Welcome to CareerConnect",
      subtitle:
        "Explore internships, discover talent, and grow your professional journey.",
      accent: "#ff9800",
    },
  };

  const { title, subtitle, accent } = slogans[role] || slogans.guest;

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2.5rem 3rem",
        background: darkMode
          ? "linear-gradient(135deg, #141414, #1f1f1f, #2b2b2b)"
          : "linear-gradient(135deg, #f5f9ff, #eaf2ff, #ffffff)",
        color: darkMode ? "#f5f5f5" : "#222",
        boxShadow: darkMode
          ? "0 4px 10px rgba(255, 255, 255, 0.05)"
          : "0 4px 10px rgba(0, 0, 0, 0.08)",
        borderBottom: darkMode
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.05)",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
      }}
    >
      {/* ---- LEFT: Dynamic greeting ---- */}
      <div style={{ flex: 1 }}>
        <h2
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: "700",
            color: darkMode ? "#fff" : "#111",
            letterSpacing: "0.5px",
          }}
        >
          {title} {safeUser?.name && ` ${safeUser.name.split(" ")[0]}`}
        </h2>

        {safeUser?.role && (
          <p
            style={{
              fontSize: "1rem",
              color: darkMode ? "#ccc" : "#555",
              marginTop: "6px",
              fontWeight: "500",
            }}
          >
            Role: <strong>{safeUser.role}</strong>
          </p>
        )}

        <p
          style={{
            marginTop: "14px",
            fontSize: "1.2rem",
            lineHeight: "1.6",
            fontWeight: "600",
            color: darkMode ? accent : accent,
            letterSpacing: "0.4px",
            maxWidth: "600px",
            transition: "all 0.4s ease",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* ---- RIGHT: Date + Email badge ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            color: darkMode ? "#bbb" : "#444",
            fontWeight: "500",
          }}
        >
          📅 {today}
        </span>

        <div
          style={{
            backgroundColor: darkMode ? `${accent}33` : `${accent}1a`,
            color: accent,
            padding: "8px 18px",
            borderRadius: "25px",
            fontWeight: "600",
            fontSize: "1rem",
            transition: "all 0.3s ease",
            cursor: "pointer",
            boxShadow: darkMode
              ? `0 0 10px ${accent}33`
              : `0 0 8px ${accent}22`,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = darkMode
              ? `${accent}55`
              : `${accent}22`;
            e.target.style.transform = "scale(1.08)";
            e.target.style.boxShadow = darkMode
              ? `0 0 15px ${accent}55`
              : `0 0 12px ${accent}33`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = darkMode
              ? `${accent}33`
              : `${accent}1a`;
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = darkMode
              ? `0 0 10px ${accent}33`
              : `0 0 8px ${accent}22`;
          }}
        >
          {safeUser?.email}
        </div>
      </div>
    </header>
  );
}

export default Header;
