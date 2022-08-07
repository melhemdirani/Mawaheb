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
  error: undefined,
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
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    },
    addRoles: (state, action) => {
      state.roles.push(action.payload)
    },
    updateLatestRole: (state, action) => {
      state.latestRole = action.payload
    },
    updateNotableRole: (state, action) => {
      state.notableRole = action.payload
    },
    addLanguage: (state, action) => {
      state.languages.push(action.payload)
      console.log(state.languages)
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
  },
})
export const {
  handleChange,
  addRoles,
  updateLatestRole,
  updateNotableRole,
  addLanguage,
} = freelancerSlice.actions

export default freelancerSlice.reducer
