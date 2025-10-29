import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [theme, setTheme] = useState("blue");
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Particle background
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 100, density: { enable: true, value_area: 800 } },
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

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "blue" ? "pink" : "blue"));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage(`Welcome ${res.data.user.name}!`);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

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
          background: #000;
          overflow: hidden;
        }

        .page {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          position: relative;
        }

        #particles-js {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 30%, #0a0a2a, #000);
          z-index: 0;
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

        label {
          display: block;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          margin-bottom: 6px;
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

        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          margin: 15px 0;
        }

        .remember input {
          margin-right: 5px;
          accent-color: ${theme === "blue" ? "#00d4ff" : "#ff4fd8"};
        }

        .forgot {
          color: ${theme === "blue" ? "#00d4ff" : "#ff4fd8"};
          text-decoration: none;
          transition: 0.3s;
        }

        .forgot:hover {
          text-decoration: underline;
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

          <h2>Login</h2>
          <p>Welcome back, please sign in</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                className="input-field"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="input-field"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="remember-forgot">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">SIGN IN</button>

            <div className="signup-link">
              Don’t have an account? <Link to="/register">Register</Link>
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
};

export default Login;
