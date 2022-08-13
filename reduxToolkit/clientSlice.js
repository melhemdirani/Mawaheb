import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../utils/axios'

import { setUserAfterRegister } from './userSlice'

const initialState = {
  client: {},
  isLoading: true,
  error: undefined,
  clientDashboard: {},
}

export const createClientProfile = createAsyncThunk(
  'client/createClientProfile',
  async (client, thunkAPI) => {
    try {
      const resp = await customFetch.post('/clients', client)
      return resp.data
    } catch (error) {
      console.log(error)
      console.log(error.response.data.msg)
      alert(error.response.data.msg)
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getClientDashboard = createAsyncThunk(
  'getClientDashboard',
  async (id, thunkAPI) => {
    let url = `/clients/${id}/dashboard`
    try {
      const resp = await customFetch.get(url)
      console.log('get client', resp.data)
      return resp.data
    } catch (error) {
      console.log(error)
      console.log(error.response.data.msg)
      alert(error.response.data.msg)
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: {
    [createClientProfile.pending]: (state) => {
      state.isLoading = true
    },
    [createClientProfile.fulfilled]: (state, { payload }) => {
      const { client } = payload
      state.isLoading = false
      state.client = client
    },
    [createClientProfile.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
    [getClientDashboard.pending]: (state) => {
      state.isLoading = true
    },
    [getClientDashboard.fulfilled]: (state, { payload }) => {
      const { currentJobs, numOfContracts, numOfJobs, pastJobs } = payload
      state.isLoading = false
      state.clientDashboard = {
        currentJobs,
        numOfContracts,
        numOfJobs,
        pastJobs,
      }

    },

    [getClientDashboard.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})

export default clientSlice.reducer
