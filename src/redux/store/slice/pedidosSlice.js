import { createSlice } from "@reduxjs/toolkit";
export const pedidosSlice = createSlice({
  name: "Pedidos",
  initialState: {
    pedidos: [],
  },
  reducers: {
    createOrder: (state, action) => {
      state.pedidos = action.payload;
    },
    setPedidos: (state, action) => {
      state.pedidos = action.payload;
    },
  },
});
export const { createOrder, setPedidos } = pedidosSlice.actions;
