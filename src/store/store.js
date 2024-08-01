import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartslice/cartSlice";
import authSlice from "./authSlice/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
  },
});
