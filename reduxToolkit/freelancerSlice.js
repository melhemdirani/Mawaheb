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
  dashboard: {},
  contract: {}
}
export const createFreelancerProfile = createAsyncThunk(
  'createFreelancerProfile',
  async (freelancer, thunkApi) => {
    let url = '/freelancers'
    try {
      const resp = await customFetch.post(url, freelancer)
      return resp.data
    } catch (error) {
      console.log(error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const updateFreelancerProfile = createAsyncThunk(
  'updateFreelancerProfile',
  async (item, thunkApi) => {
    let url = `/freelancers/${item.id}`
    try {
      const resp = await customFetch.patch(url, item.freelancer)
      return resp.data
    } catch (error) {
      console.log("error here", error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getFreelancer = createAsyncThunk(
  'getFreelancer',
  async (id, thunkApi) => {
    let url = `/freelancers/${id}`
    try {
      console.log("getting")
      const resp = await customFetch.get(url)
      return resp.data
    } catch (error) {
      console.log('getting freelancer error', error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const acceptContractFreelancer = createAsyncThunk(
  'acceptContractFreelancer',
  async (id, thunkApi) => {
    console.log("id", id)
    let url = `/contracts/${id}/accept`
    try {
      const resp = await customFetch.put(url)
      console.log("response contract", resp)
      return resp.data
    } catch (error) {
      console.log('contract freelancer error', error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getContractFreelancer = createAsyncThunk(
  'getContractFreelancer',
  async (id, thunkApi) => {
    console.log("id", id)
    let url = `/contracts/${id}/freelancer`
    try {
      const resp = await customFetch.get(url)
      return resp.data
    } catch (error) {
      console.log('contract freelancer error', error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const deleteFreelenacerLanguage = createAsyncThunk(
  'deleteFreelenacerLanguage',
  async (id, thunkApi) => {
    let url = `/freelancers/${id}/language`
    console.log("delete language url", url)

    try {
      const resp = await customFetch.delete(url)
      console.log("response deleteing", resp)
      return resp.data
    } catch (error) {
      console.log('error deleting language', error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const deleteFreelancerRole = createAsyncThunk(
  'deleteFreelancerRole',
  async (id, thunkApi) => {
    let url = `/freelancers/${id}/role`
    console.log("delete language url", url)

    try {
      const resp = await customFetch.delete(url)
      console.log("response deleteing", resp)
      return resp.data
    } catch (error) {
      console.log('error deleting language', error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)



export const getFreelancerDashboard = createAsyncThunk(
  'getFreelancerDashboard',
  async (id, thunkApi) => {
    let url = `/freelancers/${id}/dashboard`

    try {
      const resp = await customFetch.get(url)

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
      state.roles = action.payload
      console.log("new roles",action.payload)
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
      state.languages = action.payload
      console.log(state.languages)
    },
    completedProfile: (state, action) => {
      state.completedProfile.push(action.payload)
    },
    clearFreelancer : (state) => {
      state.freelancer = {}
    },
    clearFreelancerState : (state) => {
      state = initialState,
      state.freelancer = {}
    }
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
    [updateFreelancerProfile.fulfilled]: (state, { payload }) => {
      const { freelancer } = payload
      // state.isLoading = false
      // state.freelancer = freelancer
      console.log("freelancer", freelancer)
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
    [acceptContractFreelancer.fulfilled]: (state, { payload }) => {
      const {contract} = payload
      state.contract = contract
    },
    [getFreelancer.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
    [getFreelancerDashboard.pending]: (state) => {
      state.isLoading = true
    },
    [getFreelancerDashboard.fulfilled]: (state, { payload }) => {
      const { pastJobs, currentJobs, freelancer } = payload
      state.dashboard = {
        pastJobs,
        currentJobs,
        totalWorkingTime: freelancer?.totalWorkingTime,
        totalCashEarned: freelancer?.totalCashEarned,
      }

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
  completedProfile,
  clearFreelancer,
  clearFreelancerState
} = freelancerSlice.actions

export default freelancerSlice.reducer
