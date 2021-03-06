import React from 'react';
import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';
function TodoList() {
  const { todos, loading } = useSelector((store) => store.todo);
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
}

export default TodoList;
