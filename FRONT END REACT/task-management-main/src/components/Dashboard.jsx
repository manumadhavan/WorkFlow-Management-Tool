import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import '../Dashboard.css'

function Dashboard({ userType, userId }) {
  debugger;
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // Use navigate hook from react-router-dom

  useEffect(() => {
    // Fetch dashboard data based on user type and userId
    const fetchData = async () => {
      debugger;
      try {
        const response = await axios.post(
          'http://localhost:5226/products/fetch-tasks',
          {
            userId,
            userType,
          },
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
            },
          }
        );
        setTasks(response.data); // Axios automatically parses JSON
        const num = tasks.tasks?.length||0;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    
    if (userType && userId) {
      fetchData();
    }
  }, [userType, userId]); // Include userId in dependencies

  // Function to handle task updates
  const handleUpdateTask = (taskId) => {
    console.log('Updating task', taskId);
    // Add logic to update task status here
  };
 
  {/*
    return (
    <div>
     
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {userType === 'admin' && (
          <button
            onClick={() => navigate('/assign-task')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Assign Task
          </button>
        )}
        {userType === 'user' && (
          <button
            onClick={() => navigate('/update-task')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Update Task
          </button>
        )}
      </div>

      
      <h2>{userType === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h2>
      {userType === 'admin' ? (
        // Admin Table
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.tasks?.length||0 > 0 ? (
              tasks.tasks.map((task) => (
                <tr key={task.taskId}>
                  <td>{task.taskId}</td>
                  <td>{task.taskName}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.taskStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        // User Table
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.tasks?.length||0 > 0 ? (
              tasks.tasks.map((task) => (
                <tr key={task.taskId}>
                  <td>{task.taskId}</td>
                  <td>{task.taskName}</td>
                  <td>{task.taskStatus}</td>
                  <td>
                    <button onClick={() => handleUpdateTask(task.taskId)}>Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
*/}

 // Handle logout
 const handleLogout = () => {
  debugger;
  localStorage.clear(); // Clear session storage
  navigate('/'); // Navigate to login page
 };

return (
  <div className="dashboard-container">
      {/* Buttons at the top */}
      <div className="header">
          {userType === 'admin' && (
              <button
                  onClick={() => navigate('/assign-task')}
                  className={`button button-assign`}
              >
                  Assign Task
              </button>
              
          )}
          {userType === 'user' && (
              <button
                  onClick={() => navigate('/update-task')}
                  className={`button button-update`}
              >
                  Update Task
              </button>
          )}

          {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`button button-logout`}
          style={{ marginLeft: 'auto' }} // Align to the right
        >
          Logout
        </button>

      </div>

      <div className="newhead">
          {userType === 'admin' && (
              <button
                 onClick={() => navigate('/verify-task')}
                 className={`button button-verify`}
              >
                 Verify Task
              </button>
              
          )}
          
      </div>

      {/* Title based on user type */}
      <h2>{userType === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h2>

      {/* Tables based on user type */}
      {userType === 'admin' ? (
          // Admin Table
          <table>
              <thead>
                  <tr>
                      <th>Task ID</th>
                      <th>Task Name</th>
                      <th>Assigned To</th>
                      <th>Status</th>
                  </tr>
              </thead>
              <tbody>
                  {tasks.tasks?.length > 0 ? (
                      tasks.tasks.map((task) => (
                          <tr key={task.taskId}>
                              <td>{task.taskId}</td>
                              <td>{task.taskName}</td>
                              <td>{task.assignedTo}</td>
                              <td>{task.taskStatus}</td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan="4">No tasks available</td>
                      </tr>
                  )}
              </tbody>
          </table>
      ) : (
          // User Table
          <table>
              <thead>
                  <tr>
                      <th>Task ID</th>
                      <th>Task Name</th>
                      <th>Status</th>
                      
                  </tr>
              </thead>
              <tbody>
                  {tasks.tasks?.length > 0 ? (
                      tasks.tasks.map((task) => (
                          <tr key={task.taskId}>
                              <td>{task.taskId}</td>
                              <td>{task.taskName}</td>
                              <td>{task.taskStatus}</td>
                              
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan="4">No tasks available</td>
                      </tr>
                  )}
              </tbody>
          </table>
      )}
  </div>
  );
}

export default Dashboard;