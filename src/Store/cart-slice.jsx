import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "cart",
  initialState: {
    totalCartQuantity: 0,
    products: [],
    showCart: false,
  },
  reducers: {
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const productExists = state.products.find((i) => i.id === id);

      if (productExists) {
        productExists.quantity++;
      } else {
        action.payload.quantity = 1;
        state.products.push(action.payload);
      }

      state.totalCartQuantity = state.products.reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0);
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const productExists = state.products.find((i) => i.id === id);

      if (productExists.quantity === 1) {
        productExists.quantity--;
        const newProducts = state.products.filter((i) => i.id !== id);
        state.products = newProducts;
      } else if (productExists) {
        productExists.quantity--;
      } else {
        return;
      }

      state.totalCartQuantity = state.products.reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0);
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const { incrementQuantity, decrementQuantity, toggleCart } =
  counterSlice.actions;
export default counterSlice.reducer;
