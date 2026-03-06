import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Brain, Volume2 } from 'lucide-react';
import Flashcards from '../components/Flashcards/Flashcards';
import './SkillBooster.css';

const pythonQuestions = [
  {
    id: 1,
    question: "What will be the output of: print(type([]))?",
    options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
    correct: 0,
    topic: "Data Types",
    explanation: "The empty brackets [] create a list in Python. The type() function returns the class type of the object, which is 'list'."
  },
  {
    id: 2,
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "func", "define"],
    correct: 1,
    topic: "Functions",
    explanation: "In Python, the 'def' keyword is used to define functions. Example: def my_function():"
  },
  {
    id: 3,
    question: "What is the correct way to create a dictionary?",
    options: ["dict = []", "dict = {}", "dict = ()", "dict = <>"],
    correct: 1,
    topic: "Data Structures",
    explanation: "Dictionaries in Python are created using curly braces {}. They store key-value pairs."
  }
];

const SkillBooster = () => {
  const navigate = useNavigate();
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const question = pythonQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === pythonQuestions.length - 1;

  const handleAnswerSelect = (index) => {
    if (showExplanation) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === question.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Quiz completed - score already includes all answered questions
      alert(`Quiz Complete! Score: ${score}/${pythonQuestions.length}`);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setScore(0);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleReadAloud = () => {
    setIsReading(true);
    // Call Amazon Polly API
    setTimeout(() => setIsReading(false), 2000);
  };

  if (showFlashcards) {
    return <Flashcards onClose={() => setShowFlashcards(false)} />;
  }

  return (
    <div className="skill-booster-container">
      <div className="skill-booster-header">
        <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <div className="skill-booster-content">
        <div className="booster-intro">
          <div className="intro-icon">
            <Brain size={48} />
          </div>
          <h1>Python Skill Booster</h1>
          <p>Test your Python knowledge and learn with explanations</p>
        </div>

        <div className="booster-actions">
          <button className="action-card-large" onClick={() => setShowFlashcards(true)}>
            <BookOpen size={32} />
            <h3>Revise With Me</h3>
            <p>Quick revision flashcards</p>
          </button>
        </div>

        <div className="quiz-section">
          <div className="quiz-header">
            <h2>Python Quiz</h2>
            <span className="quiz-progress">Question {currentQuestion + 1} of {pythonQuestions.length}</span>
          </div>

          <div className="quiz-card">
            <div className="topic-badge">{question.topic}</div>
            
            <h3 className="question-text">{question.question}</h3>

            <div className="options-list">
              {question.options.map((option, index) => {
                let optionClass = 'option-item';
                
                if (showExplanation) {
                  if (index === question.correct) {
                    optionClass += ' correct';
                  } else if (index === selectedAnswer && index !== question.correct) {
                    optionClass += ' incorrect';
                  }
                }
                
                if (selectedAnswer === index && !showExplanation) {
                  optionClass += ' selected';
                }

                return (
                  <button
                    key={index}
                    className={optionClass}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option}</span>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="explanation-panel">
                <div className="explanation-header">
                  <h4>
                    {selectedAnswer === question.correct ? '✅ Correct!' : '❌ Incorrect'}
                  </h4>
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={handleReadAloud}
                    disabled={isReading}
                  >
                    <Volume2 size={16} />
                    {isReading ? 'Reading...' : 'Read Aloud'}
                  </button>
                </div>
                <p>{question.explanation}</p>
                <button className="btn btn-primary" onClick={handleNext}>
                  {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            )}
          </div>

          <div className="score-display">
            <span>Score: {score}/{pythonQuestions.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillBooster;
