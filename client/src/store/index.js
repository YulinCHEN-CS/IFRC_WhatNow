import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth.slice";
import messageReducer from "./features/message.slice";

const reducer = {
  auth: authReducer,
  message: messageReducer
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});