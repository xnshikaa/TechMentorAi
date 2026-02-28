import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { ProgressProvider } from './context/ProgressContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectView from './pages/ProjectView';
import SkillBooster from './pages/SkillBooster';
import Facts from './pages/Facts';

// Components
import Questionnaire from './components/Questionnaire/Questionnaire';
import READMEGenerator from './components/READMEGenerator/READMEGenerator';
import LinkedInGenerator from './components/LinkedInGenerator/LinkedInGenerator';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route
        path="/questionnaire"
        element={
          <ProtectedRoute>
            <Questionnaire />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/project/:projectId"
        element={
          <ProtectedRoute>
            <ProjectView />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/skill-booster"
        element={
          <ProtectedRoute>
            <SkillBooster />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/facts"
        element={
          <ProtectedRoute>
            <Facts />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/generate/readme"
        element={
          <ProtectedRoute>
            <READMEGenerator />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/generate/linkedin"
        element={
          <ProtectedRoute>
            <LinkedInGenerator />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <ProgressProvider>
          <AppRoutes />
        </ProgressProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
