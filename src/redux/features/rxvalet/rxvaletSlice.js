import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isExternalApiCalling: false,
};

const isExternalApiCallingSlice = createSlice({
  name: "isExternalApiCalling",
  initialState,
  reducers: {
    setIsExternalApiCalling: (state, action) => {
      state.isExternalApiCalling = action.payload;
    },
  },
});

export const { setIsExternalApiCalling } = isExternalApiCallingSlice.actions;
export default isExternalApiCallingSlice.reducer;
