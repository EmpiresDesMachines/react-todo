import './App.css';
import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoField from './components/TodoField';

import { useDispatch } from 'react-redux';
import { addTodo } from './store/todoSlice';

function App() {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const addTask = () => {
    dispatch(addTodo({ text }));
    setText('');
  };

  const handleInput = (text) => setText(text);

  return (
    <div className="App">
      <h1>Todo</h1>
      <TodoField text={text} handleInput={handleInput} handleSubmit={addTask} />
      <TodoList />
    </div>
  );
}

export default App;
