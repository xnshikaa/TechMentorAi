import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Download } from 'lucide-react';
import apiService from '../../services/apiService';
import './Generators.css';

const READMEGenerator = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [readme, setReadme] = useState('');

  const generateReadme = async () => {
    setIsGenerating(true);
    
    try {
      // Call Bedrock API to generate README
      const response = await apiService.generateReadme({
        projectId: projectId,
        // Add project details here
      });
      
      setReadme(response.data.readme);
    } catch (error) {
      console.error('README generation error:', error);
      
      // Fallback README template
      const fallbackReadme = `# Personal Portfolio Website

## 📝 Description
A stunning, responsive portfolio website built to showcase projects and skills. This project demonstrates modern web development practices using HTML, CSS, and JavaScript.

## 🚀 Tech Stack
- HTML5
- CSS3
- JavaScript (ES6+)
- Git & GitHub

## ✨ Features
- Responsive design that works on all devices
- Smooth scrolling navigation
- Interactive project showcase
- Contact form
- Modern UI/UX design

## 🎯 Learning Outcomes
- Mastered semantic HTML structure
- Advanced CSS layouts with Flexbox and Grid
- JavaScript DOM manipulation
- Responsive web design principles
- Version control with Git

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git

# Navigate to project directory
cd portfolio

# Open in browser
open index.html
\`\`\`

## 🌐 Live Demo
[View Live Demo](https://yourusername.github.io/portfolio)

## 📸 Screenshots
![Portfolio Screenshot](./screenshot.png)

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is [MIT](LICENSE) licensed.

## 👤 Author
**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)

---
Built with ❤️ as part of TechMentor AI learning journey`;

      setReadme(fallbackReadme);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(readme);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([readme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="generator-container">
      <div className="generator-header">
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <div className="generator-content">
        <div className="generator-intro">
          <h1>📄 README Generator</h1>
          <p>Create a professional README for your GitHub repository</p>
        </div>

        {!readme ? (
          <div className="generator-prompt">
            <div className="prompt-card">
              <h2>Generate Your README</h2>
              <p>Let AI create a comprehensive README.md file for your project with all the essential sections.</p>
              <button
                className="btn btn-primary btn-large"
                onClick={generateReadme}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate README'}
              </button>
            </div>
          </div>
        ) : (
          <div className="generator-result">
            <div className="result-actions">
              <button className="btn btn-secondary" onClick={handleCopy}>
                {isCopied ? <Check size={18} /> : <Copy size={18} />}
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
              <button className="btn btn-primary" onClick={handleDownload}>
                <Download size={18} />
                Download
              </button>
            </div>

            <div className="readme-preview">
              <pre>{readme}</pre>
            </div>

            <button className="btn btn-outline" onClick={() => setReadme('')}>
              Generate New README
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default READMEGenerator;
