import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function AppContent() {
  const location = useLocation();
  const hide = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {!hide && <Navbar />}

      <div style={{ flex: '1' }}>
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
        </Routes>
      </div>

      {!hide && <Footer />}
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
