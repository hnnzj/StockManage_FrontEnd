import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slice/productSlice";
import { clientSlice } from "./slice/clientSlice";
import { pedidosSlice } from "./slice/pedidosSlice";

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    clients: clientSlice.reducer,
    pedidos: pedidosSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});
