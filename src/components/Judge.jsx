import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import './judge.css'; // Import the CSS file

const Judge = () => {
  const location = useLocation();
  const { stdin, expectedOutput, code64_bit, selectedLanguage } = location.state || {};

  // State to manage the results and loading status
  const [status, setStatus] = useState("Judging...");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Construct submissions dynamically
    const submissions = stdin.map((stdin, index) => ({
      language_id: selectedLanguage.id,
      
      source_code: code64_bit,
      stdin,
      expected_output: expectedOutput[index]
    }));

    // Define the request options
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
      params: { base64_encoded: 'true' },
      headers: {
        'x-rapidapi-key': 'd817368f7amsh9ff920878753839p1a01dfjsnd7efbaba0966',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: { submissions },
    };

    const HEADERS = {
      'x-rapidapi-key': 'd817368f7amsh9ff920878753839p1a01dfjsnd7efbaba0966',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    };

    const fetchResults = async () => {
      try {
        const response = await axios.request(options);
        const tokens = response.data.map((submission) => submission.token);
        console.log("Submission successful. Tokens:", tokens);

        const resultURL = `https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=true&tokens=${tokens.join(",")}`;

        let finalResults;

        while (true) {
          const resultResponse = await axios.get(resultURL, { headers: HEADERS });
          finalResults = resultResponse.data.submissions;

          // Check if any results are still pending
          if (finalResults.some((res) => res.status.id === 1 || res.status.id === 2)) {
            console.log("Waiting for the results...");
            setStatus("Judging in progress...");
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
          } else {
            break;
          }
        }
         
        setResults(finalResults);
        setStatus("Judging completed!");
        console.log("Juging completed");
      } catch (error) {
        console.error("Error during submission:", error.response ? error.response.data : error.message);
        setStatus("An error occurred during judging.");
      }
    };

    fetchResults();
  }, [stdin, expectedOutput, code64_bit, selectedLanguage]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "accepted";
      case "Wrong Answer":
        return "wrong-answer";
      default:
        return "other-status";
    }
  };

  return (
    <div className="judge-container">
      <h1 className="status-text">{status}</h1>
      {results.length > 0 && (
        <div className="test-cases">
          {results.map((result, index) => (
            <div key={index} className={`test-case ${getStatusClass(result.status.description)}`}>
              <h3>Test Case {index + 1}:</h3>
              <div style={{ display: "flex", flexDirection: "row", gap: "200px" }}>
                <p><strong>Status:</strong> {result.status.description}</p>
                {(result.status.description === "Wrong Answer" ) && (
                  <p><strong>stdout:</strong> {atob(result.stdout) || "N/A"}</p>
                  
                )}
                 
                {(result.status.description === "Compilation Error" || result.status.description === "Runtime Error (NZEC)") && (
                  <p><strong>Error:</strong> {atob(result.stderr) || "N/A"}</p>
                  
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Judge;
