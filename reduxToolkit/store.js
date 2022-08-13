import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import freelancerSlice from './freelancerSlice'
import clientSlice from './clientSlice'
import jobSlice from './jobSlice'

export const toolkitStore = configureStore({
  reducer: {
    user: userSlice,
    freelancer: freelancerSlice,
    client: clientSlice,
    job: jobSlice,
  },
  //disable serialazable state

})
