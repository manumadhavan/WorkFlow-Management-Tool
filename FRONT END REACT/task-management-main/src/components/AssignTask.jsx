import React, { useState } from 'react';
import axios from 'axios';
import '../AssignTask.css'; // Import the CSS file

const AssignTask = () => {
  debugger;
    const [TaskName, setTaskName] = useState('');
    const [TaskDcr, setTaskDcr] = useState('');
    const [Department, setDepartment] = useState('');
    const [AssignedTo, setAssignedTo] = useState('');
    const [TaskTargetDate, setTaskTargetDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    // Get current date and tomorrow's date
    //const currentDate = new Date().toISOString().split('T')[0];
    const currentDate = new Date().toISOString();
    const DateOfAssignment = new Date().toISOString();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const minTaskTargetDate = tomorrowDate.toISOString().split('T')[0];

    const AssignedBy = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
      debugger;
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5226/products/Task-Assignment', {
                TaskName,
                TaskDcr,
                Department,
                AssignedTo,
                AssignedBy: parseInt(AssignedBy, 10),
                DateOfAssignment: DateOfAssignment,
                //TaskTargetDate,
                TaskTargetDate: new Date(TaskTargetDate).toISOString(),
            });

            if (response.status === 200 || response.status === 201) {
              debugger;
                setSuccessMessage('Task Assigned Successfully');
                //setShowPopup(true);
                // Clear form fields
                setTaskName('');
                setTaskDcr('');
                setDepartment('');
                setAssignedTo('');
                setTaskTargetDate('');
                setTimeout(() => {
                  window.location.reload(); // Reload the page
              }, 3000);
                 // Adjust delay as needed (3000 ms = 3 seconds)
            }
        } catch (error) {
            console.error('Error assigning task:', error);
            setSuccessMessage('Failed to assign task. Please try again.');
            //setSuccessMessage('Failed to assign task.',error);
        }
    };

    return (
        <div className="assign-task-container">
            <h2>Assign Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task Name:</label>
                    <input
                        type="text"
                        value={TaskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Task Description:</label>
                    <textarea
                        value={TaskDcr}
                        onChange={(e) => setTaskDcr(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department:</label>
                    <input
                        type="text"
                        value={Department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Assigned To (Employee Code):</label>
                    <input
                        type="number"
                        value={AssignedTo}
                        onChange={(e) => {
                            // Ensure only numbers are entered and limit to 8 digits
                            const value = e.target.value;
                            if (value.length <= 8) {
                                setAssignedTo(value);
                            }
                        }}
                        required
                        min="0" // Minimum value for employee code
                        max="99999999" // Maximum value for 8 digits
                        title="Please enter a valid employee code (up to 8 digits)"
                    />
                </div>
                <div className="form-group">
                    <label>Date of Assignment:</label>
                    <input type="date" value={currentDate} readOnly />
                </div>
                <div className="form-group">
                    <label>Target Date:</label>
                    <input
                        type="date"
                        value={TaskTargetDate}
                        onChange={(e) => setTaskTargetDate(e.target.value)}
                        min={minTaskTargetDate} // Set minimum target date to tomorrow
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Assign Task</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            
        </div>
    );
};

export default AssignTask;
