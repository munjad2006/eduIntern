import { useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  const { darkMode } = useContext(ThemeContext);

  const headingStyle = {
    fontSize: "1.6rem",
    fontWeight: "600",
    color: darkMode ? "#e0e0e0" : "#222",
    borderBottom: `2px solid ${darkMode ? "#66b2ff" : "#007bff"}`,
    display: "inline-block",
    marginBottom: "1.2rem",
  };

  const sectionStyle = {
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
        <Header />

        {/* ---------- HERO SECTION ---------- */}
        <section
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(135deg, #121212, #1f1f1f)"
              : "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "4rem 2rem",
            borderRadius: "12px",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              backgroundColor: darkMode ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.55)",
              padding: "3rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
              Learn how CareerBridge protects your personal data and ensures your
              online privacy while you use our education and internship platform.
            </p>
          </div>
        </section>

        {/* ---------- INTRODUCTION ---------- */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Our Commitment to Privacy</h2>
          <p style={{ lineHeight: "1.7", fontSize: "1rem" }}>
            At <b>CareerBridge Learning Pvt. Ltd.</b>, we respect your right to
            privacy and are committed to protecting your personal information. This
            Privacy Policy explains how we collect, use, and safeguard your data
            when you visit our website, register for courses, apply for internships,
            or use any of our services.
          </p>
        </section>

        {/* ---------- INFORMATION COLLECTION ---------- */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Information We Collect</h2>
          <ul style={{ lineHeight: "1.8", fontSize: "1rem" }}>
            <li>
              <b>Personal Data:</b> Name, email, phone number, and educational
              background when you register or apply for opportunities.
            </li>
            <li>
              <b>Account Data:</b> Login credentials, preferences, and learning
              history to personalize your experience.
            </li>
            <li>
              <b>Cookies:</b> To improve navigation, remember user sessions, and
              track site performance.
            </li>
            <li>
              <b>Usage Data:</b> Pages visited, clicks, and time spent on the
              platform to help us optimize our content.
            </li>
          </ul>
        </section>

        {/* ---------- DATA USAGE ---------- */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>How We Use Your Information</h2>
          <p style={{ lineHeight: "1.7", fontSize: "1rem" }}>
            The information we collect is used to improve your experience, ensure
            platform security, and provide personalized services such as recommended
            courses and internship matches.
          </p>
          <ul style={{ lineHeight: "1.8", fontSize: "1rem", marginTop: "1rem" }}>
            <li>To create and manage your account</li>
            <li>To send important updates, newsletters, and notifications</li>
            <li>To analyze trends and improve our learning platform</li>
            <li>To ensure compliance with legal and academic standards</li>
          </ul>
        </section>

        {/* ---------- SECURITY & COOKIES ---------- */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Data Protection and Security</h2>
          <p style={{ lineHeight: "1.7", fontSize: "1rem" }}>
            We use SSL encryption, firewalls, and secure databases to protect your
            data from unauthorized access. We never sell your information to third
            parties. However, we may share limited data with trusted partners for
            analytics and service improvement under strict privacy guidelines.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Cookies and Tracking Technologies</h2>
          <p style={{ lineHeight: "1.7", fontSize: "1rem" }}>
            Cookies help us improve the website experience. You can manage cookie
            settings in your browser at any time. Disabling cookies may affect some
            features like login sessions or personalized content.
          </p>
        </section>

        {/* ---------- FAQ ---------- */}
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
                q: "Is my personal data shared with employers?",
                a: "We only share your data with companies you explicitly apply to, or when required for verification purposes with your consent.",
              },
              {
                q: "How long do you keep my data?",
                a: "We retain your information for as long as your account remains active, or as needed to comply with legal obligations.",
              },
              {
                q: "Can I delete my data?",
                a: "Yes, you can request account deletion by contacting support@careerbridge.com. We’ll remove all personal data except what’s legally required to retain.",
              },
              {
                q: "Do you use third-party tools?",
                a: "We use analytics and email services (like Google Analytics, SendGrid) to enhance your experience. These partners comply with privacy regulations such as GDPR.",
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

        {/* ---------- CONTACT & TRUST ---------- */}
        <section
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            borderRadius: "12px",
            background: darkMode
              ? "linear-gradient(135deg, #0b0b0b, #1a1a1a)"
              : "linear-gradient(135deg, #e3f2fd, #ffffff)",
            marginBottom: "3rem",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Have Concerns About Your Privacy?
          </h2>
          <p style={{ maxWidth: "650px", margin: "0 auto 1.5rem" }}>
            Our data protection team is always available to assist. Transparency and
            security are at the heart of everything we do.
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
            Contact Privacy Team
          </button>

          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "3rem",
            }}
          >
            {[
              { label: "Learners Trusting Us", value: "1.2M+" },
              { label: "Internship Listings", value: "800+" },
              { label: "Certified Educators", value: "300+" },
              { label: "Global Reach", value: "20+ Countries" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 style={{ fontSize: "1.8rem", color: "#007bff" }}>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

      
      </main>
    </div>
  );
}

export default PrivacyPolicy;
