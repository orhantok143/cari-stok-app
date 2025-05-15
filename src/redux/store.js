// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import gelirReducer from './gelir/gelirSlice';
import giderReducer from './gider/giderSlice';
import cariSlice from "./cari/cariSlice"
import cariFaturaSlice from "./cariFatura/cariFaturaSlice"
import stockSlice from "./stock/stockSlice"


export const store = configureStore({
  reducer: {
    gelir: gelirReducer,
    gider: giderReducer,
    cari: cariSlice,
    cariFatura: cariFaturaSlice,
    stock:stockSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // bu zaten varsayılan olarak thunk içerir
});
