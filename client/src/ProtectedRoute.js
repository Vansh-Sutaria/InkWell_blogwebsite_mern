// // PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem('authToken'); // Check for auth token or authentication state
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
