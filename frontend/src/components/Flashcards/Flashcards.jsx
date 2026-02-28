import React, { useState } from 'react';
import { X, ArrowRight, Volume2, RotateCcw } from 'lucide-react';
import './Flashcards.css';

const flashcardsData = {
  moduleName: 'Python Fundamentals',
  cards: [
    {
      topicTitle: 'What is Python?',
      contentText: 'Python is a high-level, interpreted programming language used for web development, AI, automation, data science, and more. It\'s known for its simple, readable syntax.',
      difficultyLevel: 'Basic'
    },
    {
      topicTitle: 'Variables in Python',
      contentText: 'Variables in Python are dynamically typed, meaning you don\'t need to declare their data type explicitly. Example: name = "Alice" creates a string variable.',
      difficultyLevel: 'Basic'
    },
    {
      topicTitle: 'Python Functions',
      contentText: 'Functions in Python are defined using the "def" keyword and help in modular programming. They can take parameters and return values. Example: def greet(name): return f"Hello {name}"',
      difficultyLevel: 'Basic'
    },
    {
      topicTitle: 'Lists in Python',
      contentText: 'Lists are ordered, mutable collections that can hold items of different types. Created with square brackets: my_list = [1, 2, "three", 4.0]',
      difficultyLevel: 'Intermediate'
    },
    {
      topicTitle: 'Dictionaries',
      contentText: 'Dictionaries store data as key-value pairs, created with curly braces. Example: person = {"name": "Alice", "age": 25}. Access values using keys: person["name"]',
      difficultyLevel: 'Intermediate'
    },
    {
      topicTitle: 'For Loops',
      contentText: 'For loops iterate over sequences. Syntax: for item in sequence: # do something. Example: for i in range(5): print(i) prints 0 to 4',
      difficultyLevel: 'Intermediate'
    },
    {
      topicTitle: 'If-Else Statements',
      contentText: 'Conditional statements control program flow. Syntax: if condition: # code elif other_condition: # code else: # code. Uses indentation for blocks.',
      difficultyLevel: 'Basic'
    },
    {
      topicTitle: 'String Methods',
      contentText: 'Python strings have built-in methods: .upper(), .lower(), .strip(), .split(), .replace(). Example: "hello".upper() returns "HELLO"',
      difficultyLevel: 'Intermediate'
    },
    {
      topicTitle: 'List Comprehensions',
      contentText: 'Concise way to create lists: [expression for item in iterable if condition]. Example: squares = [x**2 for x in range(10)] creates [0, 1, 4, 9, 16...]',
      difficultyLevel: 'Advanced'
    },
    {
      topicTitle: 'Try-Except Blocks',
      contentText: 'Handle errors gracefully using try-except. Example: try: result = 10/0 except ZeroDivisionError: print("Cannot divide by zero"). Prevents program crashes.',
      difficultyLevel: 'Advanced'
    },
    {
      topicTitle: 'Classes and Objects',
      contentText: 'Classes are blueprints for objects. Syntax: class Dog: def __init__(self, name): self.name = name. Create objects: my_dog = Dog("Buddy")',
      difficultyLevel: 'Advanced'
    },
    {
      topicTitle: 'Modules and Imports',
      contentText: 'Modules are Python files containing functions/classes. Import with: import math or from math import sqrt. Helps organize and reuse code across projects.',
      difficultyLevel: 'Intermediate'
    }
  ]
};

const Flashcards = ({ onClose }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const card = flashcardsData.cards[currentCard];
  const progress = ((currentCard + 1) / flashcardsData.cards.length) * 100;

  const handleNext = () => {
    if (currentCard < flashcardsData.cards.length - 1) {
      setCurrentCard(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentCard(0);
  };

  const handleReadAloud = () => {
    setIsReading(true);
    // Call Amazon Polly API
    setTimeout(() => setIsReading(false), 2000);
  };

  const isLastCard = currentCard === flashcardsData.cards.length - 1;

  return (
    <div className="flashcards-overlay">
      <div className="flashcards-container">
        <div className="flashcards-header">
          <div>
            <h2>{flashcardsData.moduleName}</h2>
            <p className="card-counter">Card {currentCard + 1} of {flashcardsData.cards.length}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="progress-bar-flashcard">
          <div className="progress-fill-flashcard" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flashcard-content">
          <span className={`difficulty-badge difficulty-${card.difficultyLevel.toLowerCase()}`}>
            {card.difficultyLevel}
          </span>
          
          <h3 className="card-topic">{card.topicTitle}</h3>
          <p className="card-text">{card.contentText}</p>

          <button 
            className="btn btn-secondary read-btn"
            onClick={handleReadAloud}
            disabled={isReading}
          >
            <Volume2 size={18} />
            {isReading ? 'Reading...' : '🔊 Read Aloud'}
          </button>
        </div>

        <div className="flashcards-actions">
          {!isLastCard ? (
            <button className="btn btn-primary btn-large" onClick={handleNext}>
              Next Card
              <ArrowRight size={20} />
            </button>
          ) : (
            <div className="completion-actions">
              <div className="completion-message">
                <h3>🎉 Module Complete!</h3>
                <p>Great job! You've reviewed all {flashcardsData.cards.length} cards.</p>
              </div>
              <div className="completion-buttons">
                <button className="btn btn-outline" onClick={handleRestart}>
                  <RotateCcw size={18} />
                  Restart Module
                </button>
                <button className="btn btn-primary" onClick={onClose}>
                  Back to Skill Booster
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
