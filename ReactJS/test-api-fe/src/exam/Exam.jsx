import React, { useState, useEffect } from 'react';
import { getExams } from './examService';
import './exam.css';

const Exam = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const examList = await getExams();
        setExams(Array.isArray(examList) ? examList : []);
      } catch (err) {
        setError(err.message || 'Failed to load exams');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return (
      <div className="exam-container">
        <div className="loading">Loading exams...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exam-container">
        <div className="error">
          <h3>Error Loading Exams</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-btn"
          >
            ↻ Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-container">
      <div className="exam-header">
        <h1>Available Exams</h1>
        <p>Select an exam to begin</p>
      </div>
      
      <div className="exam-list">
        {exams.length > 0 ? (
          exams.map((exam, index) => (
            <div key={exam.id || index} className="exam-card">
              <div className="exam-card-header">
                <h2>{exam.name || `Exam ${index + 1}`}</h2>
                {exam.difficulty && (
                  <span className={`difficulty-badge ${exam.difficulty.toLowerCase()}`}>
                    {exam.difficulty}
                  </span>
                )}
              </div>
              
              {exam.description && (
                <div className="exam-description">
                  <p>{exam.description}</p>
                </div>
              )}
              
              <div className="exam-details">
                {exam.duration && (
                  <div className="detail-item">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{exam.duration} minutes</span>
                  </div>
                )}
                
                {exam.questions && (
                  <div className="detail-item">
                    <span className="detail-label">Questions:</span>
                    <span className="detail-value">{exam.questions.length}</span>
                  </div>
                )}
                
                {exam.passingScore && (
                  <div className="detail-item">
                    <span className="detail-label">Passing Score:</span>
                    <span className="detail-value">{exam.passingScore}%</span>
                  </div>
                )}
              </div>
              
              {exam.createdAt && (
                <div className="exam-footer">
                  <span className="created-date">
                    Created: {new Date(exam.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              <button className="start-exam-btn">
                Start Exam →
              </button>
            </div>
          ))
        ) : (
          <div className="no-exams">
            <p>No exams available at the moment.</p>
            <p>Please check back later or contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exam;