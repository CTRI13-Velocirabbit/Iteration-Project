import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice.js';
import userReducer from './slices/userSlice.js';
import tagReducer from './slices/tagSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
    tagStatus: tagReducer
  },
});
