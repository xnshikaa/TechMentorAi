import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate('/questionnaire');
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      
      <div className="login-content">
        <div className="login-header">
          <div className="logo">
            <Sparkles size={40} />
          </div>
          <h1>TechMentor AI</h1>
          <p>Your personal guide to mastering tech skills</p>
        </div>

        <div className="login-card">
          <h2>Welcome! Let's Begin Your Journey</h2>
          <p className="subtitle">Learn by building real projects, guided every step of the way</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">What should we call you?</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                required
                autoFocus
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-large">
              Find Your Path
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Personalized Learning Path</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <span>Real Portfolio Projects</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤖</span>
              <span>AI Mentor Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
