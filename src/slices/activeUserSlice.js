import { createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router-dom'

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState: {
    value: null
  },
  reducers: {
    activeUser: (state,action) => {
        state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {activeUser} = activeUserSlice.actions

export default activeUserSlice.reducer