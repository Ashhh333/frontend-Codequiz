import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios  from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './codeeditor.css'
import { languages } from "monaco-editor";
const languageOptions = [
     { name: "C++", id: 54, editorLang: "cpp" },
     { name: "Python", id: 71, editorLang: "python" },
     { name: "Java", id: 62, editorLang: "java" },
     { name: "JavaScript", id: 63, editorLang: "javascript" },
     { name: "C", id: 50, editorLang: "c" },
   ];
   const theme=[
      "vs-dark",
      "vs-light"
   ]
   
   const CodeEditor = ({testCases}) => {
    const [code, setCode] = useState(() => {
      // Retrieve code from localStorage or set the default template
      return localStorage.getItem("code") || "// Write your code here...";
    });  
     const [Theme, setTheme] = useState("vs-dark");
     const [selectedLanguage, setSelectedLanguage] = useState(() => {
      const storedLanguage = localStorage.getItem("language");
      return storedLanguage ? JSON.parse(storedLanguage) : languageOptions[0];
    });
      // Default to C++
     const navigate = useNavigate(); 
     const handleEditorChange = (value) => {
       setCode(value);
       localStorage.setItem("code", value); // Save the code
     };
   
     const handleLanguageChange = (e) => {
       const selected = languageOptions.find((lang) => lang.id === parseInt(e.target.value));
       console.log(selected)
       setSelectedLanguage(selected);
       if(selected.id==71)  setCode("#Write your code here..."); 
      else   setCode("// Write your code here..."); 
   
      // Reset code when changing language
       localStorage.setItem("language",JSON.stringify(selected));
     };
     const handlethemeChange=(e)=>{
      console.log(e.target.value);
       setTheme(e.target.value);
     }
     const clearCode = () => {
      const defaultCode = "// Write your code here...";
      setCode(defaultCode);
      localStorage.setItem("code", defaultCode); // Reset to default template
    };
  
     const handleRunCode = async () => {
      console.log(2)
          // console.log(testCases);
     const stdin=[];
     const expectedOutput=[];
     testCases.map((testCase,index)=>{
        stdin.push(btoa(testCase.input));
        expectedOutput.push(btoa(testCase.expectedOutput));
     })
    const code64_bit= btoa(code);
    
     if (stdin.length !== expectedOutput.length) {
      console.error("Error: stdinArray and expectedOutputArray must have the same length.");
     }
     
     navigate("/Judge", {
      state: { stdin,expectedOutput,code64_bit,selectedLanguage },
    }); 

     };
   
     return (
       <div>
         <h2 className="header" >CodeQuiz</h2>
   
         {/* Language Selector */}
         <div style={{ marginBottom: "6px" }}>
           {/* <label htmlFor="language-select" style={{ marginRight: "10px" ,fontSize:"20px" }}>Select Language:</label> */}
           <select id="language-select" onChange={handleLanguageChange} value={selectedLanguage.id}>
             {languageOptions.map((lang) => (
               <option key={lang.id} value={lang.id}>
                 {lang.name}
               </option>
             ))}
           </select>
           <select id="language-select" onChange={handlethemeChange} style={{marginLeft:"10px"}} >
             {theme.map((theme,index) => (
               <option key={index}>
                 {theme}
               </option>
             ))}
           </select>
           <button className="custombutton-2" onClick={clearCode} style={{ marginTop: "-5px", position:"absolute" }}>
  Clear Code
</button>
         </div>
       
   
         {/* Monaco Editor */}
         <MonacoEditor
           height="70vh"
           width="100%"
           language={selectedLanguage.editorLang} // Change syntax highlighting
           theme={Theme}
           value={code}
           onChange={handleEditorChange}
           options={{ fontSize: 15, minimap: { enabled: false } }}
         />
   
         {/* Run Code Button */}
         <button onClick={handleRunCode} className="custombutton">
           Run Code
         </button>
   
         {/* Output Display */}
         {/* <div>
           <h3>Output:</h3>
           <pre style={{ background: "#222", color: "#fff", padding: "10px" }}>
             {output}
           </pre>
         </div> */}
       </div>
     );
   };
   
   export default CodeEditor;
   