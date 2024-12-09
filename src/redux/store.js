import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/api";
import userSlice from "./features/auth/authSlice";
import isExternalApiCallingSlice from "./features/rxvalet/rxvaletSlice";

const store = configureStore({
  reducer: {
    userSlice,
    isExternalApiCallingSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
