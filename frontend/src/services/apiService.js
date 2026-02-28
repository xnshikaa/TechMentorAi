import axios from 'axios';

// Configure base API URL - replace with your API Gateway endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-api-gateway-url.amazonaws.com/prod';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token if needed
api.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      config.headers['X-User-Id'] = userId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Service methods
const apiService = {
  // User & Authentication
  login: (username) => api.post('/auth/login', { username }),
  
  // Questionnaire
  getQuestionnaire: () => api.get('/questionnaire'),
  submitQuestionnaire: (responses) => api.post('/questionnaire/submit', { responses }),
  
  // Roadmap
  getRoadmap: (interest) => api.get(`/roadmap/${interest}`),
  getRoadmapStage: (stageId) => api.get(`/roadmap/stage/${stageId}`),
  
  // Projects
  getProject: (projectId) => api.get(`/project/${projectId}`),
  getProjectsByRoadmap: (roadmapId) => api.get(`/projects/roadmap/${roadmapId}`),
  
  // Tasks
  completeTask: (projectId, taskId) => api.post('/task/complete', { projectId, taskId }),
  
  // Mentor Chat
  sendMentorMessage: (message, context) => api.post('/mentor/chat', { 
    message, 
    context 
  }),
  
  // Progress & XP
  getProgress: (userId) => api.get(`/progress/${userId}`),
  updateXP: (userId, xpAmount) => api.post('/progress/xp', { userId, xpAmount }),
  
  // Skill Booster
  getPythonQuestions: () => api.get('/skill-booster/questions'),
  evaluateAnswer: (questionId, answer) => api.post('/skill-booster/evaluate', { 
    questionId, 
    answer 
  }),
  getDocumentation: (topicId) => api.get(`/skill-booster/docs/${topicId}`),
  
  // Flashcards
  getFlashcards: (moduleId) => api.get(`/flashcards/${moduleId}`),
  saveFlashcardProgress: (userId, moduleId, progress) => api.post('/flashcards/progress', {
    userId,
    moduleId,
    progress
  }),
  
  // Facts
  getRandomFact: () => api.get('/facts/random'),
  getRandomWebsite: () => api.get('/facts/website'),
  
  // Generators
  generateReadme: (projectData) => api.post('/generate/readme', projectData),
  generateLinkedInPost: (projectData) => api.post('/generate/linkedin', projectData),
  
  // Text-to-Speech
  getAudioUrl: (text) => api.post('/tts/generate', { text }),
};

export default apiService;
