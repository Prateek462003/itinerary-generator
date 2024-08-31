import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import itenReducer from "./slices/itenerarySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    iten: itenReducer,
  },
});

export default store;
