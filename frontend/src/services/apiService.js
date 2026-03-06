import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      config.headers["X-User-Id"] = userId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const apiService = {
  // Authentication
  login: (username) => api.post("/auth/login", { username }),

  // Questionnaire
  getQuestionnaire: () => api.get("/questionnaire"),
  submitQuestionnaire: (responses) =>
    api.post("/questionnaire/submit", { responses }),

  // Roadmap
  getRoadmap: (interest) => api.get(`/roadmap/${interest}`),

  // Projects
  getProject: (projectId) => api.get(`/project/${projectId}`),
  getProjectsByRoadmap: (roadmapId) =>
    api.get(`/projects/roadmap/${roadmapId}`),

  // Tasks
  completeTask: (userId, projectId, taskId) =>
    api.post("/task/complete", { userId, projectId, taskId }),

  // Mentor Chat
  sendMentorMessage: (message, context) =>
    api.post("/mentor", { message, context }),

  // Progress
  getProgress: (userId) => api.get(`/progress/${userId}`),
  updateProgress: (userId, updates) =>
    api.post("/progress/update", { userId, updates }),

  // Flashcards
  getFlashcards: (moduleId) => api.get(`/flashcards/${moduleId}`),

  // Facts
  getRandomFact: () => api.get("/facts/random"),
  getRandomWebsite: () => api.get("/facts/website"),

  // AI Generators
  generateReadme: (projectData) =>
    api.post("/generate-readme", { projectData }),

  generateLinkedInPost: (projectData) =>
    api.post("/generate-linkedin", { projectData }),

  // Text To Speech
  getAudioUrl: (text) => api.post("/tts/generate", { text }),

  // Skill Booster
  evaluateAnswer: (questionId, answer, correctAnswer) =>
    api.post("/skill-booster/evaluate", {
      questionId,
      answer,
      correctAnswer,
    }),
};

export default apiService;