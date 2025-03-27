import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
    
  },
});

export default store;
