import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
    checkauth: (state) => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (token) {
        state.isAuthenticated = true;
        state.user = user;
        state.token = token;
      } else {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      }
    },
  },
});

export const { login, logout, checkauth } = authSlice.actions;

export default authSlice.reducer;
