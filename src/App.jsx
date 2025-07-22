import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import AboutPage from "./components/ProblemCreation";
import URL from "./components/link";
import ProblemSolvingPage from "./components/ProblemSolving";
import Judge from "./components/Judge";
import LoginPage from "./components/login";
import ProtectedRoute from "./components/protectedRoute";
import Signup from "./components/singup";
import Myprobs from "./components/myproblems"


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={ <LoginPage /> }/>
        <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
        <Route path="/link" element={<ProtectedRoute><URL /></ProtectedRoute>} />
        <Route path="/myproblems" element={<ProtectedRoute><Myprobs /></ProtectedRoute>} />

        <Route path="/ProblemSolving" element={<ProtectedRoute><ProblemSolvingPage /></ProtectedRoute>} />
        <Route path="/Judge" element={<ProtectedRoute><Judge /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
