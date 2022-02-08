import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoField from './components/TodoField';

import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, fetchTodos } from './store/todoSlice';

function App() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((store) => store.todo);

  const [text, setText] = useState('');

  const addTask = () => {
    dispatch(addNewTodo(text));

    setText('');
  };

  const handleInput = (text) => setText(text);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="App">
      <h1>Todo</h1>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <TodoField text={text} handleInput={handleInput} handleSubmit={addTask} />
      <TodoList />
    </div>
  );
}

export default App;
