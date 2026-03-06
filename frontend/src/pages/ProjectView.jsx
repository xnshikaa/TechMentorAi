import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { CheckCircle, Circle, ArrowLeft, MessageCircle, FileText, Linkedin } from 'lucide-react';
import MentorChat from '../components/MentorChat/MentorChat';
import apiService from '../services/apiService';
import './ProjectView.css';

// Fallback hardcoded data for all 9 projects (works without API)
const fallbackProjectsData = {
  fe_1: {
    id: 'fe_1',
    name: 'Personal Portfolio Website',
    level: 'beginner',
    roadmap: 'frontend',
    description: 'Build a stunning portfolio website to showcase your projects and skills',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
    expectedOutcome: 'A fully responsive, professional portfolio website deployed online',
    dailyTasks: [
      { id: 1, day: 1, title: 'Project Planning & Setup', description: 'Plan portfolio structure, set up development environment, initialize Git', hints: ['Sketch wireframe', 'Create folders', 'Initialize Git'] },
      { id: 2, day: 2, title: 'HTML Structure - Header & Hero', description: 'Build header with navigation and hero section', hints: ['Use semantic HTML', 'Create sticky nav', 'Add hero section'] },
      { id: 3, day: 3, title: 'HTML Structure - About & Skills', description: 'Create About section and Skills showcase', hints: ['Write bio', 'List skills', 'Add photo'] },
      { id: 4, day: 4, title: 'HTML Structure - Projects & Contact', description: 'Build projects showcase and contact form', hints: ['Create cards', 'Add form', 'Social links'] },
      { id: 5, day: 5, title: 'CSS Styling - Base & Typography', description: 'Set up CSS variables, reset styles, typography', hints: ['CSS custom properties', 'Google Fonts', 'Color palette'] },
      { id: 6, day: 6, title: 'CSS Styling - Layout & Components', description: 'Style all components with modern design', hints: ['Use Flexbox', 'Add hover effects', 'Button transitions'] },
      { id: 7, day: 7, title: 'Responsive Design', description: 'Make portfolio responsive for all devices', hints: ['Mobile-first', 'Media queries', 'Test sizes'] },
      { id: 8, day: 8, title: 'JavaScript Interactivity', description: 'Add smooth scrolling, menu toggle, animations', hints: ['Smooth scroll', 'Menu toggle', 'Form validation'] },
      { id: 9, day: 9, title: 'Testing & Optimization', description: 'Test across browsers, optimize performance', hints: ['Test browsers', 'Compress images', 'Lighthouse audit'] },
      { id: 10, day: 10, title: 'Deployment', description: 'Deploy to GitHub Pages and celebrate!', hints: ['Push to GitHub', 'Enable Pages', 'Write README'] }
    ]
  },
  fe_2: {
    id: 'fe_2',
    name: 'Interactive Todo Application',
    level: 'intermediate',
    roadmap: 'frontend',
    description: 'Create a feature-rich todo app with local storage and filters',
    techStack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Local Storage API'],
    expectedOutcome: 'A fully functional todo app with CRUD operations and persistence',
    dailyTasks: [
      { id: 1, day: 1, title: 'Project Architecture', description: 'Plan app structure and data model', hints: ['Design structure', 'Plan state management'] },
      { id: 2, day: 2, title: 'UI Design & HTML', description: 'Create complete UI layout', hints: ['Input field', 'List container'] },
      { id: 3, day: 3, title: 'CSS Styling', description: 'Style with modern design and animations', hints: ['Use Grid/Flexbox', 'Add transitions'] },
      { id: 4, day: 4, title: 'Add & Display Todos', description: 'Implement adding and displaying todos', hints: ['Create Todo class', 'Handle submission'] },
      { id: 5, day: 5, title: 'Delete & Edit', description: 'Add delete and edit functionality', hints: ['Event listeners', 'Inline editing'] },
      { id: 6, day: 6, title: 'Toggle & Filters', description: 'Checkbox and filtering system', hints: ['Toggle state', 'Filter logic'] },
      { id: 7, day: 7, title: 'Local Storage', description: 'Persist todos to browser storage', hints: ['Save on change', 'Load on startup'] },
      { id: 8, day: 8, title: 'Advanced Features', description: 'Priority levels, due dates, search', hints: ['Priority dropdown', 'Date picker'] },
      { id: 9, day: 9, title: 'Polish & Animations', description: 'Micro-interactions and smooth transitions', hints: ['Fade animations', 'Toast notifications'] },
      { id: 10, day: 10, title: 'Deploy & Document', description: 'Test, document, deploy', hints: ['Test features', 'Write README'] }
    ]
  },
  fe_3: {
    id: 'fe_3',
    name: 'Weather Dashboard with API',
    level: 'advanced',
    roadmap: 'frontend',
    description: 'Build weather dashboard using real-time API data with forecasts',
    techStack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Fetch API', 'OpenWeatherMap API', 'Chart.js'],
    expectedOutcome: 'A production-ready weather app with live data and charts',
    dailyTasks: [
      { id: 1, day: 1, title: 'API Setup & Planning', description: 'Get OpenWeatherMap API key, plan architecture', hints: ['Create account', 'Test with Postman'] },
      { id: 2, day: 2, title: 'HTML Structure', description: 'Build dashboard layout', hints: ['Search bar', 'Weather sections'] },
      { id: 3, day: 3, title: 'CSS Styling', description: 'Beautiful UI with glassmorphism', hints: ['Dynamic backgrounds', 'Glassmorphism'] },
      { id: 4, day: 4, title: 'Fetch Current Weather', description: 'API call for current weather', hints: ['Fetch async/await', 'Display data'] },
      { id: 5, day: 5, title: 'Error Handling', description: 'Search functionality and error handling', hints: ['Validate input', 'Handle errors'] },
      { id: 6, day: 6, title: '5-Day Forecast', description: 'Display weather forecast', hints: ['Parse forecast', 'Daily display'] },
      { id: 7, day: 7, title: 'Geolocation', description: 'Current location and saved cities', hints: ['Geolocation API', 'LocalStorage'] },
      { id: 8, day: 8, title: 'Charts', description: 'Add temperature charts with Chart.js', hints: ['Install Chart.js', 'Line chart'] },
      { id: 9, day: 9, title: 'Advanced Features', description: 'Weather alerts, animations, unit toggle', hints: ['Celsius/Fahrenheit', 'Auto-refresh'] },
      { id: 10, day: 10, title: 'Deploy & Optimize', description: 'Test, optimize, deploy', hints: ['Test cases', 'Deploy'] }
    ]
  },
  be_1: {
    id: 'be_1',
    name: 'RESTful Task Management API',
    level: 'beginner',
    roadmap: 'backend',
    description: 'Build complete REST API with CRUD operations and documentation',
    techStack: ['Python', 'FastAPI', 'SQLite', 'Swagger'],
    expectedOutcome: 'A production-ready REST API with proper error handling',
    dailyTasks: [
      { id: 1, day: 1, title: 'Environment Setup', description: 'Setup Python environment and project structure', hints: ['Virtual env', 'Install FastAPI'] },
      { id: 2, day: 2, title: 'Database Design', description: 'Design schema and setup SQLAlchemy', hints: ['Design schema', 'Setup DB'] },
      { id: 3, day: 3, title: 'Create & Read', description: 'POST and GET endpoints', hints: ['POST /tasks', 'GET /tasks'] },
      { id: 4, day: 4, title: 'Update & Delete', description: 'PUT/PATCH and DELETE endpoints', hints: ['PUT endpoints', 'Handle 404s'] },
      { id: 5, day: 5, title: 'Query Parameters', description: 'Filtering, sorting, pagination', hints: ['Add params', 'Pagination'] },
      { id: 6, day: 6, title: 'Validation', description: 'Input validation and error handling', hints: ['Use Pydantic', 'Validate fields'] },
      { id: 7, day: 7, title: 'API Documentation', description: 'Add Swagger/OpenAPI docs', hints: ['FastAPI Swagger', 'Document'] },
      { id: 8, day: 8, title: 'Testing', description: 'Write tests with pytest', hints: ['Install pytest', 'Test endpoints'] },
      { id: 9, day: 9, title: 'Security', description: 'CORS, environment variables, security', hints: ['Enable CORS', 'Rate limiting'] },
      { id: 10, day: 10, title: 'Deploy', description: 'Deploy API to cloud', hints: ['Deploy', 'Write README'] }
    ]
  },
  be_2: {
    id: 'be_2',
    name: 'User Authentication System with JWT',
    level: 'intermediate',
    roadmap: 'backend',
    description: 'Build secure authentication system with JWT and refresh tokens',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'bcrypt', 'Redis'],
    expectedOutcome: 'Production-grade authentication system with role-based access',
    dailyTasks: [
      { id: 1, day: 1, title: 'Project Setup', description: 'Setup PostgreSQL and project', hints: ['Install FastAPI', 'Setup DB'] },
      { id: 2, day: 2, title: 'User Model', description: 'Create User model with password hashing', hints: ['Use bcrypt', 'Hash function'] },
      { id: 3, day: 3, title: 'Registration', description: 'User registration endpoint', hints: ['POST /register', 'Validate email'] },
      { id: 4, day: 4, title: 'JWT Generation', description: 'Access and refresh token generation', hints: ['python-jose', 'Create tokens'] },
      { id: 5, day: 5, title: 'Login', description: 'Login endpoint and token validation', hints: ['POST /login', 'Verify creds'] },
      { id: 6, day: 6, title: 'Refresh Tokens', description: 'Token refresh with Redis', hints: ['Install Redis', 'Store tokens'] },
      { id: 7, day: 7, title: 'Protected Routes', description: 'Role-based access control', hints: ['@require_auth', 'Check roles'] },
      { id: 8, day: 8, title: 'Password Reset', description: 'Logout and password reset', hints: ['POST /logout', 'Reset tokens'] },
      { id: 9, day: 9, title: 'Security & Testing', description: 'Rate limiting and tests', hints: ['Rate limiting', 'Write tests'] },
      { id: 10, day: 10, title: 'Deploy', description: 'Production deployment', hints: ['Deploy', 'Secure env'] }
    ]
  },
  be_3: {
    id: 'be_3',
    name: 'Blog API with PostgreSQL',
    level: 'advanced',
    roadmap: 'backend',
    description: 'Feature-rich blog API with posts, comments, likes, and search',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Elasticsearch'],
    expectedOutcome: 'Scalable blog platform API with advanced features',
    dailyTasks: [
      { id: 1, day: 1, title: 'Database Design', description: 'Design complete schema with relationships', hints: ['Design tables', 'ER diagram'] },
      { id: 2, day: 2, title: 'Models', description: 'SQLAlchemy models with relationships', hints: ['Define relationships', 'Add timestamps'] },
      { id: 3, day: 3, title: 'Post CRUD', description: 'Complete post endpoints', hints: ['POST /posts', 'GET with pagination'] },
      { id: 4, day: 4, title: 'Comments', description: 'Nested comments system', hints: ['POST comments', 'Support threading'] },
      { id: 5, day: 5, title: 'Likes', description: 'Like/unlike functionality', hints: ['POST like', 'Prevent duplicates'] },
      { id: 6, day: 6, title: 'Tags', description: 'Tagging system and filters', hints: ['M2M relationship', 'Filter by tags'] },
      { id: 7, day: 7, title: 'Search', description: 'Full-text search with Elasticsearch', hints: ['Setup Elasticsearch', 'Index posts'] },
      { id: 8, day: 8, title: 'File Uploads', description: 'Image upload with S3', hints: ['Setup S3', 'Upload images'] },
      { id: 9, day: 9, title: 'Optimization', description: 'Caching and query optimization', hints: ['Setup Redis', 'Optimize queries'] },
      { id: 10, day: 10, title: 'Deploy', description: 'Test, document, deploy', hints: ['Write tests', 'Deploy to AWS'] }
    ]
  },
  fs_1: {
    id: 'fs_1',
    name: 'Task Manager Full Stack App',
    level: 'beginner',
    roadmap: 'fullstack',
    description: 'Complete task manager with React frontend and Node.js backend',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    expectedOutcome: 'Fully functional task manager with authentication',
    dailyTasks: [
      { id: 1, day: 1, title: 'Project Setup', description: 'Setup React and Node.js projects', hints: ['Create React app', 'Setup Express'] },
      { id: 2, day: 2, title: 'Backend Database', description: 'MongoDB setup and models', hints: ['Connect MongoDB', 'Create models'] },
      { id: 3, day: 3, title: 'Authentication API', description: 'Register, login, JWT', hints: ['POST /register', 'Generate JWT'] },
      { id: 4, day: 4, title: 'Tasks API', description: 'CRUD API for tasks', hints: ['POST /tasks', 'Associate user'] },
      { id: 5, day: 5, title: 'Frontend UI', description: 'React components and routing', hints: ['Create components', 'Setup Router'] },
      { id: 6, day: 6, title: 'Auth Flow', description: 'Login/register forms', hints: ['Create Context', 'Build forms'] },
      { id: 7, day: 7, title: 'Task Management UI', description: 'Task list and CRUD operations', hints: ['Display tasks', 'Add creation'] },
      { id: 8, day: 8, title: 'State Management', description: 'React Query/SWR integration', hints: ['Install React Query', 'Data caching'] },
      { id: 9, day: 9, title: 'Integration', description: 'Connect frontend to backend', hints: ['Test auth', 'Test CRUD'] },
      { id: 10, day: 10, title: 'Deploy', description: 'Deploy both frontend and backend', hints: ['Deploy backend', 'Deploy frontend'] }
    ]
  },
  fs_2: {
    id: 'fs_2',
    name: 'Social Media Dashboard',
    level: 'intermediate',
    roadmap: 'fullstack',
    description: 'Social platform with posts, comments, likes, and real-time notifications',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Redux'],
    expectedOutcome: 'Feature-rich social platform with real-time updates',
    dailyTasks: [
      { id: 1, day: 1, title: 'Architecture', description: 'Plan and setup monorepo', hints: ['Design architecture', 'Setup projects'] },
      { id: 2, day: 2, title: 'Database Schema', description: 'Complete schema with relationships', hints: ['Design tables', 'Relationships'] },
      { id: 3, day: 3, title: 'Auth System', description: 'Complete authentication', hints: ['JWT auth', 'User profiles'] },
      { id: 4, day: 4, title: 'Posts API', description: 'Posts with image upload', hints: ['POST /posts', 'Image upload'] },
      { id: 5, day: 5, title: 'Comments & Likes', description: 'Comments and likes system', hints: ['POST comments', 'Toggle likes'] },
      { id: 6, day: 6, title: 'Real-time', description: 'Socket.io for notifications', hints: ['Setup Socket.io', 'Emit events'] },
      { id: 7, day: 7, title: 'Frontend UI', description: 'React components with Redux', hints: ['Setup Redux', 'Create components'] },
      { id: 8, day: 8, title: 'Feed & Posts', description: 'Post feed and interactions', hints: ['Infinite scroll', 'Like animations'] },
      { id: 9, day: 9, title: 'Notifications', description: 'Real-time notification system', hints: ['Connect Socket.io', 'Show notifications'] },
      { id: 10, day: 10, title: 'Deploy', description: 'Test, optimize, deploy', hints: ['Test features', 'Deploy'] }
    ]
  },
  fs_3: {
    id: 'fs_3',
    name: 'E-commerce Platform',
    level: 'advanced',
    roadmap: 'fullstack',
    description: 'Complete e-commerce with cart, checkout, Stripe payments, admin panel',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    expectedOutcome: 'Production-ready e-commerce platform with payment processing',
    dailyTasks: [
      { id: 1, day: 1, title: 'System Design', description: 'Design architecture, setup Next.js', hints: ['Design schema', 'Setup Next.js'] },
      { id: 2, day: 2, title: 'Database Models', description: 'Complete e-commerce schema', hints: ['Products, Orders', 'Relationships'] },
      { id: 3, day: 3, title: 'Product API', description: 'Product catalog with search', hints: ['CRUD products', 'Search'] },
      { id: 4, day: 4, title: 'Shopping Cart', description: 'Cart with Redis', hints: ['POST /cart', 'Redis storage'] },
      { id: 5, day: 5, title: 'Checkout', description: 'Checkout flow and orders', hints: ['Validate cart', 'Create order'] },
      { id: 6, day: 6, title: 'Stripe', description: 'Payment processing', hints: ['Setup Stripe', 'Payment intent'] },
      { id: 7, day: 7, title: 'Frontend - Products', description: 'Product pages and cart UI', hints: ['Product grid', 'Cart page'] },
      { id: 8, day: 8, title: 'Frontend - Checkout', description: 'Checkout and payment UI', hints: ['Checkout steps', 'Stripe Elements'] },
      { id: 9, day: 9, title: 'Admin Dashboard', description: 'Admin panel', hints: ['Dashboard metrics', 'Manage products'] },
      { id: 10, day: 10, title: 'Deploy', description: 'Test, optimize, deploy', hints: ['Docker setup', 'Deploy'] }
    ]
  }
};

const ProjectView = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { progress, completeTask, completeProject, setCurrentProject } = useProgress();
  const [showMentor, setShowMentor] = useState(false);
  const [showGenerators, setShowGenerators] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try API first
        try {
          const response = await apiService.getProject(projectId);
          if (response.data.success) {
            setProject(response.data.project);
            return;
          }
        } catch (apiErr) {
          console.log('API failed, trying fallback data...');
        }
        
        // Fallback to hardcoded data
        if (fallbackProjectsData[projectId]) {
          setProject(fallbackProjectsData[projectId]);
        } else {
          setError(`Project not found: ${projectId}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  useEffect(() => {
    if (project && progress.currentProject !== projectId) {
      setCurrentProject(projectId);
    }
  }, [project, projectId]);

  if (loading) {
    return <div className="loading">Loading project...</div>;
  }

  if (error || !project) {
    return <div className="error-message">❌ {error || 'Project not found'}</div>;
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
