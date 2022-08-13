import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import customFetch from '../utils/axios'

const initialState = {
  freelancer: {},
  expirationDate: '',
  emiratesId: '',
  emiratesIdFrontSide: '',
  emiratesIdBackSide: '',
  latestRole: {},
  notableRole: {},
  additionalRole: {},
  roles: [],
  languages: [],
  isLoading: false,
  error: null,
  completedProfile: [],
  dashboard: {}
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
export const getFreelancer=createAsyncThunk(
  'getFreelancer',
  async (id, thunkApi) => {
    let url = `/freelancers/${id}`
    try {
      const resp = await customFetch.get(url)
      return resp.data
    } catch (error) {
      console.log("getting freelancer error",error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getFreelancerDashboard = createAsyncThunk(
  'getFreelancerDashboard',
  async (id, thunkApi) => {
    let url = `/freelancers/${id}/dashboard`
    console.log("dash id", id)
    try {
      const resp = await customFetch.get(url)
      console.log("dashh", resp.data)
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
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    },
    addRoles: (state, action) => {
  
      state.roles = (action.payload)
      console.log(state.roles)
    },
    updateLatestRole: (state, action) => {
      state.latestRole = action.payload
    },
    updateNotableRole: (state, action) => {
      state.notableRole = action.payload
    },
    updateAdditionalRole: (state, action) => {
      state.additionalRole = action.payload
    },
    addLanguage: (state, action) => {
      state.languages.push(action.payload)
      console.log(state.languages)
    },
    completedProfile: (state, action) => {
      state.completedProfile.push(action.payload)
      
    },
  },
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
    [getFreelancer.pending]: (state) => {
      state.isLoading = true
    },
    [getFreelancer.fulfilled]: (state, { payload }) => {
      const { freelancer } = payload
      state.isLoading = false
      state.freelancer = freelancer
    },
    [getFreelancer.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
    [getFreelancerDashboard.pending]: (state) => {
      state.isLoading = true
    },
    [getFreelancerDashboard.fulfilled]: (state, { payload }) => {
      console.log("state payload", payload)
      state.isLoading = false
    },
    [getFreelancerDashboard.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})
export const {
  handleChange,
  addRoles,
  updateLatestRole,
  updateNotableRole,
  updateAdditionalRole,
  addLanguage,
  completedProfile
} = freelancerSlice.actions

export default freelancerSlice.reducer
