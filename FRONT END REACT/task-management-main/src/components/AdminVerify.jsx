import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../AdminTaskPage.css'; // Import CSS for styling

const AdminTaskPage = ({ adminId }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [remarks, setRemarks] = useState('');
    const [message, setMessage] = useState('');

    const AdminId = parseInt(localStorage.getItem('userId'), 10); // Get user ID from local storage
    
    // Fetch tasks for the admin
    const fetchTasks = async () => {
        try {
            const response = await axios.post('http://localhost:5226/products/GetTaskForAdmin', { AdminId });
            setTasks(response.data.tasks); // Assuming the API returns an array of tasks
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [adminId]);

    // Handle task selection
    const handleTaskChange = (event) => {
        const taskId = event.target.value;
        const task = tasks.find(t => t.taskId === Number(taskId));
        setSelectedTask(task);
    };

    // Handle verification or rejection
    const handleSubmit = async (verify) => {
        if (!selectedTask) return;

        const verifyStatus = verify ? 1 : 2; // 1 for verify, 2 for reject
        const taskId = parseInt(selectedTask.taskId);

        try {
            const response = await fetch('http://localhost:5226/products/AdminVerified', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    AdminId: adminId,
                    TaskId: taskId,
                    VerifyStatus: verifyStatus.toString(),
                    AdminRemarks: remarks,
                }),
            });

            const result = await response.json();
            setMessage(result.message); // Assuming the API returns a message
            setRemarks(''); // Clear remarks
            setSelectedTask(null); // Clear selected task
            setTimeout(() => window.location.reload(), 3000); // Reload page after 3 seconds
        } catch (error) {
            console.error('Error submitting verification:', error);
        }
    };

    return (
        <div className="admin-task-page">
            <h1>Admin Task Verification</h1>
            {message && <div className="message">{message}</div>}
            
            <select onChange={handleTaskChange} value={selectedTask ? selectedTask.taskId : ''}>
                <option value="">Select a task</option>
                {tasks.map(task => (
                    <option key={task.taskId} value={task.taskId}>
                        {task.taskName}
                    </option>
                ))}
            </select>

            {selectedTask && (
                <div className="task-details">
                    <h2>Task Details</h2>
                    <p><strong>Task ID:</strong> {selectedTask.taskId}</p>
                    <p><strong>Task Name:</strong> {selectedTask.taskName}</p>
                    <p><strong>Description:</strong> {selectedTask.taskDcr}</p>
                    <p><strong>Assigned Date:</strong> {selectedTask.dateOfAssignment}</p>
                    <p><strong>Target Date:</strong> {selectedTask.taskTargetdate}</p>
                    <p><strong>Assigned To:</strong> {selectedTask.assignedTo}</p>

                    <textarea 
                        placeholder="Enter your remarks here..." 
                        value={remarks} 
                        onChange={(e) => setRemarks(e.target.value)} 
                        required 
                    />
                    
                    <div className="button-group">
                        <button onClick={() => handleSubmit(true)}>Verify</button>
                        <button onClick={() => handleSubmit(false)}>Reject</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTaskPage;
