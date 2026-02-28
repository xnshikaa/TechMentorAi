import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { Award, TrendingUp } from 'lucide-react';
import './XPDisplay.css';

const XPDisplay = () => {
  const { progress } = useProgress();
  const { xp, level } = progress;
  
  const xpForNextLevel = level * 100;
  const xpInCurrentLevel = xp % 100;
  const progressPercent = (xpInCurrentLevel / 100) * 100;

  return (
    <div className="xp-display">
      <div className="xp-header">
        <Award size={24} className="xp-icon" />
        <div className="xp-info">
          <span className="xp-level">Level {level}</span>
          <span className="xp-points">{xp} XP</span>
        </div>
      </div>
      
      <div className="xp-progress-bar">
        <div 
          className="xp-progress-fill" 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      
      <div className="xp-next">
        <TrendingUp size={14} />
        <span>{xpInCurrentLevel}/100 XP to Level {level + 1}</span>
      </div>
    </div>
  );
};

export default XPDisplay;
