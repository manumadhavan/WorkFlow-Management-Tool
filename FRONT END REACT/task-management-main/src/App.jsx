import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AssignTask from './components/AssignTask';
import UpdateTask from './components/UpdateTask';
import VerifyTask from './components/AdminVerify';

function App() {
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);

  // Retrieve user type from localStorage (or global state) when app loads
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedUserId = localStorage.getItem('userId'); // Retrieve userId
    if (storedUserType) {
      setUserType(storedUserType);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserType={setUserType} setUserId={setUserId} />} />
        <Route path="/dashboard" element={<Dashboard userType={userType} userId={userId} />} />
        <Route path="/assign-task" element={<AssignTask />} />
        <Route path="/update-task" element={<UpdateTask />} />
        <Route path="/verify-task" element={<VerifyTask />} />
      </Routes>
    </Router>
  );
}

export default App;
