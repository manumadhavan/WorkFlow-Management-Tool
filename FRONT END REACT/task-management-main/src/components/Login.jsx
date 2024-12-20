import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to the dashboard
import axios from 'axios'; // For API calls
import '../Login.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Default user type
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before submitting

    try {
      // Making API call to verify user credentials
      const response = await axios.post(
        'http://localhost:5226/products/login', 
        {
          userId,
          password,
          userType,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      );

      // Assuming the API returns a success status
      if (response.status === 200) {
        console.log('Login successful:', response.data);

        // Store user type (or tokean) in local storage or global state
        localStorage.setItem('userType', userType); // Store user type for later use
        localStorage.setItem('userId', userId);
        setUserType(userType);
        setUserId(userId);
        

        // Navigate to the appropriate page
        if (userType === 'admin') {
          navigate('/dashboard'); // Admin dashboard
        } else {
          navigate('/dashboard'); // User dashboard
        }
      }
    } catch (err) {
      console.error('Login failed:', err.response || err);
      setError('Invalid credentials or server error. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>User Type:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
