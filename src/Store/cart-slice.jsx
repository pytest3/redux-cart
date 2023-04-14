import { createSlice } from "@reduxjs/toolkit";

function calculateTotalCartQuantity(cart) {
  return cart.reduce((prev, curr) => {
    return prev + curr.quantity;
  }, 0);
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalCartQuantity: 0,
    products: [],
    showCart: false,
    cartChanged: false,
  },
  reducers: {
    decrementQuantity: (state, action) => {
      state.cartChanged = true;
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
      state.totalCartQuantity = calculateTotalCartQuantity(state.products);
    },
    incrementQuantity: (state, action) => {
      state.cartChanged = true;
      const { id } = action.payload;
      const productExists = state.products.find((i) => i.id === id);
      if (productExists) {
        productExists.quantity++;
      } else {
        action.payload.quantity = 1;
        state.products.push(action.payload);
      }
      state.totalCartQuantity = calculateTotalCartQuantity(state.products);
    },
    removeFromCart: (state, action) => {
      state.cartChanged = true;
      const { id } = action.payload;
      const newProducts = state.products.filter((i) => i.id !== id);
      state.products = newProducts;
      state.totalCartQuantity = calculateTotalCartQuantity(state.products);
    },
    refreshCart: (state, action) => {
      // fallback value for if/when entire cart gets deleted in firebase
      state.products = action.payload.items || [];
      state.totalCartQuantity = action.payload.quantity;
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  toggleCart,
  refreshCart,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
