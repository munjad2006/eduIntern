import { useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import colors from "../Color";

function Copyright() {
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

        {/* ---------- COPYRIGHT HERO ---------- */}
        <section
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(135deg, #121212, #1f1f1f)"
              : "url('https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=80')",
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
              Copyright and Intellectual Property
            </h1>
            <p style={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
              Learn about the rights, responsibilities, and ownership of all
              content provided on our education and internship platform.
            </p>
          </div>
        </section>

        {/* ---------- COPYRIGHT DETAILS ---------- */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Ownership & Usage Rights</h2>
          <p style={{ lineHeight: "1.7", fontSize: "1rem" }}>
            © {new Date().getFullYear()} <b>CareerBridge Learning Pvt. Ltd.</b> All
            rights reserved. All materials on this website, including text,
            graphics, logos, icons, images, videos, and software, are the property
            of CareerBridge or its content providers. Unauthorized reproduction,
            distribution, or modification of any material from this site is strictly
            prohibited.
          </p>
          <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
            Users are granted a limited license to access and use the website’s
            content for personal learning and research purposes only. Commercial use
            without prior written consent is not allowed.
          </p>
        </section>

        {/* ---------- POLICY SUMMARY ---------- */}
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Policy Summary</h2>
          <ul style={{ lineHeight: "1.8", fontSize: "1rem" }}>
            <li>
              Course materials, internship listings, and blogs are owned by their
              respective creators and shared under licensing agreements.
            </li>
            <li>
              Trademarks, logos, and brand names belong to CareerBridge and may not
              be used without authorization.
            </li>
            <li>
              User-generated content (e.g., blogs, reviews, or comments) remains the
              property of the author but may be displayed publicly under the
              platform’s usage terms.
            </li>
            <li>
              Any breach of these terms may result in account suspension or legal
              action.
            </li>
          </ul>
        </section>

        {/* ---------- COPYRIGHT FAQ ---------- */}
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
                q: "Can I share materials from this website?",
                a: "Yes, you may share snippets or public content with proper credit and a link back to the original source. Redistribution of full materials is not permitted.",
              },
              {
                q: "Who owns the internship listings?",
                a: "Internship listings are owned by the respective companies. We host and promote them under fair-use agreements.",
              },
              {
                q: "Can I publish my course content here?",
                a: "Yes. If you’re an educator or company, you can upload original learning materials with full ownership retained by you.",
              },
              {
                q: "How do I report copyright infringement?",
                a: "Contact our support team at support@careerbridge.com with proof of ownership and the disputed content link.",
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

        {/* ---------- CONTACT & TRUST BANNER ---------- */}
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
            Have Questions About Copyright?
          </h2>
          <p style={{ maxWidth: "650px", margin: "0 auto 1.5rem" }}>
            Our team is here to help. Whether you’re a student, educator, or company
            partner, we ensure that your intellectual property is respected and
            protected.
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
            Contact Support
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
              { label: "Learners Protected", value: "1.2M+" },
              { label: "Partner Companies", value: "500+" },
              { label: "Original Courses", value: "10K+" },
              { label: "Years of Service", value: "5+" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 style={{ fontSize: "1.8rem", color: "#007bff" }}>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- FOOTER NOTE ---------- */}
        <footer
          style={{
            textAlign: "center",
            padding: "1rem",
            fontSize: "0.9rem",
            color: darkMode ? "#aaa" : "#555",
            borderTop: `1px solid ${darkMode ? "#333" : "#ddd"}`,
          }}
        >
          © {new Date().getFullYear()} CareerBridge Learning Pvt. Ltd. All Rights
          Reserved. Designed for learners, educators, and innovators.
        </footer>
      </main>
    </div>
  );
}

export default Copyright;
