import './App.css';
import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoField from './components/TodoField';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim().length) {
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text,
          completed: false,
        },
      ]);
    }
    setText('');
  };

  const removeTodo = (id) => setTodos(todos.filter((v) => v.id !== id));

  const toggleTodoComplete = (id) =>
    setTodos(todos.map((v) => (v.id !== id ? v : ((v.completed = !v.completed), v))));

  const handleInput = (text) => setText(text);

  return (
    <div className="App">
      <TodoField text={text} handleInput={handleInput} handleSubmit={addTodo} />
      <TodoList todos={todos} removeTodo={removeTodo} toggleTodoComplete={toggleTodoComplete} />
    </div>
  );
}

export default App;
