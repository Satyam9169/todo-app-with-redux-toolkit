import { configureStore } from "@reduxjs/toolkit";
import  userDetailReducer  from "../Features/getUserSlice";


export const store = configureStore({
  reducer: {
    userDetail: userDetailReducer,
  },
});