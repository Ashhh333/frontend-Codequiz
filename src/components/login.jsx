import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
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
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        window.location.href = '/';
        localStorage.setItem('token', data.token);
      } else {
        setMessage(data.error || 'Invalid credentials');
      }
    } catch (error) {
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 style={{marginTop:'1px'}}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}

      <p className={styles.link}>
        Don't have an account? <Link to="/signup" className={styles.link}>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
