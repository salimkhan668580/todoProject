import {configureStore} from '@reduxjs/toolkit';
import { AuthSlice } from './AuthSlice';


export const store = configureStore({
  reducer: {
    user: AuthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
