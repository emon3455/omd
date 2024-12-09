import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:
    JSON.parse(localStorage.getItem("OPTIMALMD_USER")) ||
    JSON.parse(sessionStorage.getItem("OPTIMALMD_USER")) ||
    {},
  rememberMe: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, rememberMe } = action.payload;
      state.user = user;
      if (rememberMe) {
        localStorage.setItem("OPTIMALMD_USER", JSON.stringify(user));
        sessionStorage.removeItem("OPTIMALMD_USER");
      } else {
        sessionStorage.setItem("OPTIMALMD_USER", JSON.stringify(user));
        localStorage.removeItem("OPTIMALMD_USER");
      }
    },
    logoutUser: (state) => {
      state.user = {};
      localStorage.removeItem("OPTIMALMD_USER");
      sessionStorage.removeItem("OPTIMALMD_USER");
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
