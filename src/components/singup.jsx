import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Signup successful! Redirecting to Login page...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="button">Signup</button>
      </form>

      {message && (
        <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}

      <p className="link">
        Already have an account? <Link to="/login" className="link">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
