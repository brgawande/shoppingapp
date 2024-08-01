import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartslice/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});
