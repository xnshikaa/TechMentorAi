import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Globe, Volume2, RefreshCw } from 'lucide-react';
import './Facts.css';

const factsData = [
  "The first computer bug was an actual bug – a moth trapped in a Harvard Mark II computer in 1947.",
  "Python was named after the British comedy series 'Monty Python's Flying Circus', not the snake.",
  "The first domain ever registered was Symbolics.com on March 15, 1985.",
  "There are over 700 programming languages in existence today.",
  "The @ symbol in email addresses was chosen by Ray Tomlinson in 1971.",
  "The original name for JavaScript was Mocha, then LiveScript, before becoming JavaScript.",
  "The term 'algorithm' comes from the name of Persian mathematician Al-Khwarizmi.",
  "The first YouTube video was uploaded on April 23, 2005, titled 'Me at the zoo'.",
  "Google was originally called 'Backrub' when it was first created in 1996.",
  "The QWERTY keyboard was designed to slow down typing to prevent typewriter jams.",
  "The first Apple computer, Apple I, was sold for $666.66 in 1976.",
  "Over 90% of the world's currency exists only on computers, not as physical cash.",
  "The first webcam was created at Cambridge University to monitor a coffee pot.",
  "Linux was created by Linus Torvalds when he was just 21 years old.",
  "The first computer mouse was made of wood and had only one button.",
  "WiFi doesn't stand for anything – it's just a catchy name inspired by 'Hi-Fi'.",
  "The word 'robot' comes from the Czech word 'robota', meaning forced labor.",
  "Email existed before the World Wide Web was invented.",
  "The first-ever computer game was created in 1962 and was called Spacewar!",
  "A single Google search uses about 1000 computers in less than 0.2 seconds."
];

const websitesData = [
  {
    name: "MDN Web Docs",
    url: "developer.mozilla.org",
    description: "Comprehensive web development documentation by Mozilla. Best resource for HTML, CSS, and JavaScript references."
  },
  {
    name: "Stack Overflow",
    url: "stackoverflow.com",
    description: "The largest Q&A community for programmers. Find solutions to almost any coding problem."
  },
  {
    name: "GitHub",
    url: "github.com",
    description: "World's largest code hosting platform. Explore open-source projects and collaborate with developers."
  },
  {
    name: "freeCodeCamp",
    url: "freecodecamp.org",
    description: "Learn to code for free with interactive lessons and build real projects for nonprofits."
  },
  {
    name: "CSS-Tricks",
    url: "css-tricks.com",
    description: "Daily articles about CSS, HTML, JavaScript, and web design. Great tutorials and code snippets."
  },
  {
    name: "Dev.to",
    url: "dev.to",
    description: "Community of software developers sharing articles, tutorials, and insights."
  },
  {
    name: "Codecademy",
    url: "codecademy.com",
    description: "Interactive platform to learn coding through hands-on practice."
  },
  {
    name: "LeetCode",
    url: "leetcode.com",
    description: "Practice coding problems and prepare for technical interviews."
  },
  {
    name: "Can I Use",
    url: "caniuse.com",
    description: "Check browser support for web technologies. Essential for frontend developers."
  },
  {
    name: "JavaScript.info",
    url: "javascript.info",
    description: "Modern JavaScript tutorial from basics to advanced topics with clear examples."
  }
];

const Facts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('facts');
  const [currentFact, setCurrentFact] = useState(factsData[0]);
  const [currentWebsite, setCurrentWebsite] = useState(websitesData[0]);
  const [isReading, setIsReading] = useState(false);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * factsData.length);
    setCurrentFact(factsData[randomIndex]);
  };

  const getRandomWebsite = () => {
    const randomIndex = Math.floor(Math.random() * websitesData.length);
    setCurrentWebsite(websitesData[randomIndex]);
  };

  const handleReadAloud = () => {
    setIsReading(true);
    // Call Amazon Polly API
    setTimeout(() => setIsReading(false), 3000);
  };

  return (
    <div className="facts-container">
      <div className="facts-header">
        <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <div className="facts-content">
        <div className="facts-intro">
          <Lightbulb size={48} className="facts-icon" />
          <h1>Tech Facts & Resources</h1>
          <p>Expand your knowledge with interesting tech facts and useful websites</p>
        </div>

        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'facts' ? 'active' : ''}`}
            onClick={() => setActiveTab('facts')}
          >
            <Lightbulb size={20} />
            Facts You Wanna Know
          </button>
          <button
            className={`tab-btn ${activeTab === 'websites' ? 'active' : ''}`}
            onClick={() => setActiveTab('websites')}
          >
            <Globe size={20} />
            Websites You Wanna Know
          </button>
        </div>

        {activeTab === 'facts' ? (
          <div className="fact-card">
            <div className="fact-icon">💡</div>
            <p className="fact-text">{currentFact}</p>
            <div className="fact-actions">
              <button
                className="btn btn-secondary"
                onClick={handleReadAloud}
                disabled={isReading}
              >
                <Volume2 size={18} />
                {isReading ? 'Reading...' : 'Read Aloud'}
              </button>
              <button className="btn btn-primary" onClick={getRandomFact}>
                <RefreshCw size={18} />
                Another Fact
              </button>
            </div>
          </div>
        ) : (
          <div className="website-card">
            <div className="website-icon">
              <Globe size={32} />
            </div>
            <h2>{currentWebsite.name}</h2>
            <a href={`https://${currentWebsite.url}`} target="_blank" rel="noopener noreferrer" className="website-url">
              {currentWebsite.url}
            </a>
            <p className="website-description">{currentWebsite.description}</p>
            <div className="website-actions">
              <button
                className="btn btn-secondary"
                onClick={handleReadAloud}
                disabled={isReading}
              >
                <Volume2 size={18} />
                {isReading ? 'Reading...' : 'Read Aloud'}
              </button>
              <button className="btn btn-primary" onClick={getRandomWebsite}>
                <RefreshCw size={18} />
                Another Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Facts;
