import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { CheckCircle, Circle, ArrowLeft, MessageCircle, FileText, Linkedin } from 'lucide-react';
import MentorChat from '../components/MentorChat/MentorChat';
import './ProjectView.css';

// Project data with daily tasks
const projectsData = {
  fe_1: {
    id: 'fe_1',
    name: 'Personal Portfolio Website',
    level: 'beginner',
    description: 'Build a stunning portfolio website to showcase your projects and skills',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    expectedOutcome: 'A responsive, professional portfolio website deployed online',
    dailyTasks: [
      {
        id: 1,
        day: 1,
        title: 'Setup Project Structure',
        description: 'Create project folders, initialize Git, set up basic HTML structure',
        hints: ['Create index.html', 'Link CSS file', 'Set up basic HTML5 boilerplate']
      },
      {
        id: 2,
        day: 2,
        title: 'Build Core UI',
        description: 'Design header, about section, and navigation',
        hints: ['Use semantic HTML', 'Create navigation menu', 'Add hero section']
      },
      {
        id: 3,
        day: 3,
        title: 'Implement Styling',
        description: 'Add CSS styling, make it responsive',
        hints: ['Use flexbox/grid', 'Add media queries', 'Choose color scheme']
      },
      {
        id: 4,
        day: 4,
        title: 'Add Interactivity',
        description: 'Implement JavaScript for smooth scrolling and animations',
        hints: ['Add event listeners', 'Smooth scroll navigation', 'Form validation']
      },
      {
        id: 5,
        day: 5,
        title: 'Final Polish & Deploy',
        description: 'Test across devices, optimize, and deploy to GitHub Pages',
        hints: ['Cross-browser testing', 'Optimize images', 'Deploy to hosting']
      }
    ]
  },
  fe_2: {
    id: 'fe_2',
    name: 'Todo App with Local Storage',
    level: 'intermediate',
    description: 'Create an interactive todo application with persistent storage',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Local Storage'],
    expectedOutcome: 'A fully functional todo app that saves data locally',
    dailyTasks: [
      {
        id: 1,
        day: 1,
        title: 'Setup & Design UI',
        description: 'Create the interface for adding and displaying todos',
        hints: ['Input field for new todos', 'List container', 'Action buttons']
      },
      {
        id: 2,
        day: 2,
        title: 'Implement Add/Delete',
        description: 'Build functionality to add and remove todos',
        hints: ['Event listeners', 'Array manipulation', 'DOM updates']
      },
      {
        id: 3,
        day: 3,
        title: 'Add Local Storage',
        description: 'Persist todos using browser local storage',
        hints: ['localStorage.setItem', 'JSON.stringify', 'Load on page load']
      },
      {
        id: 4,
        day: 4,
        title: 'Implement Edit & Complete',
        description: 'Add ability to edit todos and mark as complete',
        hints: ['Toggle completion', 'Edit inline', 'Strike-through styling']
      },
      {
        id: 5,
        day: 5,
        title: 'Polish & Add Filters',
        description: 'Add filter options (all, active, completed) and polish UI',
        hints: ['Filter buttons', 'Conditional rendering', 'Smooth animations']
      }
    ]
  },
  // Add more projects...
};

const ProjectView = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { progress, completeTask, completeProject, setCurrentProject } = useProgress();
  const [showMentor, setShowMentor] = useState(false);
  const [showGenerators, setShowGenerators] = useState(false);

  const project = projectsData[projectId];

  useEffect(() => {
    if (project && progress.currentProject !== projectId) {
      setCurrentProject(projectId);
    }
  }, [projectId]);

  if (!project) {
    return <div>Project not found</div>;
  }

  const completedTaskKeys = progress.completedTasks.filter(task => 
    task.startsWith(projectId)
  );
  const completedCount = completedTaskKeys.length;
  const totalTasks = project.dailyTasks.length;
  const isProjectComplete = completedCount === totalTasks;

  const handleTaskComplete = (taskId) => {
    completeTask(projectId, taskId);
    if (completedCount + 1 === totalTasks) {
      completeProject(projectId);
      setShowGenerators(true);
    }
  };

  const isTaskCompleted = (taskId) => {
    return progress.completedTasks.includes(`${projectId}_${taskId}`);
  };

  return (
    <div className="project-view-container">
      <div className="project-header">
        <button className="btn btn-outline back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>

      <div className="project-content">
        <div className="project-info">
          <span className={`level-badge level-${project.level}`}>{project.level}</span>
          <h1>{project.name}</h1>
          <p className="project-description">{project.description}</p>

          <div className="project-meta">
            <div className="meta-item">
              <strong>Tech Stack:</strong>
              <div className="tech-tags">
                {project.techStack.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            <div className="meta-item">
              <strong>Expected Outcome:</strong>
              <p>{project.expectedOutcome}</p>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <h3>Progress</h3>
              <span className="progress-text">{completedCount}/{totalTasks} tasks completed</span>
            </div>
            <div className="progress-bar-large">
              <div 
                className="progress-fill-large" 
                style={{ width: `${(completedCount / totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="tasks-section">
          <h2>Daily Tasks</h2>
          <div className="tasks-list">
            {project.dailyTasks.map((task) => {
              const completed = isTaskCompleted(task.id);
              
              return (
                <div key={task.id} className={`task-card ${completed ? 'completed' : ''}`}>
                  <div className="task-header">
                    <div className="task-title-section">
                      <button
                        className="task-checkbox"
                        onClick={() => !completed && handleTaskComplete(task.id)}
                        disabled={completed}
                      >
                        {completed ? (
                          <CheckCircle size={24} className="check-icon completed" />
                        ) : (
                          <Circle size={24} className="check-icon" />
                        )}
                      </button>
                      <div>
                        <span className="day-label">Day {task.day}</span>
                        <h3>{task.title}</h3>
                      </div>
                    </div>
                    {completed && <span className="xp-badge">+5 XP</span>}
                  </div>

                  <p className="task-description">{task.description}</p>

                  {!completed && task.hints && (
                    <div className="task-hints">
                      <strong>💡 Hints:</strong>
                      <ul>
                        {task.hints.map((hint, index) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {isProjectComplete && (
          <div className="completion-section">
            <div className="completion-card">
              <h2>🎉 Project Complete!</h2>
              <p>Congratulations! You've completed all tasks. Now showcase your work!</p>
              <div className="completion-actions">
                <button className="btn btn-primary" onClick={() => navigate('/generate/readme')}>
                  <FileText size={18} />
                  Generate README
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/generate/linkedin')}>
                  <Linkedin size={18} />
                  Create LinkedIn Post
                </button>
              </div>
              <span className="completion-xp">+25 XP Bonus!</span>
            </div>
          </div>
        )}
      </div>

      <button 
        className="floating-mentor-btn"
        onClick={() => setShowMentor(!showMentor)}
      >
        <MessageCircle size={24} />
      </button>

      {showMentor && (
        <MentorChat 
          project={project}
          onClose={() => setShowMentor(false)}
        />
      )}
    </div>
  );
};

export default ProjectView;
