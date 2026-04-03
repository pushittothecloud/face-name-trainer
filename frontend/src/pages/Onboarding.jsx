import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding({ setUser }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    full_name: '',
    motivation: 'social',
    trainingIntensity: 'balanced',
    nameTrainingType: 'first-name',
    facePool: 'general'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In real app, would call API signup endpoint
      const userData = {
        email: formData.email,
        username: formData.username,
        full_name: formData.full_name,
        training_level: formData.trainingIntensity,
        name_training_type: formData.nameTrainingType,
        face_pool: formData.facePool
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="onboarding">
      <div className="onboarding-container">
        <h1>Face Name Trainer</h1>
        <p className="subtitle">Learn to remember names by training your face recognition</p>
        
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step">
              <h2>Welcome!</h2>
              <p>Most people forget names because they don't fully notice faces or create connections. Let's train both.</p>
              <p>First, let's set up your account.</p>
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>
          )}

          {step === 2 && (
            <div className="step">
              <h2>Why do you want this app?</h2>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="motivation"
                    value="social"
                    checked={formData.motivation === 'social'}
                    onChange={handleChange}
                  />
                  Social confidence - Remember people better at events
                </label>
                <label>
                  <input
                    type="radio"
                    name="motivation"
                    value="professional"
                    checked={formData.motivation === 'professional'}
                    onChange={handleChange}
                  />
                  Professional - Better at work relationships
                </label>
                <label>
                  <input
                    type="radio"
                    name="motivation"
                    value="brain-training"
                    checked={formData.motivation === 'brain-training'}
                    onChange={handleChange}
                  />
                  Brain training - Like a mental workout
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step">
              <h2>Training Intensity</h2>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="trainingIntensity"
                    value="casual"
                    checked={formData.trainingIntensity === 'casual'}
                    onChange={handleChange}
                  />
                  Casual - A few minutes a day
                </label>
                <label>
                  <input
                    type="radio"
                    name="trainingIntensity"
                    value="balanced"
                    checked={formData.trainingIntensity === 'balanced'}
                    onChange={handleChange}
                  />
                  Balanced - 15-20 minutes daily
                </label>
                <label>
                  <input
                    type="radio"
                    name="trainingIntensity"
                    value="serious"
                    checked={formData.trainingIntensity === 'serious'}
                    onChange={handleChange}
                  />
                  Serious - 30+ minutes, advanced challenges
                </label>
              </div>

              <h3>Name Training</h3>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="nameTrainingType"
                    value="first-name"
                    checked={formData.nameTrainingType === 'first-name'}
                    onChange={handleChange}
                  />
                  First names only
                </label>
                <label>
                  <input
                    type="radio"
                    name="nameTrainingType"
                    value="full-name"
                    checked={formData.nameTrainingType === 'full-name'}
                    onChange={handleChange}
                  />
                  Full names
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step">
              <h2>Face Sets</h2>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="facePool"
                    value="general"
                    checked={formData.facePool === 'general'}
                    onChange={handleChange}
                  />
                  General - Diverse faces from our library
                </label>
                <label>
                  <input
                    type="radio"
                    name="facePool"
                    value="custom"
                    checked={formData.facePool === 'custom'}
                    onChange={handleChange}
                  />
                  Custom - Upload your own photos
                </label>
                <label>
                  <input
                    type="radio"
                    name="facePool"
                    value="both"
                    checked={formData.facePool === 'both'}
                    onChange={handleChange}
                  />
                  Both - Mix practice and real people
                </label>
              </div>
              <p className="info">You can change this later in settings.</p>
            </div>
          )}

          <div className="button-group">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Back</button>}
            {step < 4 ? (
              <button type="button" onClick={handleNext}>Next</button>
            ) : (
              <button type="submit">Start Training</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
