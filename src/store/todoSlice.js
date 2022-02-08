import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = resp.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Can't delete task. Server error.");
      }
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const toggleTodo = createAsyncThunk(
  'todo/toggleTodo',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todo.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Can't toggle status. Server error.");
      }

      dispatch(toggleTodoComplete({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewTodo = createAsyncThunk(
  'todo/addNewTodo',
  async function (text, { rejectWithValue, dispatch }) {
    const todo = {
      title: text,
      userId: 1,
      completed: false,
    };
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Can't add task. Server error.");
      }
      const data = await response.json();
      dispatch(addTodo({ data }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    error: false,
    loading: false,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload.data);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const changedTodo = state.todos.find((todo) => todo.id === action.payload.id);
      changedTodo.completed = !changedTodo.completed;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      // Add todos to the state array
      state.todos = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(deleteTodo.rejected, setError);
    builder.addCase(toggleTodo.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(addNewTodo.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
