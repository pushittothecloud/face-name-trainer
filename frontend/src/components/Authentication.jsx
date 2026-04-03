import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Authentication() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-fill demo account for testing
  const useDemoAccount = () => {
    setEmail('demo@example.com');
    setPassword('demo123');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2>Demo Account (No signup needed)</h2>
        
        <button
          onClick={useDemoAccount}
          style={{
            width: '100%',
            padding: '12px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          📝 Use Demo Account (Pre-filled)
        </button>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px'
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px'
            }}
          />

          {error && (
            <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#64748b', marginTop: '15px', textAlign: 'center' }}>
          ℹ️ All data is local. No API keys or payment needed.
        </p>
      </div>
    </div>
  );
}
