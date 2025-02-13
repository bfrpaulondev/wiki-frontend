import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import articleReducer from './features/articles/articleSlice';
import notificationReducer from './features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    notifications: notificationReducer,
  },
});
