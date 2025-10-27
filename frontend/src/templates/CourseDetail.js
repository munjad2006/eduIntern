// frontend/src/templates/CourseDetail.js
import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
        if (res.data.reviews) setReviews(res.data.reviews);
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };

    fetchCourse();
  }, [id]);

  const handleReviewSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/courses/${id}/reviews`, {
        userId: user.id,
        userName: user.name,
        comment: newReview,
      });
      setReviews(prev => [res.data, ...prev]);
      setNewReview('');
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  if (!course) return <p>Loading course details...</p>;

  return (
    <div style={{ display: "flex",  marginLeft: '15%', }}>
      <Sidebar role={user.role} />
      <main style={{ flex: 1, padding: '1rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>
      <h1 style={{marginTop:0}}>{course.title}</h1>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Certificate:</strong> {course.certificate}</p>
      <p><strong>Why Learn This Course:</strong> {course.whyLearn}</p>
      <p><strong>What You’ll Learn:</strong> {course.whatYouLearn}</p>

      <h3>Training Includes:</h3>
      <ul>
        {course.trainingMethod?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h3>Syllabus</h3>
      {course.syllabus?.length > 0 ? (
        course.syllabus.map((mod, idx) => (
          <div
            key={idx}
            style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
          >
            <h4>Module {idx + 1}: {mod.moduleTitle}</h4>
            <p>{mod.description}</p>
            <ul>
              {mod.hasVideo && <li>Includes Video Lessons</li>}
              {mod.hasQuiz && <li>Includes Quiz</li>}
              {mod.hasAssignment && <li>Includes Assignment</li>}
              {mod.hasTest && <li>Includes Test</li>}
            </ul>
          </div>
        ))
      ) : (
        <p>No syllabus details available.</p>
      )}

      <h3>Student Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((r, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #ddd', marginBottom: '10px' }}>
            <strong>{r.userName}</strong>
            <p>{r.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      {user.role === 'student' && (
        <form onSubmit={handleReviewSubmit} style={{ marginTop: '1rem' }}>
          <textarea
            placeholder="Write your review..."
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
            required
            style={{ width: '100%', height: '80px' }}
          />
          <button type="submit" style={{ marginTop: '10px' }}>Submit Review</button>
        </form>
      )}
      </main>
    </div>
  );
}

export default CourseDetail;
