import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Linkedin } from 'lucide-react';
import apiService from '../../services/apiService';
import "../READMEGenerator/Generators.css";

const LinkedInGenerator = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [post, setPost] = useState('');

  const generatePost = async () => {
    setIsGenerating(true);
    
    try {
      // Fetch project details from backend
      const projectResponse = await apiService.getProject(projectId);
      const projectData = projectResponse.data.project;
      
      // Call Bedrock API with proper projectData format
      const response = await apiService.generateLinkedInPost({
        projectData: {
          id: projectData.id,
          name: projectData.name,
          description: projectData.description,
          techStack: projectData.techStack,
          level: projectData.level,
          expectedOutcome: projectData.expectedOutcome
        }
      });
      
      setPost(response.data.post);
    } catch (error) {
      console.error('LinkedIn post generation error:', error);
      
      // Fallback post template
      const fallbackPost = `🎉 Excited to share my latest project! 🚀

I just completed building a Personal Portfolio Website as part of my web development journey with TechMentor AI!

✨ What I Built:
• Fully responsive portfolio website
• Modern, clean UI design
• Interactive project showcase
• Smooth navigation and animations

💻 Tech Stack:
HTML5 | CSS3 | JavaScript | Git

🎯 Key Learnings:
✅ Mastered responsive design principles
✅ Advanced CSS layouts with Flexbox & Grid
✅ JavaScript DOM manipulation
✅ Version control with Git & GitHub

This project challenged me to apply everything I learned about frontend development, and I'm proud of how it turned out!

🔗 Check it out: [Your GitHub Link]

What's your go-to tech stack for building portfolios? Drop your thoughts below! 👇

#WebDevelopment #Frontend #JavaScript #CSS #HTML #100DaysOfCode #TechMentorAI #LearningInPublic #WebDesign #Portfolio`;

      setPost(fallbackPost);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
          <Linkedin size={48} className="linkedin-icon" />
          <h1>LinkedIn Post Generator</h1>
          <p>Share your achievement with your professional network</p>
        </div>

        {!post ? (
          <div className="generator-prompt">
            <div className="prompt-card">
              <h2>Generate Your LinkedIn Post</h2>
              <p>Let AI craft an engaging post to showcase your project and celebrate your learning journey!</p>
              <button
                className="btn btn-primary btn-large"
                onClick={generatePost}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Post'}
              </button>
            </div>
          </div>
        ) : (
          <div className="generator-result">
            <div className="result-actions">
              <button className="btn btn-secondary" onClick={handleCopy}>
                {isCopied ? <Check size={18} /> : <Copy size={18} />}
                {isCopied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>

            <div className="linkedin-preview">
              <div className="post-header">
                <div className="post-avatar">
                  <Linkedin size={24} />
                </div>
                <div>
                  <strong>Your Name</strong>
                  <p>Your Title • Just now</p>
                </div>
              </div>
              <div className="post-content">
                {post.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>

            <button className="btn btn-outline" onClick={() => setPost('')}>
              Generate New Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInGenerator;