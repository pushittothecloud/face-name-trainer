import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [stats, setStats] = useState({
    facesLearned: 23,
    accuracy: 82,
    currentStreak: 5,
    nextReview: 3
  });

  const trainingModes = [
    {
      id: 'face-to-name',
      name: 'Face → Name',
      emoji: '🧠',
      description: 'See a face, type the name from memory'
    },
    {
      id: 'name-to-face',
      name: 'Name → Face',
      emoji: '👤',
      description: 'See a name, pick the right face'
    },
    {
      id: 'face-detail-checker',
      name: 'Face Detail Checker',
      emoji: '🔍',
      description: 'Identify the feature that stands out most'
    },
    {
      id: 'name-breaker',
      name: 'Name Breaker',
      emoji: '✂️',
      description: 'Break names into syllables interactively'
    },
    {
      id: 'syllable-associator',
      name: 'Syllable Associator',
      emoji: '🔗',
      description: 'Link each syllable to a memorable word'
    },
    {
      id: 'visualizer',
      name: 'Vivid Visualizer',
      emoji: '🎨',
      description: 'Close your eyes and picture a face vividly'
    }
  ];

  return (
    <div className="home">
      <div className="header">
        <div>
          <h1>Face Name Trainer</h1>
          <p>Ready to improve your face and name memory?</p>
        </div>
        <div className="user-menu">
          <Link to="/progress">Progress</Link>
          <Link to="/">Settings</Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.facesLearned}</div>
          <div className="stat-label">Faces Learned</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.accuracy}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.currentStreak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.nextReview}</div>
          <div className="stat-label">Due for Review</div>
        </div>
      </div>

      <div className="daily-goal">
        <h3>📅 Today's Goal</h3>
        <div className="goal-progress">
          <div style={{ flex: 1 }}>
            <div className="progress-bar">
              <div className="progress" style={{ width: '60%' }}></div>
            </div>
          </div>
          <span>3 of 5 faces</span>
        </div>
        <p style={{ color: 'var(--text-light)', fontSize: '14px', marginTop: '10px' }}>
          Keep going! 2 more faces to reach your daily goal.
        </p>
      </div>

      <div className="training-section" style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Training Modes</h2>
        </div>
        <div className="training-grid">
          {trainingModes.map(mode => (
            <Link
              key={mode.id}
              to={`/training/${mode.id}`}
              className="training-card"
            >
              <span className="icon">{mode.emoji}</span>
              <h3>{mode.name}</h3>
              <p>{mode.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
