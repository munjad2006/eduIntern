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
          opacity: {
            value: 0.8,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.4 },
          },
          size: {
            value: 5,
            random: true,
            anim: { enable: true, speed: 2, size_min: 1 },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: theme === "blue" ? "#00d4ff" : "#ff4fd8",
            opacity: 0.6,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 2,
            random: true,
            out_mode: "out",
            attract: { enable: true, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    };
    document.body.appendChild(script);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "blue" ? "pink" : "blue"));
  };

  // Handle input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submit
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
            margin: 0;
            padding: 0;
            height: 100%;
            background: #000;
            overflow: hidden;
          }

          .page {
            --main-color: #00d4ff;
            --bg-dark: #000;
            position: relative;
            width: 100%;
            height: 100vh;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .page.pink {
            --main-color: #ff4fd8;
          }

          #particles-js {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 0;
            background: radial-gradient(circle at top, #0d0d2b, #000);
          }

          .container {
            position: relative;
            z-index: 1;
          }

          .form-box {
            background: rgba(0, 0, 0, 0.7);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 8px 24px var(--main-color);
            border: 1px solid rgba(0, 212, 255, 0.3);
            animation: formEntrance 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
            opacity: 0;
            transform: rotateX(20deg) translateY(100px);
          }

          @keyframes formEntrance {
            0% {
              opacity: 0;
              transform: rotateX(20deg) translateY(100px);
            }
            100% {
              opacity: 1;
              transform: rotateX(0deg) translateY(0);
            }
          }

          .theme-toggle {
            text-align: right;
            margin-bottom: 10px;
          }

          .theme-toggle button {
            background: transparent;
            color: var(--main-color);
            border: 1px solid var(--main-color);
            border-radius: 20px;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 13px;
            transition: 0.3s;
          }

          .theme-toggle button:hover {
            background: var(--main-color);
            color: #000;
          }

          .page h2 {
            color: var(--main-color);
            text-align: center;
            margin-bottom: 10px;
            font-family: "Cinzel", serif;
            letter-spacing: 3px;
            text-shadow: 0 0 10px var(--main-color);
          }

          .page p {
            color: var(--main-color);
            text-align: center;
            margin-bottom: 25px;
            font-size: 14px;
            letter-spacing: 1px;
          }
          .remember {
            color: var(--main-color);
          }

          .page .input-group {
            position: relative;
            margin-bottom: 25px;
          }

          .page .input-field {
            width: 100%;
            padding: 12px 0;
            font-size: 15px;
            color: var(--main-color);
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(0, 212, 255, 0.3);
            outline: none;
            transition: 0.3s;
          }

          .page .input-field:focus ~ .glow-line {
            width: 100%;
            box-shadow: 0 0 10px var(--main-color);
          }

          .page .glow-line {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--main-color), transparent);
            transition: 0.4s;
          }

          .page .input-group label {
            position: absolute;
            top: 12px;
            left: 0;
            color: rgba(0, 212, 255, 0.7);
            font-size: 15px;
            pointer-events: none;
            transition: 0.4s;
          }
        

          .page .input-field:focus ~ label,
          .page .input-field:valid ~ label {
            top: -12px;
            font-size: 12px;
            color: var(--main-color);
          }

          .page .remember-forgot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            font-size: 13px;
            color: rgba(0, 212, 255, 0.8);
          }

          .page .login-btn {
            width: 100%;
            padding: 12px 0;
            border: 1px solid var(--main-color);
            border-radius: 25px;
            background: transparent;
            color: var(--main-color);
            cursor: pointer;
            transition: 0.5s;
          }

          .page .login-btn:hover {
            background: rgba(0, 212, 255, 0.1);
            box-shadow: 0 0 20px var(--main-color);
          }

          .page .signup-link {
          padding-top: 15px;
            text-align: center;
            color: rgba(0, 212, 255, 0.7);
            font-size: 13px;
          }
          .forgot {
            color: var(--main-color);
            text-decoration: none;
          }

          .page .signup-link a {
            color: rgba(255, 255, 255);
            text-decoration: none;
          }
        `}
      </style>
    

    <div className={`page ${theme}`}>
      <div id="particles-js"></div>

      <div className="container">
        <div className="form-box">
          <div className="theme-toggle">
            <button onClick={handleThemeToggle}>
              Switch to {theme === "blue" ? "Pink" : "Blue"} Theme
            </button>
          </div>

          <h2>Login</h2>
          <p>Welcome Back</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                className="input-field"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
              <div className="glow-line"></div>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                className="input-field"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
              <div className="glow-line"></div>
            </div>

            <div className="remember-forgot">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me{" "}</label>
              </div>
              <a href="#" className="forgot">
             Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-btn">
              <span>SIGN IN</span>
              <div className="btn-glow"></div>
            </button>

            <div className="signup-link">
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "var(--main-color)" }}>
                Register
              </Link>
            </div>
          </form>

          {message && (
            <p style={{ color: "var(--main-color)", marginTop: "10px" }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
