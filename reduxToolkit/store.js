import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice'
import freelancerSlice from './freelancerSlice'
import clientSlice from './clientSlice'
import jobSlice from './jobSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const reducers = combineReducers({
  user: userSlice,
  credentials: userSlice,
  freelancer: freelancerSlice,
  client: clientSlice,
  job: jobSlice,
})
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ["credentials", "user", "freelancer", "client"]
}
const persistedReducer = persistReducer(persistConfig, reducers)

export const toolkitStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})
export const persistor = persistStore(toolkitStore)
