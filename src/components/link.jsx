import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './LinkInputBox.css';

const LinkInputBox = () => {
  const [link, setLink] = useState(''); // State to store the pasted link
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Initialize navigate

  // Extract the Problem ID from the pasted link
  const extractIdFromLink = (url) => {
    try {
      const urlObj = new URL(url);
      const parts = urlObj.pathname.split('/'); // Split the path to get the ID
      return parts[parts.length - 1]; // Assume the ID is the last part
    } catch (e) {
      console.error('Invalid URL:', e.message);
      return null;
    }
  };

  // Handler to fetch the problem data
  const handleSubmit = async () => {
    setError(null); // Reset any previous errors
    const problemId = extractIdFromLink(link);
    const code=localStorage.getItem("code");
     localStorage.removeItem("code");
    if (!problemId) {
      setError('Invalid link. Please paste a valid link.');
      return;
    }

    try {
      // Use axios to make a GET request to the backend API
      const response = await axios.get(`/api/problem/${problemId}`);
      console.log(response.data);
      const { ProblemName,description, inputFormat, outputFormat, testCases } = response.data;

      // Navigate to the ProblemSolving page and pass data as state
      navigate("/ProblemSolving", {
        state: {ProblemName, description, inputFormat, outputFormat, testCases },
      });
    } catch (err) {
      console.error('Error:', err.message);
      setError('Failed to fetch problem. Please check the link or try again.');
    }
  };

  return (
    <div style={{marginTop:'100px'}} className="container">
      <h2 style={{fontSize:"40px",marginTop:"10px"}}>Problem Fetcher</h2>
      <div className="form-group">
        <label htmlFor="linkInput" className="label">Paste the question link:</label>
        <input
          id="linkInput"
          type="text"
          placeholder="Enter or paste the question link here"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="input"
        />
      </div>
      <button onClick={handleSubmit} className="button">Fetch Problem</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LinkInputBox;
