import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import customFetch from '../utils/axios'

const initialState = {
  user: {},
  isLoading: false,
  error: {},
  notifications: []
}
export const getNotifications = createAsyncThunk(
  'getNotifications',
  async ({id, role}, thunkApi) => {
    let url =  `/notifications/${role}/${id}` 
    try {
      const resp = await customFetch.get(url)
      console.log("res date notifications", resp.data)
      return resp.data
    } catch (error) {
      console.log(error)
      console.log("error")
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const registerUser = createAsyncThunk(
  'registerUser',
  async (user, thunkApi) => {
    let url = '/auth/register'
    try {
      const resp = await customFetch.post(url, user)
      console.log(resp.data)
    } catch (error) {
      alert(error.response.data.msg)
      console.log(error.response.data.msg)
      alert(error.response.data.msg)

      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const loginUser = createAsyncThunk(
  'loginUser',
  async (user, thunkApi) => {
    let url = '/auth/login'
    try {
      const resp = await customFetch.post(url, user)
      return resp.data
    } catch (error) {
        alert(error.response.data.msg)
      console.log(error.response.data.msg)

      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)

export const logout = createAsyncThunk(
  'logout',
  async (user, thunkApi) => {
    let url = '/auth/logout'
    try {
      const resp = await customFetch.get(url, user)
      return resp.data
    } catch (error) {
      console.log(error.response.data.msg)

      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFreelancerId: (state, action) => {
      state.user.freelancerId = action.payload
    },
    setUserAfterRegister: (state,action) => {
      state.user.clientId = action.payload
    }
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
    [logout.fulfilled]: (state) => {
      state.user = {}
    },
    [getNotifications.pending]: (state) => {
      state.isLoading = true
    },
    [getNotifications.fulfilled]: (state, { payload }) => {
      state.notifications =  payload
      state.isLoading = false
    },
    [getNotifications.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})

export const { setFreelancerId } = userSlice.actions
export const { setUserAfterRegister } = userSlice.actions

export default userSlice.reducer
