import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const api = axios.create({ baseURL: 'http://localhost:8000/api' });

function App() {
  // we start to declare our states here 
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // todo function so we can get the data from the api
  const fetchTodos = async () => {
    const res = await api.get('/todos');
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!title) return;
    await api.post('/todos', { title });
    setTitle('');
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await api.put(`/todos/${todo.id}`, {
      completed: !todo.completed,
      title: todo.title
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add new todo" />
        <button className="add" onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo)}
              className={todo.completed ? 'completed' : ''}
            >
              {todo.title}
            </span>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;