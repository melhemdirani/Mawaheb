import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import customFetch from '../utils/axios'

const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

export const registerUser = createAsyncThunk(
  'registerUser',
  async (user, thunkApi) => {
    let url = '/auth/register'
    try {
      const resp = await customFetch.post(url, user)
      console.log(resp.data)

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
  reducers: {},
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
  },
})
export const { toggleSidebar } = userSlice.actions

export default userSlice.reducer
