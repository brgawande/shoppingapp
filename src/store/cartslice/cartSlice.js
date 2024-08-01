import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const exsistingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      //   console.log(exsistingItem);
      if (exsistingItem) {
        exsistingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
      //   console.log(state.cartItems);
    },
    removeFromCart: (state, action) => {
      //   console.log("action.payload", action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = counterSlice.actions;

export default counterSlice.reducer;
