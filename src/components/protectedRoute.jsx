import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode }from "jwt-decode";
const isAuthenticated = () => {
     const token = localStorage.getItem("token");
   
     // If there's no token, return false
     if (!token){console.log("NULL"); return false;}
   
     try {
       // Decode the token to extract expiration time
       const decodedToken = jwtDecode(token);
   
       // Check if the token has expired
       if (decodedToken.exp * 1000 < Date.now()) {
          console.log("outdated");
         localStorage.removeItem("token"); // Optionally clear invalid token
         return false;
       }
   
       // If the token is valid and not expired, return true
       return true;
     } catch (error) {
       // If the token is invalid or decoding fails, clear it and return false
       localStorage.removeItem("token");
       console.log("errpr");
       return false;
     }
   };
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
