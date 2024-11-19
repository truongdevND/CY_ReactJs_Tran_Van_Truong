import { createSlice } from '@reduxjs/toolkit';
import { taskData } from '../data';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoList: taskData,
  },
  reducers: {
    addTask: (state, action) => {
      state.todoList.push(action.payload);
    },
    removeTask: (state, action) => {
      state.todoList = state.todoList.filter((task) => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action) => {
      const task = state.todoList.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.todoList.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.todoList[taskIndex] = { ...state.todoList[taskIndex], ...updatedTask };
      }
    },
  },
});

export const { addTask, removeTask, toggleTaskStatus, updateTask } = todoSlice.actions;
export default todoSlice.reducer;
