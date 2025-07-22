import React from "react";
import "./ProblemDisplay.css"; // Import the custom CSS

const ProblemDisplay = ({ ProblemName,description, inputFormat, outputFormat, testCases }) => {
  const textStyle = { whiteSpace: "pre-wrap" }; // Preserve newlines
  const sampleTestCase = testCases && testCases.length > 0 ? testCases[0] : null;
console.log(sampleTestCase);
console.log(ProblemName);
  return (
    <div className="problem-container">
    
      <h2 className="problem-title">{ProblemName}</h2>
      <h3 className="problem-subtitle">Problem Statement
      </h3>
      <p className="problem-text" style={textStyle}>{description}</p>

      <h3 className="problem-subtitle">Input Format</h3>
      <p className="problem-text" style={textStyle}>{inputFormat}</p>

      <h3 className="problem-subtitle">Output Format</h3>
      <p className="problem-text" style={textStyle}>{outputFormat}</p>

      {sampleTestCase && (
        <>
          <h3 className="problem-subtitle">Sample Input</h3>
          <div className="sample-box">
            <pre>{sampleTestCase.input}</pre>
          </div>

          <h3 className="problem-subtitle">Sample Output</h3>
          <div className="sample-box">
            <pre>{sampleTestCase.expectedOutput}</pre>
          </div>
        </>
      )}

      {!sampleTestCase && <p className="problem-text">No test cases provided.</p>}
    </div>
  );
};

export default ProblemDisplay;
