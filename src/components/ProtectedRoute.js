import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
    
  const isAuthenticated = localStorage.getItem('token'); // Check if the token exists in local storage

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" /> // Redirect to the login page if not authenticated
  );
};

export default ProtectedRoute;
