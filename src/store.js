import { configureStore } from '@reduxjs/toolkit'
import loginReducer  from './slices/loginSlice'
import activeUserSlice from './slices/activeUserSlice'


export default configureStore({
  reducer: {
    loginSlice:loginReducer,
    activeUser:activeUserSlice
  },
})