import React from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', width: "100%", position: 'relative' }}>
      <h1 className='hello'>Welcome to CodeQuiz</h1>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop:'50px',
        gap: '20px', // Spacing between buttons
        position: 'absolute',
        top: '40%', // Center the buttons vertically
        left: '50%', // Center the buttons horizontally
        transform: 'translate(-50%, -50%)' // Offset to center perfectly
      }}>
        <button 
          className="custom-button" 
          onClick={() => navigate("/about")}
        >
          CREATE A PROBLEM
        </button>
        <button 
          className="custom-button" 
          onClick={() => navigate("/link")}
        > 
          SOLVE A PROBLEM
        </button>
        <button 
          className="custom-button" 
          onClick={() => navigate("/myproblems")}
        > 
          SHOW MY PROBLEMS
        </button>
        
      </div>
    </div>
  );
};

export default HomePage;
