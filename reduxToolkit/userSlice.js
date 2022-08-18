import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import customFetch from '../utils/axios'

const initialState = {
  user: {},
  isLoading: false,
  registerIsLoading: false,
  error: undefined,
  registerError: undefined,
  notifications: [],
  notificationsSeen: true
}
export const getNotifications = createAsyncThunk(
  'getNotifications',
  async ({ id, role }, thunkApi) => {
    let url = `/notifications/${role}/${id}`
    try {
      const resp = await customFetch.get(url)

      return resp.data
    } catch (error) {
      console.log(error)
      console.log('error')
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
      return resp.data
    } catch (error) {
      console.log('rrer', error.response.data.msg)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const updateUser = createAsyncThunk(
  'updateUser',
  async (user, thunkApi) => {
    let url = '/users/updateUser'
    try {
      const resp = await customFetch.patch(url, user)
      return resp.data
    } catch (error) {
      console.log("rrer",error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }

  }
)
export const updateUserPassword = createAsyncThunk(
  'updateUserPassword',
  async (passwords, thunkApi) => {
    let url = '/users/updateUserPassword'
    console.log("user", passwords)
    try {
      const resp = await customFetch.patch(url, passwords)
      return resp.data
    } catch (error) {
      console.log('rrer', error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)

export const loginUser = createAsyncThunk(
  'loginUser',
  async (user, thunkApi) => {
    let url = '/auth/login'
    console.log("loggin in")
    try {
      const resp = await customFetch.post(url, user)
      console.log('user login', resp.data)
      return resp.data
    } catch (error) {
      alert(
        'Error logging in, make sure you are entering the right credentials'
      )
      console.log("error", error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const logout = createAsyncThunk('logout', async (user, thunkApi) => {
  let url = '/auth/logout'
  try {
    console.log('logging out')
    const resp = await customFetch.get(url, user)

    return resp.data
  } catch (error) {
    console.log(error.response.data.msg)

    return thunkApi.rejectWithValue(error.response.data.msg)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFreelancerId: (state, action) => {
      state.user.freelancerId = action.payload
    },
    setUserAfterRegister: (state, action) => {
      state.user.clientId = action.payload
    },
    setNotificationsSeen: (state, action) => {
      console.log("action.payload", action.payload)
      state.notificationsSeen = action.payload
    }
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.registerIsLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.registerIsLoading = false
      state.user = user
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.registerIsLoading = false
      state.registerError = payload
    },
    [updateUser.pending]: (state) => {
      state.registerIsLoading = true
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.registerIsLoading = false
      console.log("payload updating", payload)
      state.user = payload
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.registerIsLoading = false
      state.registerError = payload
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [logout.fulfilled]: (state) => {
      state.user = {}
      console.log('LOGOUT')
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
    [getNotifications.pending]: (state) => {
      state.isLoading = true
    },
    [getNotifications.fulfilled]: (state, { payload }) => {
      const { notifications } = payload
      state.isLoading = false
      state.notifications = notifications
    },
    [getNotifications.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})
export const { setFreelancerId } = userSlice.actions
export const { setUserAfterRegister, setNotificationsSeen } = userSlice.actions

export default userSlice.reducer
