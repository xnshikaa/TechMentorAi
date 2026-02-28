import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useUser } from '../context/UserContext';
import XPDisplay from '../components/XPDisplay/XPDisplay';
import { Code, Database, Layout, ArrowRight, Volume2, BookOpen } from 'lucide-react';
import './Dashboard.css';

// Roadmap data
const roadmapsData = {
  frontend: {
    name: 'Frontend Development',
    icon: <Layout size={32} />,
    color: '#FF6B6B',
    stages: [
      { id: 1, name: 'Internet Basics', description: 'How the web works, HTTP, browsers', completed: false },
      { id: 2, name: 'HTML', description: 'Structure of web pages', completed: false },
      { id: 3, name: 'CSS', description: 'Styling and layout', completed: false },
      { id: 4, name: 'JavaScript', description: 'Programming for the web', completed: false },
      { id: 5, name: 'Git & GitHub', description: 'Version control basics', completed: false },
      { id: 6, name: 'React Basics', description: 'Modern UI library', completed: false }
    ],
    projects: [
      { id: 'fe_1', level: 'beginner', name: 'Personal Portfolio Website' },
      { id: 'fe_2', level: 'intermediate', name: 'Todo App with Local Storage' },
      { id: 'fe_3', level: 'advanced', name: 'Weather Dashboard with API' }
    ]
  },
  backend: {
    name: 'Backend Development',
    icon: <Database size={32} />,
    color: '#4ECDC4',
    stages: [
      { id: 1, name: 'Internet Basics', description: 'How servers work, protocols', completed: false },
      { id: 2, name: 'Programming Fundamentals', description: 'Python/Node.js basics', completed: false },
      { id: 3, name: 'Databases', description: 'SQL and NoSQL basics', completed: false },
      { id: 4, name: 'APIs', description: 'RESTful API design', completed: false },
      { id: 5, name: 'Authentication', description: 'User auth & security', completed: false },
      { id: 6, name: 'Deployment', description: 'Hosting and cloud basics', completed: false }
    ],
    projects: [
      { id: 'be_1', level: 'beginner', name: 'Simple REST API' },
      { id: 'be_2', level: 'intermediate', name: 'User Authentication System' },
      { id: 'be_3', level: 'advanced', name: 'Blog API with Database' }
    ]
  },
  fullstack: {
    name: 'Full Stack Development',
    icon: <Code size={32} />,
    color: '#FFD93D',
    stages: [
      { id: 1, name: 'Web Fundamentals', description: 'HTML, CSS, JavaScript', completed: false },
      { id: 2, name: 'Frontend Framework', description: 'React basics', completed: false },
      { id: 3, name: 'Backend Basics', description: 'Node.js & Express', completed: false },
      { id: 4, name: 'Databases', description: 'MongoDB/PostgreSQL', completed: false },
      { id: 5, name: 'API Integration', description: 'Connecting frontend to backend', completed: false },
      { id: 6, name: 'Deployment', description: 'Full app deployment', completed: false }
    ],
    projects: [
      { id: 'fs_1', level: 'beginner', name: 'Task Manager App' },
      { id: 'fs_2', level: 'intermediate', name: 'Social Media Dashboard' },
      { id: 'fs_3', level: 'advanced', name: 'E-commerce Platform' }
    ]
  }
};

const Dashboard = () => {
  const { progress } = useProgress();
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);
  const [isReading, setIsReading] = useState(false);

  const roadmap = roadmapsData[progress.roadmap || 'frontend'];

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
  };

  const handleReadAloud = () => {
    if (selectedStage) {
      setIsReading(true);
      // This would call Amazon Polly via API
      // apiService.getAudioUrl(selectedStage.description).then(...)
      setTimeout(() => setIsReading(false), 2000);
    }
  };

  const handleStartProject = (project) => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Welcome back, {user?.username}! 🎉</h1>
            <p>Your {roadmap.name} Journey</p>
          </div>
          <XPDisplay />
        </div>
      </header>

      <div className="dashboard-content">
        <div className="roadmap-section">
          <div className="section-header">
            <div className="roadmap-title">
              <div className="roadmap-icon" style={{ background: roadmap.color }}>
                {roadmap.icon}
              </div>
              <div>
                <h2>Learning Roadmap</h2>
                <p>Master these concepts step by step</p>
              </div>
            </div>
          </div>

          <div className="roadmap-grid">
            {roadmap.stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`stage-card ${stage.completed ? 'completed' : ''} ${selectedStage?.id === stage.id ? 'selected' : ''}`}
                onClick={() => handleStageClick(stage)}
              >
                <div className="stage-number">{index + 1}</div>
                <div className="stage-content">
                  <h3>{stage.name}</h3>
                  <p>{stage.description}</p>
                </div>
                {stage.completed && <span className="completed-badge">✓</span>}
              </div>
            ))}
          </div>

          {selectedStage && (
            <div className="stage-details">
              <div className="details-content">
                <BookOpen size={24} />
                <div>
                  <h3>{selectedStage.name}</h3>
                  <p>{selectedStage.description}</p>
                </div>
              </div>
              <button className="btn btn-secondary" onClick={handleReadAloud} disabled={isReading}>
                <Volume2 size={18} />
                {isReading ? 'Reading...' : 'Read Aloud'}
              </button>
            </div>
          )}
        </div>

        <div className="projects-section">
          <div className="section-header">
            <h2>Your Projects</h2>
            <p>Build real portfolio pieces</p>
          </div>

          <div className="projects-grid">
            {roadmap.projects.map((project) => {
              const isCompleted = progress.completedProjects.includes(project.id);
              const isCurrent = progress.currentProject === project.id;
              
              return (
                <div key={project.id} className={`project-card ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="project-header">
                    <span className={`level-badge level-${project.level}`}>
                      {project.level}
                    </span>
                    {isCompleted && <span className="completed-badge">✓</span>}
                  </div>
                  <h3>{project.name}</h3>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleStartProject(project)}
                  >
                    {isCompleted ? 'View Again' : isCurrent ? 'Continue' : 'Start Project'}
                    <ArrowRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="quick-actions">
          <button className="action-card" onClick={() => navigate('/skill-booster')}>
            <span className="action-icon">🐍</span>
            <div>
              <h3>Python Skill Booster</h3>
              <p>Test and improve your Python skills</p>
            </div>
          </button>
          <button className="action-card" onClick={() => navigate('/facts')}>
            <span className="action-icon">💡</span>
            <div>
              <h3>Tech Facts</h3>
              <p>Learn something new today</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
