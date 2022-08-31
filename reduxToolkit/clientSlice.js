import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../utils/axios'


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
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)
export const updateClientProfile = createAsyncThunk(
  'updateClientProfile',
  async (client, thunkAPI) => {
    try {
      const resp = await customFetch.patch('/clients', client)
      return resp.data
    } catch (error) {
      console.log(error)
      console.log(error.response.data.msg)
      alert(error.response.data.msg)
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)
export const acceptAndSign = createAsyncThunk(
  'acceptAndSign',
  async (contractId, thunkAPI) => {// contracts/contractid/sign
    let url = `/contracts/${contractId}/sign`
    try {
      const resp = await customFetch.put(url)
      console.log("response signed", resp.data)
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
      return resp.data
    } catch (error) {
      console.log(error)
      console.log(error.response.data.msg)
      alert(error.response.data.msg)
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

export const getClientbyId = createAsyncThunk(
  'getClientbyId',
  async (id, thunkAPI) => {
    let url = `/clients/${id}/`
    console.log("urk", url)
    try {
      const resp = await customFetch.get(url)
      return resp.data
    } catch (error) {
      console.log(error.response.data.msg)
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)
export const inviteFreelancer = createAsyncThunk(
  'inviteFreelancer',
  async (info, thunkAPI) => {
    let url = `/clients/invite/`
    try {
      const resp = await customFetch.post(url, {freelancerId: info.freelancerId, jobId: info.jobId})
      return resp.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)


const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    clearClient : (state) => {
      state.client = {}
    }
  },
  extraReducers: {
    [createClientProfile.pending]: (state) => {
      state.isLoading = true
    },
    [createClientProfile.fulfilled]: (state, { payload }) => {
      const { client } = payload
      state.isLoading = false
      state.client = client
    },
    [getClientbyId.fulfilled]: (state, { payload }) => {
      const { client } = payload
      state.isLoading = false
      state.client = client
    },
    [updateClientProfile.fulfilled]: (state, { payload }) => {
      const { client } = payload
      state.isLoading = false
      state.client = client
    },
    [acceptAndSign.fulfilled]: (state, { payload }) => {
      console.log("payloaddd", payload)
    },
    [inviteFreelancer.fulfilled]: (state, { payload }) => {
      console.log("payloaddd", payload)
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
export const { clearClient } = clientSlice.actions

export default clientSlice.reducer
