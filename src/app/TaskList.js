import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginModal setIsAuthenticated={setIsAuthenticated} />} />
        {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;