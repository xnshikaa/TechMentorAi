import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import apiService from '../../services/apiService';
import './MentorChat.css';

const MentorChat = ({ project, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm your mentor for "${project.name}". I'm here to guide you with hints and explanations. What do you need help with?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Bedrock API
      const response = await apiService.sendMentorMessage(input, {
        project: project.name,
        techStack: project.techStack
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.message || 'I can help you with that! Could you provide more details about what you\'re trying to accomplish?'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Mentor API error:', error);
      
      // Fallback response
      const fallbackMessage = {
        role: 'assistant',
        content: 'I\'m here to help! Remember, I can provide hints and guidance, but I encourage you to think through the solution yourself. What specific part are you stuck on?'
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mentor-chat-overlay">
      <div className="mentor-chat-container">
        <div className="mentor-chat-header">
          <div className="mentor-info">
            <div className="mentor-avatar">
              <Bot size={24} />
            </div>
            <div>
              <h3>AI Mentor</h3>
              <span className="mentor-status">Online</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="mentor-chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.role === 'assistant' && (
                <div className="message-avatar">
                  <Bot size={18} />
                </div>
              )}
              <div className="message-content">
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">
                <Bot size={18} />
              </div>
              <div className="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="mentor-chat-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask for guidance, hints, or clarification..."
            rows="2"
          />
          <button 
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send size={20} />
          </button>
        </div>

        <div className="mentor-disclaimer">
          💡 I provide guidance and hints, not complete solutions. Let's learn together!
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
