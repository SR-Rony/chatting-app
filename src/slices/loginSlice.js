import { createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router-dom'

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    value: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null
  },
  reducers: {
    userLogin: (state,action) => {
        state.value=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {userLogin} = loginSlice.actions

export default loginSlice.reducer