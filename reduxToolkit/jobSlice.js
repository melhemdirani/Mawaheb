import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import customFetch from '../utils/axios'

const initialState = {
  job: {},
  jobs: [],
  proposals: [],
  myJobs: [],
  contract: {},
  freelancers: [],
  isLoading: false,
  isLoadingFreelancers: true
}
export const createJob = createAsyncThunk(
  'createJob',
  async (job, thunkApi) => {
    console.log("job", job)
    let url = '/jobs'
    try {
      const resp = await customFetch.post(url, job)
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const  getAllJobs = createAsyncThunk(
  'getAllJobs',
  async (filters, thunkApi) => {
    let url = `jobs/${filters.id}/filteredjobs?${filters.filters}`
    console.log("urlss", url)
    try {
      const resp = await customFetch.get(url)
      return ("all jobs",resp.data)
    } catch (error) {

      console.log("errors",error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getJob = createAsyncThunk('getJob', async (id, thunkApi) => {
  let url = `/jobs/${id}/job`
  try {
    const resp = await customFetch.get(url)
    return resp.data
  } catch (error) {
    console.log( "error getting job", error)
    return thunkApi.rejectWithValue(error.response.data.msg)
  }
})
export const getFavoriteJob = createAsyncThunk(
  'getFavoriteJob', async (id, thunkApi) => {
    let url = `/jobs/${id}/favoriteJobs`
    try {
      const resp = await customFetch.get(url)
      return resp.data
    } catch (error) {
      console.log( "error getting fav job", error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const applyJob = createAsyncThunk(
  'applyJob',
  async (proposal, thunkApi) => {
    let url = '/proposals'
    try {
      const resp = await customFetch.post(url, proposal)
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const acceptInvitation = createAsyncThunk(
  'acceptInvitation',
  async (user, thunkApi) => {
    let url = `/freelancers/${user.jobId}/acceptInvitation`
    try {
      const resp = await customFetch.patch(url, { freelancerId: user.freelancerId, invitationId: user.invitationId})
      return resp.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getApplicants = createAsyncThunk(
  'getApplicants',
  async (id, thunkApi) => {
    let url = `/proposals/${id}/job`
    try {
      const resp = await customFetch.get(url)

      return resp.data
    } catch (error) {
      console.log(error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getAllFreelancers = createAsyncThunk(
  'getAllFreelancers',
  async (thunkApi) => {
    let url ='/freelancers'
    try {
      const resp = await customFetch.get(url)
      return resp.data
    } catch (error) {
      console.log(error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getFilteredFreelancer = createAsyncThunk(
  'getFilteredFreelancer',
  async (data, thunkApi) => {
    let url = `freelancers/${data.jobId}/getFreelancers?page=${data.page}`
    try {
      const resp = await customFetch.get(url)
      return resp.data
    } catch (error) {
      console.log(error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const createContract = createAsyncThunk(
  'createContract',
  async (contract, thunkApi) => {
    let url = '/contracts'
    try {
      const resp = await customFetch.post(url, contract)
      console.log("CREAT RESP",resp.data)
      return resp.data
    } catch (error) {
      console.log("error creating",error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const getMyJobs = createAsyncThunk('getMyJobs', async (filters, thunkApi) => {
  let url = `jobs/${filters.id}?${filters.filters}`
  try {
    const resp = await customFetch.get(url)
    console.log("getmyjobs", resp.data)
    return resp.data
  } catch (error) {
    console.log("error getting my jobs",error.response.data.msg)
    return thunkApi.rejectWithValue(error.response.data.msg)
  }
})
export const setJobRated = createAsyncThunk('setJobRated', async (jobId, thunkApi) => {
  let url = `jobs/${jobId}/setJobRated`
  console.log("rated url", url)
  try {
    const resp = await customFetch.patch(url)
    return resp.data
  } catch (error) {
    console.log("error getting my jobs",error)
    return thunkApi.rejectWithValue(error.response.data.msg)
  }
})
const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearJob: (state) => {
      state.job = {}
    },
  },
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
      const { jobs } = action.payload
      state.isLoading = false
      state.jobs = jobs
    },
    [getAllJobs.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getJob.pending]: (state, action) => {
      state.isLoading = true
    },
    [getJob.fulfilled]: (state, action) => {
      const { job } = action.payload
      state.isLoading = false
      state.job = job
    },
    [getJob.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [applyJob.pending]: (state, action) => {
      state.isLoading = true
    },
    [applyJob.fulfilled]: (state, action) => {
      const { job } = action.payload
      state.isLoading = false
      state.job = job
    },
    [acceptInvitation.fulfilled]: (state, action) => {
      const { job } = action.payload
      state.isLoading = false
      state.job = job
    },

    [getApplicants.pending]: (state, action) => {
      state.isLoading = true
    },
    [getApplicants.fulfilled]: (state, action) => {
      const { proposals } = action.payload
      state.isLoading = false
      state.proposals = proposals
    },
    [applyJob.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getMyJobs.pending]: (state, action) => {
      state.isLoading = true
    },
    [getMyJobs.fulfilled]: (state, action) => {
      const { myJobs } = action.payload
      state.isLoading = false
      state.myJobs = myJobs
    },
    [getMyJobs.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getAllFreelancers.pending]: (state, action) => {
      state.isLoadingFreelancers = true
    },
    [getAllFreelancers.fulfilled]: (state, action) => {
    
      state.isLoadingFreelancers = false
      state.freelancers = action.payload.freelancers
    },
    [getAllFreelancers.rejected]: (state, action) => {
      state.isLoadingFreelancers = false
      state.error = action.payload
    },
    [createContract.pending]: (state, action) => {
      state.isLoading = true
    },
    [createContract.fulfilled]: (state, action) => {
      const { contract } = action.payload
      state.isLoading = false
      state.contract = contract
    },
    [createContract.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  },
})
export const {
  clearJob
} = jobSlice.actions

export default jobSlice.reducer
