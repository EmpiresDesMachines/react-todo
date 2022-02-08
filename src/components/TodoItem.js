import React from 'react';

import { useDispatch } from 'react-redux';

import { deleteTodo, toggleTodo } from '../store/todoSlice';

function TodoItem({ id, completed, title }) {
  const dispatch = useDispatch();

  return (
    <li key={id}>
      <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodo(id))} />
      <span>{title}</span>
      <span className={'delete'} onClick={() => dispatch(deleteTodo(id))}>
        &times;
      </span>
    </li>
  );
}

export default TodoItem;
