import React, { useState } from 'react';
import axios from 'axios';
import './CreateProblemPage.css';

const CreateProblemPage = () => {
  const [ProblemName, setname] = useState('');
  const [description, setDescription] = useState('');
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }]);
  const [link, setLink] = useState('');

  const handleTestCaseChange = (index, key, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][key] = value;
    setTestCases(newTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '' }]);
  };

  const deleteTestCase = (index) => {
    const newTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(newTestCases);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/create-problem', {
        ProblemName,
        description,
        inputFormat,
        outputFormat,
        testCases,
      });
      setLink(response.data.link);
    } catch (error) {
      console.error('Error creating problem:', error);
      alert('ALL FIELDS REQUIRED TO BE FILLED');
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-header">Create a Problem</h1>
        <div className="form-group">
          <label className="form-label">Problem Name</label>
          <textarea
            placeholder="Write Problem Name Here."
            value={ProblemName}
            onChange={(e) => setname(e.target.value)}
            className="textarea textarea-small"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Problem Description</label>
          <textarea
            placeholder="Write Problem description here."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-large"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Input Format</label>
          <textarea
            placeholder="Describe the input format here."
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
            className="textarea"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Output Format</label>
          <textarea
            placeholder="Describe the output format here."
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="textarea"
          />
        </div>
        <div className="test-cases">
          <h3 style={{ fontSize: '1.25rem',marginBottom:'-1px', color: 'white' }}>Test Cases</h3>
          {testCases.map((testCase, index) => (
            <div key={index} className="test-case-container">
              <input
                type="text"
                placeholder="Input"
                height="5px"
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                className="textarea textarea-small"
              />
              <input
                type="text"
                placeholder="Expected Output"
                value={testCase.expectedOutput}
                onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                className="textarea textarea-small"
              />
              <button onClick={() => deleteTestCase(index)} className="button-delete">
                Delete
              </button>
            </div>
          ))}
          <button onClick={addTestCase} className="button-add-test-case">
            Add Test Case
          </button>
        </div>
        <button onClick={handleSubmit} className="button-submit">
          Generate Link
        </button>
        {link && (
          <div className="link-section">
            <h3>Shareable Link:</h3>
            <a href={link} target="_blank" rel="noopener noreferrer" className="link">
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProblemPage;
