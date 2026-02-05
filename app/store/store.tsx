import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice'

import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

/* persist config */
const persistConfig = {
  key: 'user',          // storage key
  storage: AsyncStorage,
  whitelist: ['value'], // ✅ slice ke andar jo key hai wahi
}

/* persisted reducer */
const persistedReducer = persistReducer(persistConfig, AuthReducer)

export const store = configureStore({
  reducer: {
    user: persistedReducer, // state.user.value
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
