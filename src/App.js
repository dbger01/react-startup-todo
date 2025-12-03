import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showReminder, setShowReminder] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Greeting logic
  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Add or update a task
  const addOrUpdateTask = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = input;
      updatedTasks[editIndex].time = parseInt(time) * 60;
      updatedTasks[editIndex].remaining = parseInt(time) * 60;
      setTasks(updatedTasks);
      setEditIndex(null);
      triggerReminder("Task updated successfully!", false);
    } else {
      const newTask = {
        text: input,
        done: false,
        time: parseInt(time) * 60,
        remaining: parseInt(time) * 60,
      };
      setTasks([...tasks, newTask]);
      triggerReminder("Task added successfully!", false);
    }

    setInput("");
    setTime("");
  };

  // Countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (!task.done && task.remaining > 0) {
            const updated = { ...task, remaining: task.remaining - 1 };
            if (updated.remaining === 0) {
              const audio = new Audio(
               "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
              );
              audio.loop = true;
              audio.play();
              setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
              }, 20000);

              triggerReminder(`Time's up! Switch to next task: ${task.text}`, true);
            }
            return updated;
          }
          return task;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Trigger reminder popup
  const triggerReminder = (message, confetti) => {
    setShowReminder({ message, confetti });
    setTimeout(() => setShowReminder(null), 4000);
  };

  // Mark task as complete
  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = true;
    setTasks(newTasks);
  };

  // Remove a task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Start editing a task
  const editTask = (index) => {
    setInput(tasks[index].text);
    setTime(tasks[index].time / 60);
    setEditIndex(index);
  };

  // Progress calculation
  const completedCount = tasks.filter((t) => t.done).length;
  const totalCount = tasks.length;
  const pendingCount = totalCount - completedCount;

  // Format countdown
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="container">
      <h1>Taskify</h1>
      <p className="greeting">{getGreeting()}, Reagan!</p>

      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Time (minutes)"
        />
        <button onClick={addOrUpdateTask}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {showReminder && (
        <div className={`reminder ${showReminder.confetti ? "confetti" : ""}`}>
          {showReminder.message}
        </div>
      )}

      <h2>Pending Tasks</h2>
      <ul>
        {tasks
          .filter((task) => !task.done)
          .map((task, index) => (
            <li key={index}>
              <span>
                {task.text}{" "}
                {task.time ? `(Remaining: ${formatTime(task.remaining)})` : ""}
              </span>
              <div>
                <button onClick={() => completeTask(index)}>Complete</button>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => removeTask(index)}>Delete</button>
              </div>
            </li>
          ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul>
        {tasks
          .filter((task) => task.done)
          .map((task, index) => (
            <li key={index}>
              <span className="done">{task.text}</span>
              <button onClick={() => removeTask(index)}>Delete</button>
            </li>
          ))}
      </ul>

      {totalCount > 0 && (
        <div className="pie-chart">
          <svg viewBox="0 0 32 32" width="120" height="120">
            <circle r="16" cx="16" cy="16" fill="red" />
            <circle
              r="16"
              cx="16"
              cy="16"
              fill="green"
              stroke="green"
              strokeDasharray={`${(completedCount / totalCount) * 100} 100`}
              strokeWidth="32"
            />
          </svg>
          <p>{Math.round((completedCount / totalCount) * 100)}% completed</p>
        </div>
      )}
    </div>
  );
}

export default App;








