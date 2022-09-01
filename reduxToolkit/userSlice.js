import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import customFetch from '../utils/axios'
import * as Notifications from 'expo-notifications';


const initialState = {
  user: {},
  isLoading: false,
  registerIsLoading: false,
  error: undefined,
  registerError: undefined,
  notifications: [],
  notificationsSeen: true,
  newNotifications: 0,
  credentials: {},
  token: ""
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

export const generateToken = createAsyncThunk(
  "generateToken",
  async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return; 
    }
    try {
      const token = (await Notifications.getExpoPushTokenAsync({experienceId:'@melhemdirani/mawaheb'})).data;
      return token;
    } catch (error) {
      console.log("error",error)
    }
  }
)

export const createOTP = createAsyncThunk(
  'createOTP',
  async ( email , thunkApi) => {
    let url = `/auth/sendOTP`
    console.log("email", email)
    try {
      const resp = await customFetch.post(url, email)

      return resp.data
    } catch (error) {
      console.log(error)
      console.log('error')
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const verifyUser = createAsyncThunk(
  'verifyUser',
  async ( verification , thunkApi) => {
    let url = `/auth/verifyUser`
    console.log("email", verification)
    try {
      const resp = await customFetch.post(url, verification)

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
export const testRegister = createAsyncThunk(
  'testRegister',
  async (user, thunkApi) => {
    let url = '/auth/testRegister'
    console.log("user", user)
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
      console.log("errrer",error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }

  }
)
export const deleteAccount = createAsyncThunk(
  'deleteAccount',
  async (userId, thunkApi) => {
    let url = `/users/${userId.userId}`
    try {
      const resp = await customFetch.delete(url)
      console.log("account delete response", resp)
      return resp.data
    } catch (error) {
      console.log("errrer",error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }

  }
)

export const updateUserPassword = createAsyncThunk(
  'updateUserPassword',
  async (passwords, thunkApi) => {
    let url = '/users/updateUserPassword'
    try {
      const resp = await customFetch.patch(url, {oldPassword: passwords.oldPassword, newPassword: passwords.newPassword})
      return resp.data
    } catch (error) {
      console.log('rrer', error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const deleteNotifcation = createAsyncThunk(
  'deleteNotifcation',
  async (id, thunkApi) => {
    let url =`/notifications/${id}`
    try {
      const resp = await customFetch.delete(url)
      return resp.data
    } catch (error) {
      console.log('rrer', error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const deleteNotifcations = createAsyncThunk(
  'deleteNotifcations',
  async (ids, thunkApi) => {
    let url =`/notifications`
    const notificationIds = ids.ids
    try {
      const resp = await customFetch.patch(url, {notificationIds: notificationIds})
      return resp.data
    } catch (error) {
      console.log('rrer', error)
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
  }
)
export const testNotification = createAsyncThunk(
  'testNotification',
  async (noti, thunkApi) => {
    let url =`/test/noti`
    try {
      const resp = await customFetch.post(url, {noti: noti})
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
    try {
      const resp = await customFetch.post(url, user)
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
export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (user, thunkApi) => {
    let url = '/auth/resetPassword'
    console.log("user reset password", user)
    try {
      const resp = await customFetch.post(url, user)
      return resp.data
    } catch (error) {
      console.log("error reset password", error)
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
      state.notificationsSeen = action.payload
    },
    setNewNotifications: (state, action) => {
      console.log("action", action.payload)
      state.newNotifications = action.payload
    },
    clearUser : (state) => {
      state.user = {},
      state.notifications= [],
      state.newNotifications= 0
    },
    setCredentials : (state, action) => {
      state.credentials = action.payload
    },
    setToken : (state, action) => {
      state.token = action.payload
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
    [testRegister.fulfilled]: (state, { payload }) => {
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
    [deleteNotifcations.fulfilled]: (state, { payload }) => {
      state.notifications = []
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
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.isLoading = false
      state.user = user
    },
    [generateToken.fulfilled]: (state, { payload }) => {
      state.token = payload
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
export const { 
  setUserAfterRegister, 
  setNotificationsSeen, 
  clearUser, 
  setCredentials,
  setToken, 
  setFreelancerId,
  setNewNotifications 
} = userSlice.actions

export default userSlice.reducer
