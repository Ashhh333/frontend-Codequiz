import React from "react";
import { useLocation } from "react-router-dom";
import Split from "react-split"; // Import the Split component
import CodeEditor from "./codeEditor";
import ProblemDisplay from "./ProblemDisplay"; // Import the ProblemDisplay component

const ProblemSolvingPage = () => {
  const location = useLocation();
  const { ProblemName, description, inputFormat, outputFormat, testCases } = location.state || {};

  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}> {/* Black background */}
      {/* Split component for resizable panes */}
      <Split
        sizes={[50, 50]} // Initial sizes of the two panes (in percentages)
        minSize={200} // Minimum size of each pane
        gutterSize={10} // Width of the gutter (splitter)
        direction="horizontal" // Split direction: "horizontal" for side-by-side
        style={{ display: "flex", height: "100%" }}
        gutter={(index, direction) => {
          const gutterElement = document.createElement("div");
          gutterElement.style.background = "#ffffff"; // White color for visibility
          gutterElement.style.cursor = "col-resize"; // Cursor style for horizontal resize
          gutterElement.style.width = "10px"; // Width of the gutter
          gutterElement.style.height = "100%";

          // Add hover effect for the gutter
          gutterElement.addEventListener("mouseover", () => {
            gutterElement.style.background = "#ffcc00"; // Highlight color on hover
          });
          gutterElement.addEventListener("mouseout", () => {
            gutterElement.style.background = "#ffffff"; // Revert to original color
          });

          return gutterElement;
        }}
      >
        {/* Left Pane: Code Editor */}
        <div style={{ padding: "10px", overflow: "auto" }}>
          <CodeEditor testCases={testCases} />
        </div>

        {/* Right Pane: Problem Statement and Test Cases */}
        <div style={{ padding: "10px", overflow: "auto" }}>
          <ProblemDisplay
            ProblemName={ProblemName}
            description={description}
            inputFormat={inputFormat}
            outputFormat={outputFormat}
            testCases={testCases}
          />
        </div>
      </Split>
    </div>
  );
};

export default ProblemSolvingPage;
