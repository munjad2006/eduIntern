import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [theme, setTheme] = useState("blue");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Particle effect
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 90, density: { enable: true, value_area: 800 } },
          color: { value: theme === "blue" ? "#00d4ff" : "#ff4fd8" },
          shape: { type: "circle" },
          opacity: { value: 0.6, random: true },
          size: { value: 4, random: true },
          line_linked: {
            enable: true,
            distance: 130,
            color: theme === "blue" ? "#00d4ff" : "#ff4fd8",
            opacity: 0.4,
            width: 1.2,
          },
          move: { enable: true, speed: 1.5, out_mode: "out" },
        },
        interactivity: {
          events: { onhover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        retina_detect: true,
      });
    };
    document.body.appendChild(script);
  }, [theme]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  const handleThemeToggle = () =>
    setTheme((prev) => (prev === "blue" ? "pink" : "blue"));

  return (
    <>
      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        body, html {
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        .page {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        #particles-js {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
          background: radial-gradient(circle at 20% 30%, #0a0a2a, #000);
        }

        .form-box {
          position: relative;
          z-index: 2;
          width: 380px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 25px rgba(0,0,0,0.4);
          animation: fadeIn 1s ease forwards;
          transform: translateY(40px);
          opacity: 0;
        }

        @keyframes fadeIn {
          to { transform: translateY(0); opacity: 1; }
        }

        h2 {
          text-align: center;
          color: ${theme === "blue" ? "#00d4ff" : "#ff4fd8"};
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        p {
          text-align: center;
          color: rgba(255,255,255,0.6);
          margin-bottom: 25px;
          font-size: 14px;
        }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        .input-field {
          width: 100%;
          padding: 12px;
          border: none;
          outline: none;
          border-radius: 6px;
          background: rgba(255,255,255,0.08);
          color: ${theme === "blue" ? "#00d4ff" : "#ff4fd8"};
          font-size: 14px;
          transition: 0.3s ease;
        }

        .input-field:focus {
          background: rgba(255,255,255,0.15);
          box-shadow: 0 0 8px ${theme === "blue" ? "#00d4ffaa" : "#ff4fd8aa"};
        }

        label {
          display: block;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          margin-bottom: 6px;
        }

        select.input-field {
          appearance: none;
          cursor: pointer;
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, ${theme === "blue" ? "#00d4ff" : "#ff4fd8"}, ${theme === "blue" ? "#0077ff" : "#ff2ca3"});
          border: none;
          border-radius: 25px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 1px;
          transition: 0.4s ease;
        }

        .login-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 0 18px ${theme === "blue" ? "#00d4ff" : "#ff4fd8"};
        }

        .signup-link {
          text-align: center;
          margin-top: 15px;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
        }

        .signup-link a {
          color: ${theme === "blue" ? "#00d4ff" : "#ff4fd8"};
          text-decoration: none;
          transition: 0.3s;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        .theme-toggle {
          text-align: right;
          margin-bottom: 10px;
        }

        .theme-toggle button {
          background: transparent;
          border: 1px solid ${theme === "blue" ? "#00d4ff" : "#ff4fd8"};
          color: ${theme === "blue" ? "#00d4ff" : "#ff4fd8"};
          border-radius: 20px;
          padding: 4px 10px;
          cursor: pointer;
          font-size: 12px;
          transition: 0.3s;
        }

        .theme-toggle button:hover {
          background: ${theme === "blue" ? "#00d4ff" : "#ff4fd8"};
          color: #000;
        }

        `}
      </style>

      <div className="page">
        <div id="particles-js"></div>

        <div className="form-box">
          <div className="theme-toggle">
            <button onClick={handleThemeToggle}>
              Switch to {theme === "blue" ? "Pink" : "Blue"} Theme
            </button>
          </div>

          <h2>Register</h2>
          <p>Create your free account</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label htmlFor="role">Register As</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="student">Student</option>
                <option value="company">Company</option>
              </select>
            </div>

            <button type="submit" className="login-btn">REGISTER</button>

            <div className="signup-link">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </div>

            {message && (
              <p style={{ color: "#fff", marginTop: "12px", textAlign: "center" }}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
