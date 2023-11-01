import { createSlice } from "@reduxjs/toolkit";
export const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
  },
  reducers: {
    loadClients: (state, action) => {
      state.clients = action.payload.data;
    },
    createClient: (state, action) => {
      state.clients = action.payload.data;
    },
    delClient: (state, action) => {
      state.clients = action.payload;
    },
  },
});
export const { loadClients, createClient, delClient } = clientSlice.actions;
