import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cartSlice"
 export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
