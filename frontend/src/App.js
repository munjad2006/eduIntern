import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './templates/home';
import About from './templates/about';
import Register from './templates/Register';
import Login from './templates/Login';
import Internship from './templates/Internship';
import InternshipDetail from './templates/InternshipDetail';
import Course from './templates/Course';
import CourseDetail from './templates/CourseDetail';
import Profile from './templates/Profile';
import Settings from './templates/Settings';
import colors from './Color';
import { ThemeContext } from './context/ThemeContext';
import Copyright from './templates/copyRight';
import Blog from './templates/Blog';
import PrivacyPolicy from './templates/PrivacyPolicy';
import Support from './templates/Support';
import HelpCenter from './templates/HelpCenter';

function AppContent() {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();

  const hide = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #0a0a0a, #121212, #1a1a1a)'
          : 'linear-gradient(135deg, #f5f8ff, #ffffff, #eef3ff)',
        color: darkMode ? colors.light : colors.dark,
        transition: 'all 0.3s ease-in-out',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Navbar only if not on login/register */}
      {!hide && (
        <div
          style={{
            boxShadow: darkMode
              ? '0 1px 4px rgba(255,255,255,0.05)'
              : '0 1px 8px rgba(0,0,0,0.08)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backdropFilter: 'blur(6px)',
          }}
        >
          <Navbar />
        </div>
      )}

      {/* Main Content */}
      <main
        style={{
          flex: '1',
          paddingTop: hide ? 0 : '1rem',
          paddingBottom: hide ? 0 : '2rem',
          transition: 'background 0.4s ease, color 0.4s ease',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/internships" element={<Internship />} />
          <Route path="/internship/:id" element={<InternshipDetail />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/copyright" element={<Copyright />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </main>

      {/* Footer only if not on login/register */}
      {!hide && (
        
          <Footer />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
