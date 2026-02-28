import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    xp: 0,
    level: 1,
    roadmap: null,
    currentProject: null,
    completedTasks: [],
    completedProjects: [],
    skillGrowth: {}
  });

  useEffect(() => {
    const savedProgress = authService.getUserData('userProgress');
    if (savedProgress) {
      setProgress(savedProgress);
    }
  }, []);

  const updateProgress = (data) => {
    setProgress(prev => {
      const updated = { ...prev, ...data };
      authService.saveUserData('userProgress', updated);
      return updated;
    });
  };

  const addXP = (amount) => {
    setProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      const updated = { ...prev, xp: newXP, level: newLevel };
      authService.saveUserData('userProgress', updated);
      return updated;
    });
  };

  const completeTask = (projectId, taskId) => {
    setProgress(prev => {
      const taskKey = `${projectId}_${taskId}`;
      if (prev.completedTasks.includes(taskKey)) return prev;
      
      const updated = {
        ...prev,
        completedTasks: [...prev.completedTasks, taskKey],
        xp: prev.xp + 5,
        level: Math.floor((prev.xp + 5) / 100) + 1
      };
      authService.saveUserData('userProgress', updated);
      return updated;
    });
  };

  const completeProject = (projectId) => {
    setProgress(prev => {
      if (prev.completedProjects.includes(projectId)) return prev;
      
      const updated = {
        ...prev,
        completedProjects: [...prev.completedProjects, projectId],
        xp: prev.xp + 25,
        level: Math.floor((prev.xp + 25) / 100) + 1
      };
      authService.saveUserData('userProgress', updated);
      return updated;
    });
  };

  const setRoadmap = (roadmap) => {
    updateProgress({ roadmap });
  };

  const setCurrentProject = (project) => {
    updateProgress({ currentProject: project });
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      updateProgress,
      addXP,
      completeTask,
      completeProject,
      setRoadmap,
      setCurrentProject
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};
