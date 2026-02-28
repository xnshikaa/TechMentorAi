const authService = {
  login: (username) => {
    const userId = `user_${Date.now()}`;
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    return { userId, username };
  },

  logout: () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userRoadmap');
    localStorage.removeItem('userProgress');
  },

  getCurrentUser: () => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    return userId ? { userId, username } : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('userId');
  },

  saveUserData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getUserData: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
};

export default authService;
