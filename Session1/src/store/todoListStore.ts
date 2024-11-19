import { create } from 'zustand';
import { taskData } from '../data';

const todoStore = create((set) => ({
  todoList: taskData,
  addTask: (task) => set((state) => ({ 
    todoList: [...state.todoList, task] 
  })),
  removeTask: (id) => set((state) => ({
    todoList: state.todoList.filter((task) => task.id !== id)
  })),
  toggleTaskStatus: (id) => set((state) => ({
    todoList: state.todoList.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),
  updateTask: (id, updatedTask) => set((state) => ({
    todoList: state.todoList.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    )
  }))
}));

export default todoStore;