import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import customFetch from '../utils/axios'

const initialState = {
  freelancer: null,
  isLoading: false,
  error: null,
}
export const createFreelancerProfile = createAsyncThunk(
  'createFreelancerProfile',
  async (freelancer, thunkApi) => {
    let url = '/freelancers'
    try {
      const resp = await customFetch.post(url, freelancer)
      console.log(resp.data)
      return resp.data
    } catch (error) {
      console.log(error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)

const freelancerSlice = createSlice({
  name: 'freelancer',
  initialState,
  reducers: {},
  extraReducers: {
    [createFreelancerProfile.pending]: (state) => {
      state.isLoading = true
    },
    [createFreelancerProfile.fulfilled]: (state, { payload }) => {
      const { freelancer } = payload
      state.isLoading = false
      state.freelancer = freelancer
    },
    [createFreelancerProfile.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})

export default freelancerSlice.reducer
