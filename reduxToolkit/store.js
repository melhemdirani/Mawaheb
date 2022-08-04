import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'

export const toolkitStore = configureStore({
  reducer: {
    user: userSlice,
  },
})
