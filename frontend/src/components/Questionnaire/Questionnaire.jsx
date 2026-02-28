import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useProgress } from '../../context/ProgressContext';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import './Questionnaire.css';

const questions = [
  {
    id: 1,
    question: "Do you enjoy designing visual interfaces or building logic systems?",
    options: [
      { value: "visual", label: "Designing Visual Interfaces", weight: { frontend: 3, backend: 0, fullstack: 1 } },
      { value: "logic", label: "Building Logic Systems", weight: { frontend: 0, backend: 3, fullstack: 1 } },
      { value: "both", label: "Both equally", weight: { frontend: 1, backend: 1, fullstack: 3 } }
    ]
  },
  {
    id: 2,
    question: "Do you prefer working on user experience or server-side logic?",
    options: [
      { value: "ux", label: "User Experience", weight: { frontend: 3, backend: 0, fullstack: 1 } },
      { value: "server", label: "Server-side Logic", weight: { frontend: 0, backend: 3, fullstack: 1 } },
      { value: "both", label: "Both", weight: { frontend: 1, backend: 1, fullstack: 3 } }
    ]
  },
  {
    id: 3,
    question: "Have you built APIs before?",
    options: [
      { value: "yes", label: "Yes, I have", weight: { frontend: 0, backend: 3, fullstack: 2 } },
      { value: "no", label: "No, but interested", weight: { frontend: 0, backend: 2, fullstack: 2 } },
      { value: "not_interested", label: "Not really interested", weight: { frontend: 3, backend: 0, fullstack: 1 } }
    ]
  },
  {
    id: 4,
    question: "Have you styled websites using CSS?",
    options: [
      { value: "yes", label: "Yes, I love it", weight: { frontend: 3, backend: 0, fullstack: 2 } },
      { value: "some", label: "A little bit", weight: { frontend: 2, backend: 0, fullstack: 2 } },
      { value: "no", label: "Not yet", weight: { frontend: 1, backend: 2, fullstack: 1 } }
    ]
  },
  {
    id: 5,
    question: "Do you enjoy working with databases?",
    options: [
      { value: "yes", label: "Yes, definitely", weight: { frontend: 0, backend: 3, fullstack: 2 } },
      { value: "maybe", label: "Open to learning", weight: { frontend: 1, backend: 2, fullstack: 2 } },
      { value: "no", label: "Prefer other things", weight: { frontend: 3, backend: 0, fullstack: 1 } }
    ]
  },
  {
    id: 6,
    question: "Would you rather create mobile/web apps or backend services?",
    options: [
      { value: "apps", label: "Mobile/Web Apps", weight: { frontend: 3, backend: 0, fullstack: 1 } },
      { value: "backend", label: "Backend Services", weight: { frontend: 0, backend: 3, fullstack: 1 } },
      { value: "both", label: "Both", weight: { frontend: 1, backend: 1, fullstack: 3 } }
    ]
  }
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { user } = useUser();
  const { setRoadmap } = useProgress();
  const navigate = useNavigate();

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      analyzeAndAssignPath();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const analyzeAndAssignPath = () => {
    setIsAnalyzing(true);
    
    // Calculate scores based on weighted responses
    const scores = { frontend: 0, backend: 0, fullstack: 0 };
    
    Object.values(answers).forEach(answer => {
      scores.frontend += answer.weight.frontend;
      scores.backend += answer.weight.backend;
      scores.fullstack += answer.weight.fullstack;
    });

    // Determine the best path
    let assignedPath = 'fullstack';
    if (scores.frontend > scores.backend && scores.frontend > scores.fullstack) {
      assignedPath = 'frontend';
    } else if (scores.backend > scores.frontend && scores.backend > scores.fullstack) {
      assignedPath = 'backend';
    }

    setTimeout(() => {
      setRoadmap(assignedPath);
      navigate('/dashboard');
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasAnswer = answers[currentQ.id];

  if (isAnalyzing) {
    return (
      <div className="questionnaire-container analyzing">
        <div className="analyzing-content">
          <Sparkles className="analyzing-icon" size={60} />
          <h2>Analyzing Your Responses...</h2>
          <p>Finding the perfect learning path for you</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="questionnaire-header">
          <p className="greeting">Hey {user?.username}! 👋</p>
          <p className="question-counter">Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        <div className="question-content">
          <h2>{currentQ.question}</h2>
          
          <div className="options">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                className={`option-card ${answers[currentQ.id]?.value === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQ.id, option)}
              >
                <span className="option-label">{option.label}</span>
                {answers[currentQ.id]?.value === option.value && (
                  <span className="check-mark">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="navigation-buttons">
          {currentQuestion > 0 && (
            <button className="btn btn-outline" onClick={handleBack}>
              <ArrowLeft size={20} />
              Back
            </button>
          )}
          
          <button 
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!hasAnswer}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
