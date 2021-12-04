import { configureStore } from '@reduxjs/toolkit'
import warningReducer from '../features/warningSlice'
import userSlice from '../features/userSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    warning:warningReducer,
  }
})