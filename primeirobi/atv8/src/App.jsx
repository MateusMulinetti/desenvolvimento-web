import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finalizar projeto' },
    { id: 2, text: 'Estudar ' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask = { id: Date.now(), text: inputValue };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="dashboard-wrapper">
      <div className="todo-container">
        <header className="header">
          <h1>Task Board</h1>
          <p>{tasks.length} tarefas pendentes</p>
        </header>

        <form onSubmit={addTask} className="todo-form">
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Nova tarefa..."
          />
          <button type="submit" className="btn-add">+</button>
        </form>

        {}
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <p>{task.text}</p>
              <button onClick={() => removeTask(task.id)} className="btn-remove">
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;