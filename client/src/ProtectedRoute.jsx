import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // This survives hard reloads when you change the URL
  const token = localStorage.getItem('userToken'); 
  console.log("Token in ProtectedRoute:", token);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;