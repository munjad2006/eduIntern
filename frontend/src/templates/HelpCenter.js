import { useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function HelpCenter() {
  const { darkMode } = useContext(ThemeContext);

  const faqList = [
    {
      q: "How can I reset my password?",
      a: "Go to the login page, click on 'Forgot Password', and follow the steps sent to your registered email address.",
    },
    {
      q: "How do I contact an internship provider?",
      a: "Once you apply, you can message companies directly through your dashboard or check for contact details in the internship description.",
    },
    {
      q: "Can I update my course progress manually?",
      a: "No, course progress updates automatically as you complete lessons and quizzes.",
    },
    {
      q: "Is my data safe on CareerBridge?",
      a: "Absolutely. We use SSL encryption, secure servers, and strict privacy protocols.",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "15%",
        backgroundColor: darkMode ? colors.dark : "#f5f7fa",
        color: darkMode ? "#e5e5e5" : "#222",
        minHeight: "100vh",
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
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Help Center</h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
            Quick answers to common questions. Save time by checking our guide before
            reaching out to support.
          </p>
        </section>

        {/* FAQ SECTION */}
        <section
          style={{
            background: darkMode ? "#1a1a1a" : "#fff",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: darkMode
              ? "0 3px 8px rgba(255,255,255,0.05)"
              : "0 3px 8px rgba(0,0,0,0.08)",
            marginBottom: "3rem",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: darkMode ? "#4dabf7" : "#007bff" }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqList.map((faq, i) => (
              <details
                key={i}
                style={{
                  background: darkMode ? "#1c1c1c" : "#fafafa",
                  border: `1px solid ${darkMode ? "#333" : "#ddd"}`,
                  borderRadius: "8px",
                  padding: "1rem",
                  cursor: "pointer",
                }}
              >
                <summary style={{ fontWeight: "600" }}>{faq.q}</summary>
                <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT SUPPORT */}
        <section
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            borderRadius: "12px",
            background: darkMode
              ? "linear-gradient(135deg, #0b0b0b, #1a1a1a)"
              : "linear-gradient(135deg, #e3f2fd, #ffffff)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Still Need Help?
          </h2>
          <p style={{ maxWidth: "650px", margin: "0 auto 1.5rem" }}>
            Our support team is available 24/7. Send us a message and we’ll get back
            to you as soon as possible.
          </p>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Contact Support
          </button>
        </section>

        <footer
          style={{
            textAlign: "center",
            padding: "1rem",
            fontSize: "0.9rem",
            color: darkMode ? "#aaa" : "#555",
            marginTop: "2rem",
          }}
        >
          © {new Date().getFullYear()} CareerBridge Help Center | Empowering learners
          with knowledge and guidance.
        </footer>
      </main>
    </div>
  );
}

export default HelpCenter;
