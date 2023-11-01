import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    setProducts: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    createProduct: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});
export const { startLoading, setProducts, deleteProduct, createProduct } =
  productSlice.actions;
