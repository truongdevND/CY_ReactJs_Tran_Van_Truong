import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoListStore';
export const store = configureStore({
    reducer: {
        todo: todoReducer,
      },
})