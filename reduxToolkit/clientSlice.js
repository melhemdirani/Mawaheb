import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../utils/axios'

const initialState = {
  client: {},
  isLoading: false,
  error: null,
}
export const createClientProfile = createAsyncThunk(
  'client/createClientProfile',
  async (client, thunkAPI) => {
    try {
      const resp = await customFetch.post('/clients', client)
      console.log(resp.data)
      return resp.data
    } catch (error) {
      console.log(error)
      console.log(error.response.data.msg)
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: {
    [createClientProfile.pending]: (state) => {
      state.isLoading = true
    },
    [createClientProfile.fulfilled]: (state, { payload }) => {
      const { client } = payload
      state.isLoading = false
      state.client = client
    },
    [createClientProfile.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})

export default clientSlice.reducer