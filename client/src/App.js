// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Home';
import LoginPage from './Login';
import SignUpPage from './Signup';
import AboutPage from './About';
import Dashboard from './Dashboard';
import BlogDetail from './Blogdetail'; 
// import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
import Createblog from './Createblog';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/write" element={<Createblog />} />
        <Route path="/blogs" element={<BlogDetail />} />
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        /> */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
