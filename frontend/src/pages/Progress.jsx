import React, { useState } from 'react';

export default function Progress() {
  const [timeframe, setTimeframe] = useState('week');

  const stats = {
    totalFaces: 45,
    totalSessions: 127,
    totalHours: 23.5,
    currentAccuracy: 84,
    averageAccuracy: 76,
    bestFeature: 'Eye Recognition',
    mostConfused: 'Last Names'
  };

  const weakPoints = [
    { category: 'Last Names', accuracy: 62, trend: 'up' },
    { category: 'Similar Faces', accuracy: 71, trend: 'flat' },
    { category: 'Delayed Recall', accuracy: 78, trend: 'up' },
    { category: 'Full Names', accuracy: 75, trend: 'up' }
  ];

  const achievements = [
    { name: '🔥 Week Warrior', description: '7-day training streak' },
    { name: '🎯 Accuracy Master', description: 'Reach 85% accuracy' },
    { name: '📸 Face Collector', description: 'Learn 50 faces' },
    { name: '🧠 Brain Champion', description: 'Complete 100 sessions' }
  ];

  return (
    <div className="progress-page">
      <h1>Your Progress</h1>
      
      <div className="progress-sections">
        <section>
          <h2>Key Stats</h2>
          <div className="stat-row">
            <span>Total Faces Learned</span>
            <span className="value">{stats.totalFaces}</span>
          </div>
          <div className="stat-row">
            <span>Training Sessions</span>
            <span className="value">{stats.totalSessions}</span>
          </div>
          <div className="stat-row">
            <span>Total Training Time</span>
            <span className="value">{stats.totalHours}h</span>
          </div>
          <div className="stat-row">
            <span>Current Accuracy</span>
            <span className="value">{stats.currentAccuracy}%</span>
          </div>
          <div className="stat-row">
            <span>Average Accuracy (All Time)</span>
            <span className="value">{stats.averageAccuracy}%</span>
          </div>
        </section>

        <section>
          <h2>Strengths & Weaknesses</h2>
          <div className="insight-card">
            <h3>🏆 Your Strength</h3>
            <p>{stats.bestFeature}</p>
          </div>
          <div className="insight-card">
            <h3>📈 Area to Focus</h3>
            <p>{stats.mostConfused}</p>
          </div>
        </section>

        <section>
          <h2>Areas Needing Improvement</h2>
          {weakPoints.map((point, idx) => (
            <div key={idx} className="goal-item">
              <span>{point.category}</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${point.accuracy}%` }}></div>
              </div>
              <span className="percent">{point.accuracy}%</span>
            </div>
          ))}
        </section>

        <section>
          <h2>Achievement in Progress</h2>
          <div style={{ marginTop: '20px' }}>
            {achievements.map((achievement, idx) => (
              <div key={idx} style={{ padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius)', marginBottom: '12px' }}>
                <h3 style={{ marginBottom: '4px' }}>{achievement.name}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-light)' }}>{achievement.description}</p>
                <div style={{ marginTop: '8px', background: 'white', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--primary)', width: '60%', height: '100%' }}></div>
                </div>
                <p style={{ fontSize: '12px', marginTop: '4px', color: 'var(--text-light)' }}>60% complete</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Personal Insights</h2>
          <div className="insight-card">
            <h3>💡 Your Training Pattern</h3>
            <p>You're most active in the mornings. Consider 10-minute sessions for your best learning.</p>
          </div>
          <div className="insight-card">
            <h3>🎯 Next Focus</h3>
            <p>Your last name recall needs work. Try the Name Mastery Lab to break down syllables.</p>
          </div>
          <div className="insight-card">
            <h3>📊 Recommendation</h3>
            <p>You're progressing well! Try the Similar Face Challenge to push your accuracy higher.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
