import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../UpdateTask.css'; // Import the CSS file

const UpdateTask = () => {
    const [tasks, setTasks] = useState([]); // List of tasks assigned to the user
    //const [SelectedTaskId, SelectedTaskId] = useState(''); // Selected task ID
    const [TaskId, setTaskId] = useState(''); 
    const [taskDetails, setTaskDetails] = useState({}); // Details of the selected task
    const [taskStatus, setTaskStatus] = useState(''); // Status of the task
    const [taskPercentage, setTaskPercentage] = useState(''); // Percentage completion
    const [successMessage, setSuccessMessage] = useState(''); // Success message
    const [showPopup, setShowPopup] = useState(false); // Popup visibility

    const userId = parseInt(localStorage.getItem('userId'), 10); // Get user ID from local storage

    useEffect(() => {
        const fetchTasksForUser = async () => {
          debugger;
            try {
                const response = await axios.post('http://localhost:5226/products/fetchtasksforuser', { userId });
                setTasks(response.data.tasks); // Set tasks from API response
                //const num = tasks.length||0;
                const num = tasks.Tasks?.length||0;
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasksForUser();
    }, [userId]);

    const handleTaskSelection = (e) => {
      debugger;
        const selectedId = parseInt(e.target.value);
        setTaskId(selectedId);

        // Find and set details for the selected task
        const selectedTask = tasks.find(task => task.taskId === selectedId);
        if (selectedTask) {
            setTaskDetails(selectedTask);
            setTaskStatus(selectedTask.TaskStatus); // Pre-fill status
            //setTaskPercentage(selectedTask.TaskProgress); // Pre-fill percentage
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5226/products/update-task', {
                UserId: userId,
                //Percentage: parseFloat(taskPercentage), // Convert percentage to float
                Percentage: parseFloat(taskPercentage),
            });

            setSuccessMessage('Task updated successfully');
            setShowPopup(true); // Show success popup

            // Clear fields after 3 seconds and reload the page
            setTimeout(() => {
                clearFields();
                window.location.reload(); // Reload page
            }, 3000);
        } catch (error) {
            console.error('Error updating task:', error);
            setSuccessMessage('Failed to update task. Please try again.');
            setShowPopup(true); // Show error popup
        }
    };

    const clearFields = () => {
        setTaskId('');
        setTaskDetails({});
        setTaskStatus('');
        setTaskPercentage('');
        setShowPopup(false); // Hide popup
    };

    return (
        <div className="update-task-container">
            <h2>Update Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select Task:</label>
                    <select value={TaskId} onChange={handleTaskSelection} required>
                        <option value="">Select a task</option>
                        {/*{tasks.tasks.map(task => (
                            <option key={task.TaskId} value={task.TaskId}>
                                {task.TaskName}
                            </option>
                        ))} */}
                        {
                          tasks.length > 0 ? ( // Check if tasks array has items
                            tasks.map(task => (
                                <option key={task.taskId} value={task.taskId}>
                                    {task.taskName}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No tasks available</option> // Fallback option if no tasks
                        )
                        }
                    </select>
                </div>

                {TaskId && (
                    <>
                        <div className="form-group">
                            <label>Task Description:</label>
                            <textarea value={taskDetails.taskDcr || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Target Date:</label>
                            <input type="date" value={taskDetails.taskTargetdate?.split('T')[0] || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Status:</label>
                            <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} required>
                                <option value="">Select status</option>
                                <option value="Inprogress">Inprogress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Percentage (%):</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={taskPercentage}
                                onChange={(e) => setTaskPercentage(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                <button type="submit" className="submit-button">Update Task</button>
            </form>

            {showPopup && (
                <div className="popup">
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default UpdateTask;
