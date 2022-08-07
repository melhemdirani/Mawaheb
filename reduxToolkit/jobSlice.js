import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import customFetch from '../utils/axios'

const initialState = {
  job: {},
  jobs: [],
}
export const createJob = createAsyncThunk(
  'createJobPost',
  async (job, thunkApi) => {
    let url = '/jobs'
    try {
      const resp = await customFetch.post(url, job)
      console.log(resp.data)
      return resp.data
    } catch (error) {
      console.log(error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getAllJobs = createAsyncThunk(
  'getAllJobs',
  async (_, thunkApi) => {
    let url = '/jobs'
    try {
      const resp = await customFetch.get(url)


      return resp.data
    } catch (error) {
      console.log(error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: {
    [createJob.pending]: (state, action) => {
      state.isLoading = true
    },
    [createJob.fulfilled]: (state, action) => {
      state.isLoading = false
      state.job = action.payload
    },
    [createJob.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getAllJobs.pending]: (state, action) => {
      state.isLoading = true
    },
    [getAllJobs.fulfilled]: (state, action) => {
      state.isLoading = false
      state.jobs = action.payload
    },
  },
})

export default jobSlice.reducer
