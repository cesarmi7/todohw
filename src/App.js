import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/todos";
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState(""); 
  const [editIndex, setEditIndex] = useState(null); 

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data.slice(0, 5)); 
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  const addTask = () => {
    if (taskInput.trim() === "") return; 

    if (editIndex !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editIndex ? { ...task, description: taskInput } : task
        )
      );
      setEditIndex(null); 
    } else {
      const newTask = {
        id: Date.now(),
        description: taskInput,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setTaskInput("");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (id, description) => {
    setTaskInput(description);
    setEditIndex(id);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <div className="github-link">
         <a
            href="https://github.com/cesarmi7/todolisthw/tree/main"
            target="_blank"
            rel="noopener noreferrer"
          >
          <button className="github-btn">🔗 View on GitHub</button>
          </a>
      </div>
      {/* API Endpoint Buttons */}
      <div className="api-endpoints">
        <h2>API Endpoints</h2>
        <a href={API_URL} target="_blank" rel="noopener noreferrer">
          <button className="api-btn">GET All To-Dos</button>
          <button className="api-btn">POST Create To-Do</button>
          <button className="api-btn">PUT Update To-Do</button>
          <button className="api-btn">DELETE To-Do</button>
        </a>
      </div>

      <h1 className="title">🌸 To-Do List 🌸</h1>

      {/* Input Field */}
      <div className="task-input-container">
        <input
          type="text"
          className="task-input"
          placeholder="Enter a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="add-btn" onClick={addTask}>
          {editIndex ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-text">{task.description || task.title}</span>
            <div className="task-buttons">
              <button
                className="edit-btn"
                onClick={() => editTask(task.id, task.description || task.title)}
              >
                ✏️
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
