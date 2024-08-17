// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { memberApi } from './feature/member/memberSlice';

export const store = configureStore({
  reducer: {
    [memberApi.reducerPath]: memberApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(memberApi.middleware),
});
